import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Archive from './components/Archive';
import './App.css';

import ChatWidget from './components/ChatWidget';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app">
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
        }}
      />

      <Routes>
        <Route path="/" element={
          <div className="layout">
            <Sidebar />
            <main className="main-content">
              <About />
              <Experience />
              <Projects />

              <footer className="footer">
                <p>Designed & Built with <a href="https://react.dev/" target="_blank" rel="noreferrer">React</a>. Coded in <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">Visual Studio Code</a>. Powered by <a href="https://vite.dev/" target="_blank" rel="noreferrer">Vite</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noreferrer">Vanilla CSS</a>, deployed with <a href="https://vercel.com/" target="_blank" rel="noreferrer">Vercel</a>.</p>
              </footer>
            </main>
          </div>
        } />
        <Route path="/archive" element={<Archive />} />
      </Routes>

      <ChatWidget />
    </div>
  );
}

export default App;
