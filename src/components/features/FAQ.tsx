import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../../types';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItemComponent: FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-brand-charcoal border border-brand-outline/20 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex justify-between items-center bg-transparent transition-colors hover:bg-white/5"
      >
        <span className="font-bold text-white text-lg">{question}</span>
        <ChevronDown className={`text-brand-red transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-6 text-brand-on-surface-variant font-medium leading-relaxed overflow-hidden"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqItems: FAQItem[] = [
  {
    question: "What are your operating hours?",
    answer: "We are open Monday through Friday from 5:00 AM to 11:00 PM, and on weekends from 7:00 AM to 8:00 PM."
  },
  {
    question: "Do you offer personal training?",
    answer: "Yes! We have a team of certified personal trainers ready to help you reach your goals. You can book a free consultation at the front desk."
  },
  {
    question: "Is there a joining fee?",
    answer: "We believe in transparency. Our joining fees are minimal and often waived during special promotion periods. Check our current offers!"
  },
  {
    question: "Are lockers and showers available?",
    answer: "Yes, we provide clean, fully equipped locker rooms with secure lockers and private showers for all members."
  },
  {
    question: "Can I freeze my membership if I travel?",
    answer: "Absolutely. You can freeze your membership for up to 3 months per year for travel or medical reasons."
  }
];

export default function FAQ() {
  return (
    <section className="px-6 md:px-12 py-24 flex flex-col gap-12 max-w-3xl mx-auto w-full">
      <h2 className="text-4xl md:text-5xl font-black text-white text-center">FAQ</h2>
      <div className="flex flex-col gap-4">
        {faqItems.map((item) => (
          <FAQItemComponent
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </section>
  );
}
