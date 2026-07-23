import { motion } from 'motion/react';
import { Quote, Users } from 'lucide-react';
import type { Testimonial } from '../../types';

const stories: Testimonial[] = [
  { name: "Sarah M.", quote: "Best local gym by far. The equipment is always clean and the staff is super friendly. Highly recommend!" },
  { name: "David R.", quote: "Finally found a place where I feel comfortable. The community here is incredibly supportive and motivating." },
  { name: "Elena T.", quote: "The personal trainers are top-notch. I've seen more progress in 3 months here than a year at my old gym." },
];

export default function Testimonials() {
  return (
    <section className="px-6 md:px-12 py-24 bg-brand-charcoal/30 flex flex-col gap-12 max-w-6xl mx-auto w-full">
      <h2 className="text-4xl md:text-5xl font-black text-white text-center">Member Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-brand-charcoal rounded-2xl p-8 flex flex-col gap-6 relative border border-brand-outline/10"
          >
            <Quote className="text-brand-red w-12 h-12 opacity-20 absolute top-6 left-6" />
            <p className="text-lg text-brand-on-surface-variant italic font-medium relative z-10 leading-relaxed">
              "{story.quote}"
            </p>
            <div className="mt-auto pt-6 border-t border-brand-outline/20 font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-red" />
              - {story.name}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
