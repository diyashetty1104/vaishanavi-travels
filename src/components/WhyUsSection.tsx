import { Shield, Clock, ThumbsUp, MapPin } from "lucide-react";

const whyUs = [
  {
    icon: Shield,
    title: "Safe & Reliable",
    description: "All our drivers are verified and trained. Your safety is our top priority on every journey.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "We're available round the clock. Book any time, day or night, for any destination.",
  },
  {
    icon: ThumbsUp,
    title: "Transparent Pricing",
    description: "No hidden charges. Get upfront pricing with all inclusions clearly stated before you book.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description: "Our drivers know Mangalore and surrounding regions like the back of their hand.",
  },
];

const WhyUsSection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="w-11 h-11 rounded-xl gradient-cta flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon size={20} className="text-accent-orange-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-primary-foreground text-sm mb-1">{item.title}</h3>
                  <p className="font-body text-primary-foreground/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
