import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { SiVercel } from 'react-icons/si';
/* Icons will be added later */

const Sidebar = () => {
    return (
        <header className="sidebar">
            <div className="sidebar-content">
                <h1>Jyothsna</h1>
                <h2>Software Engineer</h2>
                <p>I build things for the web.</p>

                <nav className="nav">
                    <ul>
                        <li><a href="#about" className="nav-link">About</a></li>
                        <li><a href="#experience" className="nav-link">Experience</a></li>
                        <li><a href="#projects" className="nav-link">Projects</a></li>
                    </ul>
                </nav>

                <div className="socials">
                    <a href="#" className="social-link"><FaGithub /></a>
                    <a href="#" className="social-link"><FaLinkedin /></a>
                    <a href="#" className="social-link"><SiVercel /></a>
                    <a href="#" className="social-link"><FaInstagram /></a>
                </div>
            </div>
        </header>
    );
};

export default Sidebar;
