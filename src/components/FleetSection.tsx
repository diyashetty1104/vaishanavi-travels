import carEtios from "@/assets/car-etios.png";
import carDzire from "@/assets/car-dzire.png";
import carInnova from "@/assets/car-innova.png";
import carTempo from "@/assets/car-tempo-new.jpg";
import carUrbania from "@/assets/car-urbania.jpg";
import carCoach from "@/assets/car-coach.jpg";

const luxuryFleet = [
  { image: carUrbania, name: "Force Urbania", type: "Luxury Van", capacity: "13+1", ac: true },
];

const standardFleet = [
  { image: carEtios, name: "Toyota Etios", type: "Sedan", capacity: "4+Driver", ac: true },
  { image: carDzire, name: "Maruti Suzuki Dzire", type: "Sedan", capacity: "4+Driver", ac: true },
  { image: carInnova, name: "Innova Crysta", type: "MPV", capacity: "7+Driver", ac: true },
  { image: carTempo, name: "Tempo Traveller", type: "Traveller", capacity: "12+Driver", ac: true },
  { image: carCoach, name: "Coach Bus", type: "Bus", capacity: "25–50 Seater", ac: true },
];

const VehicleCard = ({ vehicle, idx }: { vehicle: typeof standardFleet[0]; idx: number }) => (
  <div
    key={idx}
    className="group bg-card p-8 flex flex-col items-center text-center hover:bg-primary/[0.03] transition-colors"
  >
    <div className="w-full h-44 flex items-center justify-center mb-5 overflow-hidden">
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <h3 className="font-display font-black text-primary text-base mb-1 uppercase tracking-wide">
      {vehicle.name}
    </h3>
    <p className="font-display font-semibold text-muted-foreground text-xs tracking-widest uppercase mb-3">
      {vehicle.type}
    </p>
    <div className="flex items-center gap-2">
      <span className="bg-accent-orange/10 text-accent-orange font-display font-bold text-xs px-3 py-1 rounded-full">
        {vehicle.capacity}
      </span>
      {vehicle.ac && (
        <span className="bg-primary/10 text-primary font-display font-bold text-xs px-3 py-1 rounded-full">
          AC
        </span>
      )}
    </div>
  </div>
);

const FleetSection = () => {
  return (
    <section id="fleet" className="py-20 bg-surface-light">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="font-display text-accent-orange font-semibold text-xs tracking-widest uppercase mb-2">Our Fleet</p>
          <h2 className="font-display font-black text-primary text-3xl md:text-4xl mb-3">
            CHOOSE YOUR RIDE
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base">
            From compact sedans to luxury coaches — we have the perfect vehicle for every journey.
          </p>
        </div>

        {/* Luxury Vehicle Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px flex-1 bg-border" />
            <p className="font-display font-bold text-accent-orange text-xs tracking-widest uppercase px-2">
              ★ Luxury Vehicle
            </p>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {luxuryFleet.map((vehicle, idx) => (
              <div
                key={idx}
                className="group bg-card p-8 flex flex-col items-center text-center hover:bg-primary/[0.03] transition-colors sm:col-span-2 lg:col-span-3"
              >
                <div className="w-full max-w-sm h-52 flex items-center justify-center mb-5 overflow-hidden mx-auto">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-display font-black text-primary text-lg mb-1 uppercase tracking-wide">
                  {vehicle.name}
                </h3>
                <p className="font-display font-semibold text-muted-foreground text-xs tracking-widest uppercase mb-3">
                  {vehicle.type}
                </p>
                <div className="flex items-center gap-2">
                  <span className="bg-accent-orange/10 text-accent-orange font-display font-bold text-xs px-3 py-1 rounded-full">
                    {vehicle.capacity}
                  </span>
                  {vehicle.ac && (
                    <span className="bg-primary/10 text-primary font-display font-bold text-xs px-3 py-1 rounded-full">
                      AC
                    </span>
                  )}
                  <span className="bg-accent-orange font-display font-bold text-xs px-3 py-1 rounded-full text-white">
                    ★ Premium
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Standard Fleet */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px flex-1 bg-border" />
            <p className="font-display font-bold text-muted-foreground text-xs tracking-widest uppercase px-2">
              Standard Fleet
            </p>
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {standardFleet.map((vehicle, idx) => (
              <VehicleCard key={idx} vehicle={vehicle} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
