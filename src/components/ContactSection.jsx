// ContactSection.jsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactSection.css';

const ContactSection = () => {
    const form = useRef();
    const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        // Estos IDs los obtendrás de tu cuenta de EmailJS
        // emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', form.current, 'TU_PUBLIC_KEY')
        emailjs.sendForm('service_5y3zxh3', 'template_icfrvsn', form.current, 'JFEOO4rym-k-nEEat')
            .then((result) => {
                setStatus('success');
                form.current.reset(); // Limpia el formulario
                setTimeout(() => setStatus(null), 5000); // Quita el mensaje de éxito a los 5s
            }, (error) => {
                setStatus('error');
                setTimeout(() => setStatus(null), 5000);
            });
    };

    return (
        <section className="contact-mainframe">
            {/* Cinta de advertencia superior */}
            <div className="warning-tape"></div>

            <div className="uplink-container">
                {/* Asimetría: un header fuerte a la izquierda */}
                <div className="uplink-header">
                    <div className="header-greebles">
                        <span>[SYS.OP.2026]</span>
                        <span className="blink-text">STATUS: ONLINE</span>
                        <span>SEC: OVERRIDE</span>
                    </div>
                    <h2 className="uplink-title">LET'S WORK TOGETHER</h2>
                    <p className="uplink-subtitle">// SEND ME A MESSAGE_</p>
                </div>

                <div className="uplink-body">
                    {/* Panel lateral puramente estético (Data Greebles) */}
                    <div className="side-panel">
                        <div className="barcode"></div>
                        <div className="vertical-text">DATA_STREAM_0XF4</div>
                    </div>

                    {/* Formulario Hacker */}
                    <form className="cyber-form" ref={form} onSubmit={sendEmail}>
                        
                        {/* Estado Visual de Interacción */}
                        {status === 'sending' && <div className="system-msg msg-sending">TRANSMITTING...</div>}
                        {status === 'success' && <div className="system-msg msg-success">PACKET DELIVERED SUCESSFULLY.</div>}
                        {status === 'error' && <div className="system-msg msg-error">CONNECTION FAILED. TRY AGAIN.</div>}

                        <div className="input-group">
                            <label htmlFor="user_name">NAME</label>
                            <input 
                                type="text" 
                                id="user_name" 
                                name="user_name" /* <--- Nombre exacto para EmailJS */
                                className="cyber-input" 
                                placeholder="ENTER YOUR NAME..." 
                                required 
                            />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="user_email">EMAIL</label>
                            <input 
                                type="email" 
                                id="user_email" 
                                name="user_email" /* <--- Nombre exacto para EmailJS */
                                className="cyber-input" 
                                placeholder="ENTER YOUR EMAIL..." 
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="message">MESSAGE</label>
                            <textarea 
                                id="message" 
                                name="message" /* <--- Nombre exacto para EmailJS */
                                className="cyber-input cyber-textarea" 
                                rows="5" 
                                placeholder="ENTER YOUR MESSAGE..." 
                                required
                            ></textarea>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="cyber-btn">
                                <span className="btn-text">SEND MESSAGE</span>
                            </button>
                            
                            <div className="social-networks">
                                <span className="networks-label">PROFESSIONAL NETWORKS:</span>
                                <div className="networks-links">
                                    <a href="https://github.com/soyrauw" target="_blank" rel="noopener noreferrer">GITHUB</a>
                                    <a href="https://www.linkedin.com/in/raulmartinez-dev" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Cinta de advertencia inferior */}
            <div className="warning-tape bottom"></div>
        </section>
    );
};

export default ContactSection;
