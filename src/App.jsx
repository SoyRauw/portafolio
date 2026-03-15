import React, { useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectsWheel from './components/ProjectsWheel';
import CyberwareSection from './components/CyberwareSection';
import DataLogsSection from './components/DataLogsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Escuchar el scroll a nivel de ventana para decidir qué color tiene la barra
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerPoint = scrollY + (windowHeight * 0.5); // Check color based on the middle of the screen

      const sections = ['home', 'projects', 'cyberware', 'logs', 'contact'];
      
      // Find which section is currently at the middle of the screen
      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= triggerPoint) {
           
           if (id === 'home') document.documentElement.style.setProperty('--scrollbar-color', '#00fff9');
           else if (id === 'cyberware') document.documentElement.style.setProperty('--scrollbar-color', '#fcee0a');
           else if (id === 'logs') document.documentElement.style.setProperty('--scrollbar-color', '#27c93f');
           else if (id === 'contact') document.documentElement.style.setProperty('--scrollbar-color', '#ff003c');
           else if (id === 'projects') {
              window.dispatchEvent(new Event('theme-projects'));
           }
           break; // We found the current section, stop checking
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial color on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Header />
      <div id="home"><HeroSection /></div>
      <div id="projects"><ProjectsWheel /></div>
      <div id="cyberware"><CyberwareSection /></div>
      <div id="logs"><DataLogsSection /></div>
      <div id="contact"><ContactSection /></div>
      <Footer />
    </div>
  );
}

export default App;