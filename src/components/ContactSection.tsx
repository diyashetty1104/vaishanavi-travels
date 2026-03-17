import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import LocationAutocomplete from "@/components/LocationAutocomplete";
import { BookingPrefill } from "@/pages/Index";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

interface Props {
  prefill?: BookingPrefill | null;
}

const ContactSection = ({ prefill }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    from: "",
    to: "",
    date: "",
    vehicle: "",
    message: "",
  });

  // Pre-fill form whenever booking widget sends data
  useEffect(() => {
    if (prefill) {
      setForm((prev) => ({
        ...prev,
        from: prefill.from || prev.from,
        to: prefill.to || prev.to,
        date: prefill.date || prev.date,
      }));
    }
  }, [prefill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(" ");

    // WhatsApp message lines
    const waLines = [
      `🚖 *New Enquiry – Vaishnavi Travels*`,
      ``,
      `👤 *Name:* ${fullName}`,
      `📞 *Phone:* ${form.phone}`,
      form.email ? `📧 *Email:* ${form.email}` : null,
      ``,
      `📍 *Pickup:* ${form.from || "Not specified"}`,
      `🏁 *Drop:* ${form.to || "Not specified"}`,
      form.date ? `📅 *Date:* ${form.date}` : null,
      form.vehicle ? `🚗 *Vehicle:* ${form.vehicle}` : null,
      form.message ? `💬 *Message:* ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    // 1. Send automatic email via edge function (background — no customer action needed)
    supabase.functions.invoke("send-enquiry", { body: { ...form } }).catch(console.error);

    // 2. Open customer's WhatsApp pre-filled to +918088753948
    const waUrl = `https://wa.me/918088753948?text=${encodeURIComponent(waLines)}`;
    window.open(waUrl, "_blank");

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <p className="font-display text-accent-orange font-semibold text-xs tracking-widest uppercase mb-3">Get In Touch</p>
            <h2 className="font-display font-black text-primary-foreground text-3xl md:text-4xl mb-4">
              BOOK YOUR RIDE <br />OR SEND ENQUIRY
            </h2>
            <p className="font-body text-primary-foreground/70 text-base mb-8 leading-relaxed">
              Contact us for the best cab rates in Mangalore. Our team is available 24/7 to assist you with your travel needs.
            </p>

            {/* Contact details */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl gradient-cta flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-accent-orange-foreground" />
                </div>
                <div>
                  <p className="font-display font-bold text-primary-foreground text-sm">Call / WhatsApp</p>
                  <a href="tel:+918088753948" className="font-body text-primary-foreground/70 text-sm hover:text-accent-orange transition-colors block">
                    +91 80887 53948
                  </a>
                  <a href="tel:+918277670569" className="font-body text-primary-foreground/70 text-sm hover:text-accent-orange transition-colors block">
                    +91 82776 70569
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl gradient-cta flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-accent-orange-foreground" />
                </div>
                <div>
                  <p className="font-display font-bold text-primary-foreground text-sm">Email Us</p>
                  <a href="mailto:vaishnavitravels42@gmail.com" className="font-body text-primary-foreground/70 text-sm hover:text-accent-orange transition-colors">
                    vaishnavitravels42@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl gradient-cta flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-accent-orange-foreground" />
                </div>
                <div>
                  <p className="font-display font-bold text-primary-foreground text-sm">Our Office</p>
                  <p className="font-body text-primary-foreground/70 text-sm">
                    Mannagudda, Mangalore, Karnataka, India
                  </p>
                  <a
                    href="tel:+918088753948"
                    className="inline-flex items-center justify-center gap-2 mt-3 w-full gradient-cta text-accent-orange-foreground font-display font-black text-sm py-3.5 rounded-xl hover:opacity-90 transition-opacity tracking-wider uppercase"
                  >
                    <Phone size={16} />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-card rounded-2xl shadow-elevated p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <CheckCircle size={52} className="text-accent-orange mb-4" />
                <h3 className="font-display font-black text-primary text-xl mb-2">Thank You!</h3>
                <p className="font-body text-muted-foreground text-sm max-w-xs leading-relaxed">
                  We've received your enquiry and will get back to you within <span className="font-bold text-primary">3 hours</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 gradient-cta text-accent-orange-foreground font-display font-bold text-sm px-8 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  New Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display font-black text-primary text-lg mb-5">Send Enquiry / Book Now</h3>

                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                      First Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="First"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 bg-surface-light text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">Middle Name</label>
                    <input
                      type="text"
                      placeholder="Middle"
                      value={form.middleName}
                      onChange={(e) => setForm({ ...form, middleName: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 bg-surface-light text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">Last Name</label>
                    <input
                      type="text"
                      placeholder="Last"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 bg-surface-light text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                      Phone <span className="text-destructive">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 bg-surface-light text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 bg-surface-light text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">From</label>
                    <LocationAutocomplete
                      placeholder="Pickup Location"
                      icon="pin"
                      value={form.from}
                      onChange={(val) => setForm({ ...form, from: val })}
                    />
                  </div>
                  <div>
                    <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">To</label>
                    <LocationAutocomplete
                      placeholder="Drop Location"
                      icon="search"
                      value={form.to}
                      onChange={(val) => setForm({ ...form, to: val })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">Travel Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 bg-surface-light text-sm font-body text-foreground outline-none focus:border-accent-orange transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">Vehicle Type</label>
                    <select
                      value={form.vehicle}
                      onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                      className="w-full border border-border rounded-lg px-3 py-2.5 bg-surface-light text-sm font-body text-foreground outline-none focus:border-accent-orange transition-colors"
                    >
                      <option value="">Select Vehicle</option>
                      <option>Toyota Etios (Sedan)</option>
                      <option>Maruti Suzuki Dzire (Sedan)</option>
                      <option>Toyota Innova (MPV)</option>
                      <option>Force Urbania (Luxury Van)</option>
                      <option>Tempo Traveller (12+)</option>
                      <option>Mini Bus (21+)</option>
                      <option>Luxury Coach (32+)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">Message</label>
                  <textarea
                    rows={3}
                    placeholder="Any special requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-border rounded-lg px-3 py-2.5 bg-surface-light text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full gradient-cta text-accent-orange-foreground font-display font-black text-sm py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 tracking-wider uppercase"
                >
                  <Send size={16} />
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
