// DataLogsSection.jsx
import React, { useEffect, useState, useRef } from 'react';
import './DataLogsSection.css';

const LOG_LINES = [
    { text: "> INIT_SYSTEM_BOOT...", delay: 0, type: "system", speed: 20 },
    { text: "> CONNECTING TO MAINFRAME...", delay: 800, type: "system", speed: 20 },
    { text: "> ACCESS GRANTED. WELCOME, GUEST.", delay: 1800, type: "success", speed: 20 },
    { text: "> DECRYPTING USER DATA [RAÚL MARTÍNEZ]...", delay: 2800, type: "warning", speed: 40 },
    { text: "  [STATUS]: DECRYPTION COMPLETE.", delay: 4800, type: "success", speed: 20 },
    { text: " ", delay: 5500, type: "normal", speed: 0 },
    { text: "=== EDUCATION LOG ===", delay: 5800, type: "header", speed: 20 },
    { text: "► DEGREE: Computer Engineering", delay: 6500, type: "data", speed: 20 },
    { text: "► UNIVERSITY: Universidad Privada Dr. Rafael Belloso Chacín (URBE)", delay: 7500, type: "data", speed: 15 },
    { text: "► STATUS: Expected Graduation 2026", delay: 9000, type: "warning", speed: 20 },
    { text: " ", delay: 9800, type: "normal", speed: 0 },
    { text: "=== PROFESSIONAL SUMMARY ===", delay: 10000, type: "header", speed: 20 },
    { text: "► PROFILE: Full Stack Web Developer", delay: 10800, type: "data", speed: 20 },
    { text: "► FOCUS: Scalable applications & logical problem-solving.", delay: 11800, type: "data", speed: 15 },
    { text: "> SYS_REQ: AWAITING USER INPUT_ _ _", delay: 13500, type: "prompt", speed: 40 }
];

const TypewriterLine = ({ line, isLastVisible, onType }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let currentText = "";
        let currentIndex = 0;
        
        if (line.speed === 0) {
            setDisplayedText(line.text);
            return;
        }

        const interval = setInterval(() => {
            currentText += line.text[currentIndex];
            setDisplayedText(currentText);
            
            // Avisar al contenedor que actualice el scroll
            if (onType) onType();

            currentIndex++;
            if (currentIndex === line.text.length) {
                clearInterval(interval);
            }
        }, line.speed);
        
        return () => clearInterval(interval);
    }, [line]);

    // Ocultar el cursor si ya está completo y no es el último, o dejar el parpadeante si es el último y ya terminó
    const isTyping = displayedText.length < line.text.length;

    return (
        <div className={`log-line type-${line.type}`}>
            {displayedText}
            {isLastVisible && isTyping && <span className="cursor-solid"></span>}
            {isLastVisible && !isTyping && <span className="cursor-blink"></span>}
        </div>
    );
};

// COMPONENTE PARA LA LLUVIA DE MATRIX
const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        const letters = "01";
        const fontSize = 16;
        let columns = Math.floor(width / fontSize);
        let drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // Inicia las gotas a diferentes alturas
        }

        const draw = () => {
            // Fondo traslúcido para crear el rastro (estela) de los caracteres
            ctx.fillStyle = "rgba(5, 5, 5, 0.1)"; 
            ctx.fillRect(0, 0, width, height);

            ctx.font = fontSize + "px monospace";

            for (let i = 0; i < drops.length; i++) {
                const text = letters.charAt(Math.floor(Math.random() * letters.length));
                
                // Color verde matriz clásico
                ctx.fillStyle = `rgba(0, 255, 65, ${Math.random() * 0.5 + 0.2})`;
                
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);
        
        const handleResize = () => {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
            let newColumns = Math.floor(width / fontSize);
            drops = [];
            for (let x = 0; x < newColumns; x++) {
                drops[x] = Math.random() * -100;
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="matrix-canvas" />;
};

const DataLogsSection = () => {
    const [visibleLineIndices, setVisibleLineIndices] = useState([]);
    const containerRef = useRef(null);
    const terminalBodyRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    // Función que manda el scroll del contenedor hacia abajo
    const scrollToBottom = () => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasStarted) {
                setHasStarted(true);
            }
        }, { threshold: 0.3 }); // Arranca cuando el panel sea un 30% visible

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;
        
        let timeouts = [];
        
        LOG_LINES.forEach((line, index) => {
            const timeout = setTimeout(() => {
                setVisibleLineIndices(prev => {
                    if (!prev.includes(index)) {
                        return [...prev, index];
                    }
                    return prev;
                });
            }, line.delay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, [hasStarted]);

    return (
        <section className="data-logs-wrapper" ref={containerRef}>
            <MatrixRain />
            <div className="terminal-container">
                <div className="terminal-header">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="terminal-title">bash - sys_info.exe</span>
                </div>
                <div className="terminal-body" id="style-4" ref={terminalBodyRef}>
                    {visibleLineIndices.sort((a,b) => a-b).map((index, arrayIdx) => (
                        <TypewriterLine 
                            key={index} 
                            line={LOG_LINES[index]} 
                            isLastVisible={arrayIdx === visibleLineIndices.length - 1} 
                            onType={scrollToBottom}
                        />
                    ))}
                    {!hasStarted && <div className="cursor-blink"></div>}
                </div>
            </div>
        </section>
    );
};

export default DataLogsSection;
