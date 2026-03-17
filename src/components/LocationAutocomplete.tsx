import { useState, useRef, useEffect } from "react";
import { MapPin, Search, X } from "lucide-react";

const mangalorLocations = [
  // City Areas
  "Mangalore City Centre",
  "Mannagudda",
  "Hampankatta",
  "Lalbagh",
  "Balmatta",
  "Kadri",
  "Bejai",
  "Kankanady",
  "Attavar",
  "Falnir",
  "Bendoorwell",
  "Pumpwell",
  "Urwa",
  "Kulur",
  "Kuntikana",
  "Bikarnakatte",
  "Bondel",
  "Derebail",
  "Padil",
  "Jeppu",
  "Bunts Hostel",
  "Kodialbail",
  "Dongerkery",
  "Boloor",
  "Kavoor",
  "Surathkal",
  "Katipalla",
  "Mulki",
  "Moodbidri",
  "Bajpe",
  // Landmarks & Transit
  "Mangalore Airport (IXE)",
  "Mangalore Central Railway Station",
  "Mangalore Junction Railway Station",
  "KSRTC Bus Stand",
  "City Bus Stand",
  // Hospitals & Colleges
  "KMC Hospital",
  "AJ Hospital",
  "Wenlock Hospital",
  "Fr. Muller Hospital",
  "Manipal College",
  // Popular Outstation
  "Udupi",
  "Manipal",
  "Kundapur",
  "Kasaragod",
  "Dharmasthala",
  "Kukke Subramanya",
  "Coorg (Madikeri)",
  "Sakleshpur",
  "Goa",
  "Bangalore",
  "Mysore",
  "Hassan",
  "Chikmagalur",
  "Ooty",
];

interface Props {
  placeholder: string;
  icon?: "pin" | "search";
  value: string;
  onChange: (val: string) => void;
}

const LocationAutocomplete = ({ placeholder, icon = "pin", value, onChange }: Props) => {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = query.length > 0
    ? mangalorLocations.filter((l) => l.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : mangalorLocations.slice(0, 8);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const select = (loc: string) => {
    setQuery(loc);
    onChange(loc);
    setOpen(false);
    setFocused(false);
  };

  const clear = () => {
    setQuery("");
    onChange("");
  };

  const Icon = icon === "pin" ? MapPin : Search;

  return (
    <div ref={wrapperRef} className="relative">
      <div className={`flex items-center gap-2 border rounded-lg px-3 py-2.5 bg-surface-light transition-colors ${focused ? "border-accent-orange" : "border-border"}`}>
        <Icon size={15} className="text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => { setFocused(true); setOpen(true); }}
          className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none min-w-0"
          autoComplete="off"
        />
        {query && (
          <button onClick={clear} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={13} />
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-elevated overflow-hidden">
          {filtered.map((loc) => (
            <button
              key={loc}
              onMouseDown={() => select(loc)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-accent-orange/10 transition-colors group"
            >
              <MapPin size={12} className="text-accent-orange shrink-0" />
              <span className="font-body text-sm text-foreground group-hover:text-accent-orange transition-colors truncate">{loc}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
