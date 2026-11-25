import React, { useEffect } from 'react';
import TopNavbar from './components/TopNavbar';
import MainContent from './components/MainContent';

function App() {
  // Spotlight torch effect à la Brittany Chiang
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#141c2c] text-white/70 relative selection:bg-[#47b8ec]/30 selection:text-white">
      {/* Spotlight overlay */}
      <div className="mouse-glow" />

      {/* Barra de Navegação Superior */}
      <TopNavbar />

      {/* Conteúdo Principal com todas as seções e projetos */}
      <main className="relative z-10">
        <MainContent />
      </main>
    </div>
  );
}

export default App;
