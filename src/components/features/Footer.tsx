import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-20 bg-brand-charcoal/50 border-t border-brand-outline/20 flex flex-col items-center text-center px-6 gap-10">
      <div className="flex items-center gap-2">
        <Dumbbell className="text-brand-red w-8 h-8" />
        <span className="font-headline text-3xl font-extrabold text-white tracking-tighter">Vj's Beastline GYM</span>
      </div>

      <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 font-bold text-brand-on-surface-variant">
        <a className="hover:text-brand-red transition-colors" href="#privacy">Privacy Policy</a>
        <a className="hover:text-brand-red transition-colors" href="#terms">Terms of Service</a>
        <a className="hover:text-brand-red transition-colors" href="#location">Location</a>
        <a className="hover:text-brand-red transition-colors" href="#schedule">Class Schedule</a>
      </div>

      <div className="text-brand-on-surface-variant/60 font-medium max-w-md">
        © {new Date().getFullYear()} Vj's Beastline GYM.<br />
        <span className="text-brand-red font-black tracking-widest text-xs mt-4 block">DISCIPLINE IS FREEDOM</span>
        <span className="text-brand-on-surface-variant/80 block mt-2">Developed by Alagani Jagadeesh</span>
      </div>
    </footer>
  );
}
