// CyberwareSection.jsx
import React from 'react';
import './CyberwareSection.css';

const SKILL_CATEGORIES = [
    {
        title: "CORE LANGUAGES",
        skills: [
            { name: "JS (ES6+)", level: 100 },
            { name: "HTML5", level: 100 },
            { name: "CSS3", level: 100 },
            { name: "SQL", level: 100 }
        ]
    },
    {
        title: "FRAMEWORKS & LIBS",
        skills: [
            { name: "REACT", level: 100 },
            { name: "NODE.JS", level: 100 }
        ]
    },
    {
        title: "DATABASES & TOOLS",
        skills: [
            { name: "MYSQL", level: 100 },
            { name: "GIT", level: 100 },
            { name: "GITHUB", level: 100 },
            { name: "RESTful APIs", level: 100 }
        ]
    }
];

const CyberwareSection = () => {
    return (
        <section className="cyberware-container">
            <h2 className="cyberware-title" data-text="SKILLS">SKILLS</h2>
            
            <div className="cyberware-grid">
                {SKILL_CATEGORIES.map((category, idx) => (
                    <div className="cyber-panel" key={idx}>
                        <h3 className="panel-title">{category.title}</h3>
                        <div className="skills-list">
                            {category.skills.map((skill, sIdx) => (
                                <div className="skill-item" key={sIdx}>
                                    <div className="skill-header">
                                        <span className="skill-name">{skill.name}</span>
                                        
                                    </div>
                                    <div className="progress-bar-container">
                                        <div 
                                            className="progress-bar glitch-bar" 
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CyberwareSection;
