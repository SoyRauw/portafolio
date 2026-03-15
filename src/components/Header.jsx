import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        setIsMenuOpen(false); // Close menu on mobile
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`cyber-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-logo" onClick={() => scrollTo('home')}>
                Raúl Martínez <span>DEV</span>
            </div>
            
            <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>

            <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
                <button onClick={() => scrollTo('home')} className="nav-btn">HOME</button>
                <button onClick={() => scrollTo('projects')} className="nav-btn">PROJECTS</button>
                <button onClick={() => scrollTo('cyberware')} className="nav-btn">SKILLS</button>
                <button onClick={() => scrollTo('logs')} className="nav-btn">SUMMARY</button>
                <button onClick={() => scrollTo('contact')} className="nav-btn">CONTACT</button>
            </nav>
        </header>
    );
};

export default Header;
