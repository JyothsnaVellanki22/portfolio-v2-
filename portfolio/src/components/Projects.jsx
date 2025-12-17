import React from 'react';
import { Link } from 'react-router-dom';

const Projects = () => {
    return (
        <section id="projects" className="section projects-section">
            <h2 className="section-title">Projects</h2>
            <ul className="project-list">
                <li className="project-item">
                    <div className="project-content">
                        <h3>Portfolio (v2)</h3>
                        <p>
                            The current site you're viewing! A complete rewrite using React and Vite to enhance performance and maintainability. Features component-based architecture, dynamic routing, and a custom design system with dark mode spotlight effects—a major upgrade from the static v1.
                        </p>
                        <ul className="tech-list">
                            <li>React</li>
                            <li>Vite</li>
                            <li>Vanilla CSS</li>
                        </ul>
                    </div>
                </li>
                <li className="project-item">
                    <div className="project-content">
                        <h3>
                            <a href="https://portfolio-five-xi-16.vercel.app/" target="_blank" rel="noreferrer">Portfolio (v1)</a>
                        </h3>
                        <p>
                            Developed a modern portfolio site using semantic HTML, responsive CSS layouts, and JavaScript for interactivity, including project cards, animations, and smooth navigation.
                        </p>
                        <ul className="tech-list">
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>JS</li>
                        </ul>
                    </div>

                </li>
                {/* Add more projects here */}
            </ul>
            <div className="archive-link-wrapper">
                <Link to="/archive" className="archive-link">
                    View Full Project Archive →
                </Link>
            </div>
        </section>
    );
};

export default Projects;
