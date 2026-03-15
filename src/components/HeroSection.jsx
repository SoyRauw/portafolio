// HeroSection.jsx
import React, { useMemo, useEffect, useState, useRef } from 'react';
import './HeroSection.css';

// Importamos los iconos desde react-icons (basado en tu CV)
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaJava, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiMysql, SiSupabase, SiCplusplus } from 'react-icons/si';

const ICONS = [
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, 
  FaJava, FaGitAlt, SiJavascript, SiMysql, SiSupabase, SiCplusplus
];

const HeroSection = () => {
    // useMemo para calcular las posiciones y velocidades aleatorias UNA sola vez
    // y que no cambien bruscamente si el componente se re-renderiza
    const fallingIcons = useMemo(() => {
        // Generamos 25 iconos cayendo
        return Array.from({ length: 25 }).map((_, i) => {
            const RandomIcon = ICONS[Math.floor(Math.random() * ICONS.length)];
            return {
                id: i,
                Icon: RandomIcon,
                // Posición horizontal aleatoria (entre 0% y 100% del ancho)
                left: `${Math.random() * 100}vw`,
                // Duración de la caída aleatoria (entre 8s y 20s)
                animationDuration: `${8 + Math.random() * 12}s`,
                // Retraso para que no caigan todos al mismo tiempo
                animationDelay: `${Math.random() * 5}s`,
                // Tamaño aleatorio de cada icono
                fontSize: `${2 + Math.random() * 3}rem`
            };
        });
    }, []);

    const [scale, setScale] = useState(1);
    const [opacity, setOpacity] = useState(1);
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;
            const scrollY = window.scrollY;
            const heroHeight = heroRef.current.offsetHeight;
            
            // Limit the effect while scrolling down the first section
            if (scrollY <= heroHeight) {
                // Scale goes from 1 to roughly 3.5 at the bottom of the section
                const newScale = 1 + (scrollY / heroHeight) * 2.5;
                // Fade out smoothly right before it finishes
                const newOpacity = 1 - (scrollY / (heroHeight * 0.8));
                
                setScale(newScale);
                setOpacity(Math.max(0, newOpacity));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check once on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="hero-container" ref={heroRef}>
            {/* Lluvia de iconos */}
            {fallingIcons.map(({ id, Icon, left, animationDuration, animationDelay, fontSize }) => (
                <div 
                    key={id} 
                    className="falling-icon"
                    style={{ left, animationDuration, animationDelay, fontSize }}
                >
                    <Icon />
                </div>
            ))}

            {/* Contenido Principal */}
            <div 
                className="hero-content"
                style={{ 
                    transform: `translateY(${typeof window !== 'undefined' ? window.scrollY * 0.7 : 0}px) scale(${scale})`, 
                    opacity: opacity,
                    transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
                }}
            >
                <h1 className="hero-title">RAÚL MARTÍNEZ</h1>
                <h2 className="hero-subtitle">COMPUTER ENGINEER / FULL STACK WEB DEVELOPER</h2>
            </div>
        </section>
    );
};

export default HeroSection;