import { Car, MapPin, Plane, Navigation, Map, Key } from "lucide-react";
import carUrbania from "@/assets/car-urbania.jpg";

const services = [
  {
    icon: Car,
    title: "Force Urbania — Luxury Van",
    description: "The Force Urbania combines luxury, space, and practicality to deliver a premium travel experience. Designed for ultimate passenger comfort, it features plush seating, smooth suspension, and convenient amenities like USB charging ports for every traveler. Perfect for corporate trips, family journeys, or group travel, Urbania ensures a stylish and comfortable ride every time.",
    featured: true,
  },
  {
    icon: Car,
    title: "Taxi Service in Mangalore",
    description: "AC/Non-AC taxi service with Toyota Etios, Innova, Tempo Traveller hire in Mangalore and luxury options.",
    featured: false,
  },
  {
    icon: Map,
    title: "Tour Packages",
    description: "Customized Mangalore tour packages for temple tours, beaches & hill stations. Safe, affordable rides.",
    featured: false,
  },
  {
    icon: Navigation,
    title: "Tempo Traveller Hire",
    description: "Top tempo traveller hire in Mangalore. Affordable Tempo Traveller rental for group travel.",
    featured: false,
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Seamless airport pick-up and drop service. Professional drivers ensure timely, hassle-free transfers.",
    featured: false,
  },
  {
    icon: MapPin,
    title: "Outstation Trips",
    description: "Reliable outstation cab service from Mangalore to Goa, Bangalore, Coorg, Ooty and beyond.",
    featured: false,
  },
  {
    icon: Key,
    title: "Car Rental",
    description: "Flexible car rental service in Mangalore for hourly, daily or weekly hire. Choose from sedans, SUVs and vans — with or without driver — at affordable rates.",
    featured: false,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="font-display text-accent-orange font-semibold text-xs tracking-widest uppercase mb-2">What We Offer</p>
          <h2 className="font-display font-black text-primary text-3xl md:text-4xl mb-3">
            TAXI SERVICE IN MANGALORE
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base">
            Our aim is to provide the most attractive and leisurely travel experiences to all our customers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className={`group p-6 rounded-xl border transition-all duration-300 ${
                  service.featured
                    ? "sm:col-span-2 lg:col-span-3 border-accent-orange/60 bg-gradient-to-br from-primary to-primary/90 shadow-elevated"
                    : "border-border hover:border-accent-orange/40 shadow-card hover:shadow-elevated bg-card"
                }`}
              >
                {service.featured ? (
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    {/* Text side */}
                    <div className="flex-1">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-accent-orange/20">
                        <Icon size={22} className="text-accent-orange" />
                      </div>
                      <span className="inline-block bg-accent-orange text-white font-display font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-widest mb-2">
                        ★ Luxury Vehicle
                      </span>
                      <h3 className="font-display font-bold text-primary-foreground text-xl mb-2">
                        {service.title}
                      </h3>
                      <p className="font-body text-sm leading-relaxed text-primary-foreground/75 max-w-2xl">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {["USB Charging", "Recliner Seats", "AC", "Smooth Suspension"].map((tag) => (
                          <span key={tag} className="bg-primary-foreground/10 text-primary-foreground font-display font-bold text-[10px] px-3 py-1 rounded-full tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Image side */}
                    <div className="flex-shrink-0 w-full md:w-72 h-48 flex items-center justify-center overflow-hidden rounded-xl">
                      <img
                        src={carUrbania}
                        alt="Force Urbania"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 gradient-cta group-hover:scale-110 transition-transform">
                      <Icon size={22} className="text-accent-orange-foreground" />
                    </div>
                    <h3 className="font-display font-bold text-base mb-2 text-primary">
                      {service.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
