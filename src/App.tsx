import Chatbot from './Chatbot';
import {
  Navbar,
  Hero,
  About,
  LocalSEO,
  Pricing,
  Facilities,
  Gallery,
  Testimonials,
  FAQ,
  Contact,
  Footer,
} from './components/features';

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
