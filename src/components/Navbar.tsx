import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Home", "Services", "Fleet", "About", "Reviews", "Gallery", "Contact"];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm shadow-elevated">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Vaishnavi Travels Logo" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-display font-black text-primary-foreground text-lg leading-tight">Vaishnavi Travels</p>
            <p className="text-[10px] text-primary-foreground/60 leading-none tracking-widest uppercase">Mangalore</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-primary-foreground/80 hover:text-primary-foreground font-body text-sm font-medium transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+918088753948" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium transition-colors">
            <Phone size={14} />
            +91 80887 53948
          </a>
          <button
            onClick={() => scrollTo("contact")}
            className="gradient-cta text-accent-orange-foreground font-display font-bold text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Book Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-primary-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-primary-foreground/10 px-4 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-primary-foreground/80 hover:text-primary-foreground font-body text-sm font-medium text-left transition-colors"
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="gradient-cta text-accent-orange-foreground font-display font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity w-full mt-2"
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
