import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="cyber-footer">
            <div className="footer-content">
                <div className="footer-logo">
                    Raúl Martínez<span> DEVELOPER</span>
                </div>
                <div className="footer-links">
                    <a href="#home">HOME</a>
                    <a href="#projects">PROJECTS</a>
                    <a href="#cyberware">SKILLS</a>
                    <a href="#logs">SUMMARY</a>
                    <a href="#contact">CONTACT</a>
                </div>
                <div className="footer-motto">
                    <span>// NO FUTURE</span> 
                    <span>WITHOUT CODE_</span>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} RAÚL MARTÍNEZ. ALL SYSTEM RIGHTS RESERVED.</p>
                <div className="status-indicator">
                    <span className="dot blink"></span>
                    SYS.ONLINE
                </div>
            </div>
        </footer>
    );
};

export default Footer;
