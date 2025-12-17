import React from 'react';

const Experience = () => {
    return (
        <section id="experience" className="section experience-section">
            <h2 className="section-title">Experience</h2>
            <div className="experience-list">
                <div className="job">
                    <h3>Software Engineer @ CONA</h3>
                    <p className="range">2025 - Present</p>
                    <ul>
                        <li>Built scalable Angular apps and micro-frontends powering enterprise Coca-Cola bottler operations. Developed secure backend microservices with FastAPI/Flask, optimized databases with PostgreSQL/SQLAlchemy, and automated deployments with GitHub Actions & Azure DevOps. Delivered E2E testing frameworks, Dockerized services, and collaborated across teams to ship reliable, user-centric solutions. Designed a full Generative AI chatbot (UI + RAG backend) and supported Databricks/Fabric data workflows.</li>
                    </ul>
                </div>
                <div className="job">
                    <h3>Full-Stack Engineer @ SecruriumFox</h3>
                    <p className="range">2022 - 2023</p>
                    <ul>
                        <li>Developed high-performance web apps using React/Node.js, improving speed and scalability. Built REST APIs, optimized system performance, and implemented automated Python test suites integrated with CI/CD. Strengthened encryption protocols, automated data workflows, and built Power BI dashboards for real-time security insights. Worked cross-functionally to deliver secure, reliable software using Agile practices.</li>
                    </ul>
                </div>
                <div className="job">
                    <h3>Software Engineer @ SecruriumFox</h3>
                    <p className="range">2021</p>
                    <ul>
                        <li>Created full-stack applications with HTML/CSS/JS and Python APIs, improving UI performance and backend efficiency. Optimized SQL databases, automated data pipelines, and built Python test scripts to enhance quality and reduce bugs. Contributed to documentation, testing, data analysis, and implemented encryption protocols to strengthen data integrity and security.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Experience;
