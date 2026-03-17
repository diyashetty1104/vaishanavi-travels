import { useState } from "react";
import { ArrowLeftRight, Calendar, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import LocationAutocomplete from "@/components/LocationAutocomplete";
import { BookingPrefill } from "@/pages/Index";

const tripTypes = ["Round Trip", "Local", "Airport"];

interface Props {
  onEnquiry: (data: BookingPrefill) => void;
}

const BookingWidget = ({ onEnquiry }: Props) => {
  const [activeTrip, setActiveTrip] = useState("Round Trip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("07:00");

  const swap = () => {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  };

  const handleEnquiry = () => {
    onEnquiry({ from, to, date, time, tripType: activeTrip });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-16"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/75" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
        <p className="font-display text-accent-orange font-semibold text-sm tracking-widest uppercase mb-3 animate-fade-in">
          Mangalore's Trusted Travel Partner
        </p>
        <h1 className="font-display font-black text-primary-foreground text-4xl md:text-6xl leading-tight mb-2 animate-fade-up">
          SERVICES ACROSS
        </h1>
        <h1 className="font-display font-black text-accent-orange text-4xl md:text-6xl leading-tight mb-8 animate-fade-up">
          DESTINATIONS
        </h1>

        {/* Widget */}
        <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-8 text-left animate-fade-up">
          {/* Trip Type Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tripTypes.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTrip(t)}
                className={`font-display font-bold text-sm px-5 py-2 rounded-full border-2 transition-all ${
                  activeTrip === t
                    ? "gradient-cta text-accent-orange-foreground border-transparent"
                    : "border-border text-foreground hover:border-accent-orange hover:text-accent-orange bg-transparent"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr_1fr] gap-3 items-start">
            {/* From */}
            <div>
              <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">From</label>
              <LocationAutocomplete
                placeholder="Enter Pickup Location"
                icon="pin"
                value={from}
                onChange={setFrom}
              />
            </div>

            {/* Swap Icon */}
            <div className="hidden md:flex items-end pb-2.5">
              <button
                onClick={swap}
                className="w-9 h-9 rounded-full border-2 border-accent-orange flex items-center justify-center hover:bg-accent-orange/10 transition-colors mt-5"
              >
                <ArrowLeftRight size={14} className="text-accent-orange" />
              </button>
            </div>

            {/* To */}
            <div>
              <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">To</label>
              <LocationAutocomplete
                placeholder="Enter Drop Location"
                icon="search"
                value={to}
                onChange={setTo}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">Pick Up Date</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 bg-surface-light">
                <Calendar size={15} className="text-muted-foreground shrink-0" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-body text-foreground outline-none"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">Pick Up Time</label>
              <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-2.5 bg-surface-light">
                <Clock size={15} className="text-muted-foreground shrink-0" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="flex-1 bg-transparent text-sm font-body text-foreground outline-none"
                />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })}
              className="gradient-cta text-accent-orange-foreground font-display font-black text-sm px-10 py-3.5 rounded-full hover:opacity-90 transition-opacity tracking-wider uppercase shadow-elevated"
            >
              Explore Cabs
            </button>
            <button
              onClick={handleEnquiry}
              className="border-2 border-primary text-primary font-display font-bold text-sm px-10 py-3.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all tracking-wider uppercase"
            >
              Send Enquiry
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingWidget;
