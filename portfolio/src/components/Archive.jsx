import React from 'react';
import { Link } from 'react-router-dom';

const Archive = () => {
    const projects = [
        {
            year: '2025',
            title: 'Fake-Detector (AI-Powered Job Filter)',
            builtWith: ['Python', 'Flask', 'FastAPI', 'Angular', 'PostgreSQL', 'Docker', 'PyTorch'],
        },
        {
            year: '2025',
            title: 'Coca-Cola Enterprise Application',
            builtWith: ['Angular', 'FastAPI', 'PostgreSQL', 'Docker'],
        },
        {
            year: '2025',
            title: 'GenAI Chatbot',
            builtWith: ['React', 'Python', 'LangChain', 'OpenAI'],
        },
        {
            year: '2025',
            title: 'Portfolio (v2)',
            builtWith: ['React', 'Vite', 'Vanilla CSS'],
        },
        {
            year: '2024',
            title: 'Portfolio (v1)',
            builtWith: ['HTML', 'CSS', 'JavaScript'],
        },
        {
            year: '2024',
            title: 'Cam Scanner',
            builtWith: ['Python', 'TensorFlow', 'Tesseract.js', 'Pandas', 'NumPy'],
        },
        {
            year: '2023',
            title: 'Detection of Illicit Messages',
            builtWith: ['NLP', 'Computer Vision', 'SVM', 'CNN'],
        },
        {
            year: '2023',
            title: 'Security Dashboard',
            builtWith: ['React', 'Node.js', 'Power BI'],
        },
        {
            year: '2022',
            title: 'Banking System',
            builtWith: ['PHP', 'HTML', 'MySQL', 'JavaScript'],
        },
    ];

    return (
        <div className="archive-page">
            <header className="archive-header">
                <Link to="/" className="back-link">← Jyothsna</Link>
                <h1 className="big-heading">All Projects</h1>
                <p className="subtitle">A list of things I’ve worked on</p>
            </header>

            <div className="archive-content">
                <table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Title</th>
                            <th className="hide-on-mobile">Built with</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project, i) => (
                            <tr key={i}>
                                <td className="year">{project.year}</td>
                                <td className="title">{project.title}</td>
                                <td className="tech hide-on-mobile">
                                    {project.builtWith.map((item, index) => (
                                        <span key={index} className="tech-tag">{item}</span>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Archive;
