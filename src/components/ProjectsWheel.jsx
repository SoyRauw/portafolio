import React, { useEffect, useRef, useState } from 'react';
import './ProjectsWheel.css';

const PROJECTS = [
    {
        id: 1,
        name: "NEVERITA",
        role: "React, Node.js, MySQL",
        desc: "Collaborative AI Family Menu Planner to reduce food waste. Full stack implementation.",
        colors: {
            primary: "#f7b27b",   // Rojo principal para Neverita
            secondary: "#fff9f4", // Tono más claro
            accent: "#e7832a"     // Acento amarillo
        },
        img: "/neverita.webp",
        bgImg: "/fondoNeverita.webp", // Opcional, puedes poner una imagen de fondo real
        repoUrl: "https://github.com/soyrauw/neverita", // Reemplaza con tu link
        liveUrl: "https://soyrauw.github.io/neverita/"           // Reemplaza con tu link
    },
    {
        id: 2,
        name: "PIXEL & PLUSH",
        role: "React, Supabase",
        desc: "E-Commerce & Gaming Hub with WhatsApp checkout integration. Smooth and fast.",
        colors: {
            primary: "#dcb6f0",   // Color lila claro de los botones y textos principales
            secondary: "#8a6b9e", // Tono púrpura intermedio
            accent: "#24163d"     // Acento rojo (inspirado en el carrito de compras)
        },
        img: "/pixelPlush.webp",
        bgImg: "fondoPixel.webp",
        repoUrl: "https://github.com/soyrauw/pixelyplush",
        liveUrl: "https://soyrauw.github.io/pixelyplush/"
    },
    {
        id: 3,
        name: "PORTAFOLIO",
        role: "React, Vite, CSS",
        desc: "Cyberpunk-themed interactive portfolio with custom animations.", 
        colors: {
            primary: "#fcee0a",   // Amarillo Cyberpunk original
            secondary: "#00fff9", // Cyan
            accent: "#24163d"     // Rojo
        },
        img: "/portafolio.webp",
        bgImg: "/fondoPortafolio.webp",
        repoUrl: "https://github.com/soyrauw/portafolio",
        liveUrl: "https://soyrauw.github.io/portafolio/"
    },
    {
        id: 4,
        name: "POKEMON IMPOSTER",
        role: "HTML, CSS, JavaScript, PokéAPI",
        desc: "Hidden role game focused on playing in physical gatherings with friends. Designed for mobile devices and powered by the Pokémon API.",
        colors: {
            primary: "#fe3a3b",   // Rojo intenso del botón "Comenzar Partida"
            secondary: "#3b4cca", // Azul oscuro/Gris del botón "Añadir Jugador"
            accent: "#f4f4f4"     // Gris claro de fondo de lista
        },
        img: "/pokemon.webp", // Nombre sugerido para la imagen cuando la subas
        bgImg: "fondoPokemon.webp",
        repoUrl: "https://github.com/soyrauw/pokemon",
        liveUrl: "https://soyrauw.github.io/pokemon/"
    },
    {
        id: 5,
        name: "EVERGREEN 2022",
        role: "HTML, CSS, JavaScript",
        desc: "Frontend development of a website for a company supplying chemical inputs for the cheese industry. Clean, modern, and professional interface.",
        colors: {
            primary: "#4ba454",   // Verde principal de los textos y botones grandes
            secondary: "#2c6c32", // Verde más oscuro para contrates
            accent: "#f4f4f4"     // Tono claro del fondo general
        },
        img: "/evergreen.webp", // Nombre sugerido para la imagen
        bgImg: "/fondoEvergreen.webp",
        repoUrl: "https://github.com/soyrauw/evergreen",
        liveUrl: "https://soyrauw.github.io/evergreen/"
    },
    {
        id: 6,
        name: "GESTOCK",
        role: "HTML, CSS, JavaScript, Node.js, MySQL",
        desc: "Inventory and resource management system for a computer lab. Frontend completed, backend inactive due to API loss.",
        colors: {
            primary: "#5dfcf0",   // Cyan brillante del texto stock y botón Acceder
            secondary: "#181b26", // Fondo azul muy oscuro casi gris lateral derecho
            accent: "#1e2230"     // Fondo gris azulado lateral izquierdo
        },
        img: "/gestock.webp", // Nombre sugerido
        bgImg: "/fondoGestock.webp",
        repoUrl: "https://github.com/soyrauw/gestock",
        liveUrl: "https://soyrauw.github.io/gestock/"
    }
];

const ProjectsWheel = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false); // Estado del mensaje

    // CONFIGURACIÓN DE LA RUEDA
    const angleSeparation = 20;
    const offsetIndex = 0; // Índice que empieza horizontal
    const maxRotation = offsetIndex * angleSeparation;
    const minRotation = -((PROJECTS.length - 1 - offsetIndex) * angleSeparation);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            // Restamos window.innerHeight porque es el espacio visible
            const scrollableDistance = rect.height - window.innerHeight;

            if (scrollableDistance <= 0) return;

            let scrolled = Math.max(0, -rect.top);
            scrolled = Math.min(scrolled, scrollableDistance);

            const progress = scrolled / scrollableDistance;

            // Calculamos cuánto gira la rueda en total
            const totalRotationRange = Math.abs(maxRotation - minRotation);
            const currentRotation = maxRotation - (progress * totalRotationRange);

            setRotation(currentRotation);

            // Determinar cuál es el proyecto activo
            let closestIndex = 0;
            let minDistance = Infinity;

            PROJECTS.forEach((proj, index) => {
                const baseAngle = (index - offsetIndex) * angleSeparation;
                const realAngle = baseAngle + currentRotation;
                const dist = Math.abs(realAngle);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestIndex = index;
                }
            });

            setActiveIndex(closestIndex);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [maxRotation, minRotation]);

    // Helper para cargar assets publicos con Vite y GitHub Pages
    const getAssetUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http') || path.startsWith('data:')) return path;
        const cleanPath = path.startsWith('/') ? path.slice(1) : path;
        return `${import.meta.env.BASE_URL}${cleanPath}`;
    };

    // Actualizar fondo y temas de color dinámicamente
    useEffect(() => {
        if (!wrapperRef.current) return;
        const activeProject = PROJECTS[activeIndex];
        const newBgUrl = activeProject.bgImg ? `url(${getAssetUrl(activeProject.bgImg)})` : "none";

        const style = wrapperRef.current.style;
        style.setProperty('--current-bg', newBgUrl);
        // Sobrescribimos las variables CSS globales para toda esta sección
        style.setProperty('--cyber-yellow', activeProject.colors.primary);
        style.setProperty('--cyber-blue', activeProject.colors.secondary);
        style.setProperty('--cyber-red', activeProject.colors.accent);
        
        // Función para actualizar globalmente el scrollbar al color del proyecto activo actual
        const updateScrollColor = () => {
             document.documentElement.style.setProperty('--scrollbar-color', activeProject.colors.primary);
        };
        
        // Actualizar tambíen el scrollbar global con el color principal del activo al cambiar
        updateScrollColor();
        
        // Y actualizar si regresamos desde otra sección
        window.addEventListener('theme-projects', updateScrollColor);

        return () => window.removeEventListener('theme-projects', updateScrollColor);
    }, [activeIndex]);

    const handleImageClick = (e, project) => {
        // Logica especial para el portafolio (Easter Egg)
        if (project.name === "PORTAFOLIO") {
            e.preventDefault(); // Previene que abra el link (o '#')
            setShowEasterEgg(true);
            
            // Ocultar notificación luego de 3 segundos
            setTimeout(() => {
                setShowEasterEgg(false);
            }, 3000);
        }
    };

    const activeProject = PROJECTS[activeIndex];

    return (
        <section
            className="scroll-bound"
            ref={containerRef}
            style={{ height: `${PROJECTS.length * 100}vh` }} // Altura dinámica según proyectos
        >
            <div className="sticky-wrapper" ref={wrapperRef}>

                {/* Fondo dinámico */}
                <div className="carousel-bg"></div>
                <div className="carousel-grid"></div>

                {/* RUEDA GIRATORIA */}
                <div
                    className="big-wheel-container"
                    style={{ '--wheel-rotation': `${rotation}deg` }}
                >
                    {PROJECTS.map((project, index) => {
                        const baseAngle = (index - offsetIndex) * angleSeparation;
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={project.id}
                                className="spoke"
                                style={{ transform: `rotate(${baseAngle}deg)` }}
                            >
                                <a 
                                    href={project.repoUrl || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`card ${isActive ? 'active' : ''}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    {project.name}
                                </a>
                            </div>
                        );
                    })}
                </div>

                {/* INFO PANEL */}
                <div className="info-panel" key={`info-${activeIndex}`}>
                    <h1>{activeProject.name}</h1>
                    <h2>{activeProject.role}</h2>
                    <p>{activeProject.desc}</p>
                </div>

                {/* CHARACTER/PROJECT DISPLAY (Imagen) */}
                <div className="character-display" key={`img-${activeIndex}`}>
                    <a 
                        href={activeProject.liveUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="img-frame flash-border"
                        style={{ display: 'block', textDecoration: 'none', pointerEvents: 'auto' }}
                        onClick={(e) => handleImageClick(e, activeProject)}
                    >
                        <img
                            src={getAssetUrl(activeProject.img)}
                            alt={activeProject.name}
                            className="charImage"
                        />
                    </a>
                </div>

                {/* MENSAJE TIPO TOAST PARA EL EASTER EGG */}
                <div className={`easter-egg-toast ${showEasterEgg ? 'show' : ''}`}>
                    I think you're already here, buddy. 😎
                </div>

            </div>
        </section>
    );
};

export default ProjectsWheel;