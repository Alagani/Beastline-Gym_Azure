import { motion } from 'motion/react';

const highlights = [
  {
    title: "Gym in Mangalam",
    text: "A convenient fitness center for people around Mangalam, Saptagiri Colony, and nearby Tirupati neighborhoods.",
  },
  {
    title: "Strength & Cardio",
    text: "Free weights, strength machines, and cardio equipment for beginners, regular lifters, and serious transformation goals.",
  },
  {
    title: "Affordable Memberships",
    text: "Monthly, six-month, and annual plans designed for local members who want consistent training without overpaying.",
  },
];

export default function LocalSEO() {
  return (
    <section className="px-6 md:px-12 py-20 bg-brand-charcoal/30">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-white">Gym in Mangalam, Tirupati</h2>
          <p className="mt-5 text-lg text-brand-on-surface-variant leading-relaxed font-medium">
            Vj's Beastline GYM is built for people searching for a reliable, affordable gym in Mangalam and Tirupati. Visit us for strength training, cardio workouts, personal training guidance, and a disciplined fitness environment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <div key={item.title} className="border border-brand-outline/20 bg-brand-surface/60 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-brand-on-surface-variant font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
