import { motion } from 'motion/react';
import { TrendingUp, Dumbbell, Award } from 'lucide-react';
import type { FacilityItem } from '../../types';

const items: FacilityItem[] = [
  { title: "Cardio Zone", desc: "State-of-the-art treadmills, ellipticals, and bikes to get your heart pumping.", icon: TrendingUp },
  { title: "Free Weights", desc: "Extensive selection of dumbbells, barbells, and racks for serious strength training.", icon: Dumbbell },
  { title: "Expert Trainers", icon: Award, desc: "Certified professionals ready to guide your form and build custom programs." },
];

export default function Facilities() {
  return (
    <section className="px-6 md:px-12 py-24 bg-brand-charcoal/30 flex flex-col gap-16 items-center">
      <h2 className="text-4xl md:text-5xl font-black text-white text-center">Facilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center gap-6"
          >
            <div className="w-24 h-24 bg-brand-charcoal rounded-full flex items-center justify-center text-brand-red border border-brand-outline/20">
              <item.icon className="w-10 h-10" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className="text-brand-on-surface-variant font-medium max-w-xs">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
