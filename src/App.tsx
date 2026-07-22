import { motion, AnimatePresence } from 'motion/react';
import {
  Dumbbell,
  Phone,
  Zap,
  MapPin,
  Clock,
  ChevronDown,
  Quote,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';
import { useState } from 'react';
import Chatbot from './Chatbot';
import { PHONE } from './constants';

// --- Components ---

const Navbar = () => (
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

const Hero = () => {
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
            href={`https://wa.me/${PHONE}?text=Hi%2C%20I%27m%20interested%20in%20joining%20Vj's Beastline%20Gym!`}
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
};

const About = () => (
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

const LocalSEO = () => {
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
};

const Pricing = () => {
  const plans = [
    { name: "Monthly", price: "₹2000", period: "/mo", tag: "POPULAR" },
    { name: "6-Month", price: "₹7000", period: "", sub: "Total for 6 months", tag: "BEST VALUE", highlighted: true },
    { name: "Annual", price: "₹10000", period: "", sub: "SAVE ₹14,000/YR", tag: null },
  ];

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
};

const Facilities = () => {
  const items = [
    { title: "Cardio Zone", desc: "State-of-the-art treadmills, ellipticals, and bikes to get your heart pumping.", icon: TrendingUp },
    { title: "Free Weights", desc: "Extensive selection of dumbbells, barbells, and racks for serious strength training.", icon: Dumbbell },
    { title: "Expert Trainers", icon: Award, desc: "Certified professionals ready to guide your form and build custom programs." },
  ];

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
};

const Gallery = () => {
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
};

const Testimonials = () => {
  const stories = [
    { name: "Sarah M.", quote: "Best local gym by far. The equipment is always clean and the staff is super friendly. Highly recommend!" },
    { name: "David R.", quote: "Finally found a place where I feel comfortable. The community here is incredibly supportive and motivating." },
    { name: "Elena T.", quote: "The personal trainers are top-notch. I've seen more progress in 3 months here than a year at my old gym." },
  ];

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
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
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
};

const FAQ = () => (
  <section className="px-6 md:px-12 py-24 flex flex-col gap-12 max-w-3xl mx-auto w-full">
    <h2 className="text-4xl md:text-5xl font-black text-white text-center">FAQ</h2>
    <div className="flex flex-col gap-4">
      <FAQItem
        question="What are your operating hours?"
        answer="We are open Monday through Friday from 5:00 AM to 11:00 PM, and on weekends from 7:00 AM to 8:00 PM."
      />
      <FAQItem
        question="Do you offer personal training?"
        answer="Yes! We have a team of certified personal trainers ready to help you reach your goals. You can book a free consultation at the front desk."
      />
      <FAQItem
        question="Is there a joining fee?"
        answer="We believe in transparency. Our joining fees are minimal and often waived during special promotion periods. Check our current offers!"
      />
      <FAQItem
        question="Are lockers and showers available?"
        answer="Yes, we provide clean, fully equipped locker rooms with secure lockers and private showers for all members."
      />
      <FAQItem
        question="Can I freeze my membership if I travel?"
        answer="Absolutely. You can freeze your membership for up to 3 months per year for travel or medical reasons."
      />
    </div>
  </section>
);

const Contact = () => (
  <section className="px-6 md:px-12 py-24 flex flex-col md:flex-row gap-16 max-w-6xl mx-auto w-full items-start">
    <div className="flex-1 flex flex-col gap-10">
      <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Visit Us</h2>
      <div className="space-y-8">
        <div className="flex items-start gap-4 text-brand-on-surface-variant">
          <div className="bg-brand-red/10 p-3 rounded-xl border border-brand-red/20">
            <MapPin className="text-brand-red w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-white text-lg">Address</p>
            <p className="font-medium mt-1">506, AMK Arcade, Saptagiri Colony Mangalam,<br />12-505, Mangalam, Andhra Pradesh 517507</p>
          </div>
        </div>

        <div className="flex items-start gap-4 text-brand-on-surface-variant">
          <div className="bg-brand-red/10 p-3 rounded-xl border border-brand-red/20">
            <Phone className="text-brand-red w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-white text-lg">Phone</p>
            <p className="font-medium mt-1">+91 93939 36781</p>
          </div>
        </div>

        <div className="flex items-start gap-4 text-brand-on-surface-variant">
          <div className="bg-brand-red/10 p-3 rounded-xl border border-brand-red/20">
            <Clock className="text-brand-red w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-white text-lg mb-2">Hours</p>
            <div className="flex flex-col gap-1 font-medium">
              <div className="flex justify-between gap-12">
                <span>Mon - Sat</span>
                <span className="text-white">5:00 AM – 10:00 AM</span>
              </div>
              <div className="flex justify-between gap-12">
                <span></span>
                <span className="text-white">5:00 PM – 10:00 PM</span>
              </div>
              <div className="flex justify-between gap-12 mt-1">
                <span>Sunday</span>
                <span className="text-white">5:00 AM – 10:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex-1 w-full h-[450px] bg-brand-charcoal border border-brand-outline/20 rounded-3xl relative overflow-hidden group">
      <iframe
        src="https://maps.google.com/maps?q=vijay+Vj's Beastline+gym+mangalam+tirupati&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute inset-0 pointer-events-none border border-brand-red/10 rounded-3xl" />
    </div>
  </section>
);

const Footer = () => (
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

export default function App() {
  return (
    <div className="min-h-screen pt-20 bg-brand-surface text-brand-on-surface">
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <About />
        <LocalSEO />
        <Pricing />
        <Facilities />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
