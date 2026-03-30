import React from 'react';
import GameDevHero from './components/GameDevHero';
import GameDevHighlights from './components/GameDevHighlights';
import GameDevContact from './components/GameDevContact';

function GameDevPage() {
  return (
    <div className="min-h-screen bg-[#1a2235] text-white/70 font-sans flex flex-col">
      <GameDevHero />
      <GameDevHighlights />
      <GameDevContact />
    </div>
  );
}

export default GameDevPage;
