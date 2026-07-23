import { motion } from 'motion/react';
import type { PricingPlan } from '../../types';

const plans: PricingPlan[] = [
  { name: "Monthly", price: "₹2000", period: "/mo", tag: "POPULAR" },
  { name: "6-Month", price: "₹7000", period: "", sub: "Total for 6 months", tag: "BEST VALUE", highlighted: true },
  { name: "Annual", price: "₹10000", period: "", sub: "SAVE ₹14,000/YR", tag: undefined },
];

export default function Pricing() {
  return (
    <section className="px-6 md:px-12 py-24 flex flex-col gap-12 max-w-6xl mx-auto w-full">
      <h2 className="text-4xl md:text-5xl font-black text-white text-center">Membership Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`
              relative bg-brand-charcoal border rounded-2xl p-10 flex flex-col gap-4 text-center overflow-hidden
              ${plan.highlighted ? 'border-brand-red shadow-2xl shadow-brand-red/5 scale-105 z-10' : 'border-brand-outline/20'}
            `}
          >
            {plan.tag && (
              <div className={`
                absolute top-0 inset-x-0 py-1.5 text-[10px] font-black uppercase tracking-[0.2em]
                ${plan.highlighted ? 'bg-brand-red text-white' : 'bg-white/10 text-brand-on-surface-variant'}
              `}>
                {plan.tag}
              </div>
            )}
            <h3 className="text-2xl font-bold text-white mt-4">{plan.name}</h3>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-black text-brand-red flex items-baseline">
                {plan.price}
                <span className="text-lg text-brand-on-surface-variant font-medium ml-1">{plan.period}</span>
              </div>
              {plan.sub && (
                <motion.div
                  initial={plan.sub.includes('SAVE') ? { scale: 0.95, opacity: 0.8 } : {}}
                  animate={plan.sub.includes('SAVE') ? {
                    scale: [0.95, 1.05, 0.95],
                    opacity: [0.8, 1, 0.8],
                  } : {}}
                  transition={plan.sub.includes('SAVE') ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : {}}
                  className={`mt-2 text-sm font-bold ${plan.highlighted ? 'text-brand-on-surface' : 'text-brand-on-surface-variant'}`}
                >
                  {plan.sub}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
