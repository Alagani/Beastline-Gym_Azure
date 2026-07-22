import { Dumbbell } from 'lucide-react';
import React from 'react';
import { PHONE } from '../constants';

export const Navbar: React.FC = () => (
  <header className="fixed top-0 w-full z-40 bg-brand-surface/80 backdrop-blur-md border-b border-brand-outline/30 flex justify-between items-center px-6 md:px-12 h-20">
    <div className="flex items-center gap-2">
      <Dumbbell className="text-brand-red w-8 h-8" />
      <span className="font-headline text-xl md:text-2xl font-extrabold text-white tracking-tighter">Vj's Beastline</span>
    </div>
    <a href={`tel:+${PHONE}`} className="bg-brand-red text-white font-bold text-sm px-6 py-2.5 rounded-full hover:brightness-110 transition-all active:scale-95">
      CALL NOW
    </a>
  </header>
);
