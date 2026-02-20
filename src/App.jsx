import React from 'react';
import Hero from './components/Hero';
import Highlights from './components/Highlights';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[#1a2235] text-white/70 font-sans flex flex-col">
      <Hero />
      <Highlights />
      <Contact />
    </div>
  );
}

export default App;
