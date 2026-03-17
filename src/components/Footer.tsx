import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="about" className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Vaishnavi Travels Logo" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-display font-black text-primary-foreground text-lg leading-tight">Vaishnavi Travels</p>
                <p className="text-[10px] text-primary-foreground/50 leading-none tracking-widest uppercase">Mangalore</p>
              </div>
            </div>
            <p className="font-body text-primary-foreground/60 text-sm leading-relaxed mb-5">
              Mangalore's most trusted vehicle rental company. We provide comfortable, safe and affordable travel solutions across destinations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-black text-primary-foreground text-sm uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", id: "home" },
                { label: "Our Services", id: "services" },
                { label: "Our Fleet", id: "fleet" },
                { label: "Customer Reviews", id: "reviews" },
                { label: "Book Now", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="font-body text-primary-foreground/60 text-sm hover:text-accent-orange transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-black text-primary-foreground text-sm uppercase tracking-widest mb-4">Our Services</h4>
            <ul className="space-y-2">
              {["Local Taxi Service", "Outstation Cabs", "Airport Transfers", "Tour Packages", "Tempo Traveller", "Bus Rentals"].map((s) => (
                <li key={s}>
                  <span className="font-body text-primary-foreground/60 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-black text-primary-foreground text-sm uppercase tracking-widest mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone size={14} className="text-accent-orange mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+918088753948" className="font-body text-primary-foreground/70 text-sm hover:text-accent-orange transition-colors block">+91 80887 53948</a>
                  <a href="tel:+918277670569" className="font-body text-primary-foreground/70 text-sm hover:text-accent-orange transition-colors block">+91 82776 70569</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={14} className="text-accent-orange mt-0.5 shrink-0" />
                <a href="mailto:vaishnavitravels42@gmail.com" className="font-body text-primary-foreground/70 text-sm hover:text-accent-orange transition-colors">
                  vaishnavitravels42@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-accent-orange mt-0.5 shrink-0" />
                <p className="font-body text-primary-foreground/70 text-sm">
                  Mannagudda, Mangalore<br />Karnataka, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} Vaishnavi Travels, Mangalore. All rights reserved.
          </p>
          <p className="font-body text-primary-foreground/40 text-xs">
            Mangalore's Most Trusted Travel Partner
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
