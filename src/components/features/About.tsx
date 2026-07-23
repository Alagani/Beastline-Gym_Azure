import { motion } from 'motion/react';

export default function About() {
  return (
    <section className="px-6 md:px-12 py-24 flex flex-col gap-8 text-center max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-black text-white"
      >
        About Vj's Beastline GYM
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
        className="text-lg md:text-xl text-brand-on-surface-variant leading-relaxed font-medium"
      >
        Vj's Beastline GYM is a fitness center located in Mangalam, Tirupati. At Vj's Beastline GYM, we provide strength training, cardio workouts, personal training, and transformation programs for all fitness levels.
      </motion.p>
    </section>
  );
}
