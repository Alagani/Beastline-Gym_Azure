import { motion } from 'motion/react';
import { Phone } from 'lucide-react';
import { PHONE } from '../../constants';

export default function Hero() {
  const base = import.meta.env.BASE_URL;
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end px-6 md:px-12 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          alt="Hero background"
          className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          src={`${base}Media.jfif`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col gap-6 max-w-4xl"
      >
        <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] uppercase">
          Vj's Beastline GYM
        </h1>
        <p className="text-lg md:text-xl text-brand-on-surface-variant max-w-xl font-medium">
          Affordable gym in Mangalam, Tirupati. No excuses. Just results. Join the community that builds champions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a href={`tel:+${PHONE}`} className="bg-brand-red text-white font-bold px-8 py-4 rounded-full flex justify-center items-center gap-2 hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-brand-red/10">
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <a
            href={`https://wa.me/${PHONE}?text=Hi%2C%20I%27m%20interested%20in%20joining%20Vj's%20Beastline%20Gym!`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-4 rounded-full flex justify-center items-center gap-2 hover:bg-white/20 transition-all active:scale-95"
          >
            <i className="fa-brands fa-whatsapp text-[#25D366] text-xl" aria-hidden="true"></i>
            WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
}
