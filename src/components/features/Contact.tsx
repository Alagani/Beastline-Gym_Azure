import { MapPin, Phone, Clock } from 'lucide-react';

export default function Contact() {
  return (
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
          src="https://maps.google.com/maps?q=vijay+Vj's+Beastline+gym+mangalam+tirupati&output=embed"
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
}
