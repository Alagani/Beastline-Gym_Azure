import { motion } from 'motion/react';

export default function Gallery() {
  const base = import.meta.env.BASE_URL;
  const images = [
    `${base}Media (2).jfif`,
    `${base}Media (3).jfif`,
    `${base}Media (4).jfif`,
  ];

  return (
    <section className="px-6 md:px-12 py-24 flex flex-col gap-14 max-w-7xl mx-auto w-full">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
          Gallery
        </h2>

        <p className="text-brand-on-surface-variant max-w-2xl mx-auto text-lg">
          Premium machines. Serious training environment. Built for strength.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

        {/* Image 1 - full width top */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="md:col-span-2 rounded-2xl overflow-hidden relative h-72 md:h-96"
        >
          <img src={images[0]} alt="Gym 1" className="w-full h-full object-cover" />
        </motion.div>

        {/* Image 2 - bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden relative h-64 md:h-80"
        >
          <img src={images[1]} alt="Gym 2" className="w-full h-full object-cover" />
        </motion.div>

        {/* Image 3 - bottom right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden relative h-64 md:h-80"
        >
          <img src={images[2]} alt="Gym 3" className="w-full h-full object-cover" />
        </motion.div>

      </div>
    </section>
  );
}
