import { useState, useEffect } from "react";
import { Star, Quote, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const staticReviews = [
  {
    name: "Rajesh Kumar",
    location: "Mangalore",
    rating: 5,
    review:
      "Excellent service! Booked a Toyota Innova for our family trip to Coorg. The driver was punctual, courteous and the vehicle was spotless. Highly recommend Vaishnavi Travels!",
    trip: "Mangalore → Coorg",
  },
  {
    name: "Priya Shetty",
    location: "Udupi",
    rating: 5,
    review:
      "Used their airport transfer service multiple times. Always on time and very professional. The booking process is smooth and the drivers are well-behaved. 5 stars!",
    trip: "Airport Transfer",
  },
  {
    name: "Arun Prabhu",
    location: "Bangalore",
    rating: 5,
    review:
      "Hired a Tempo Traveller for our corporate team outing. 15 of us travelled comfortably. Great AC, clean interiors and the driver knew all the routes perfectly.",
    trip: "Corporate Outing",
  },
  {
    name: "Deepa Kamath",
    location: "Mangalore",
    rating: 5,
    review:
      "We booked a mini bus for a wedding function. Very reasonable price and the service was beyond expectations. The team was very cooperative and accommodating.",
    trip: "Wedding Function",
  },
  {
    name: "Mohammed Farhan",
    location: "Mangalore",
    rating: 4,
    review:
      "Good round trip service from Mangalore to Goa. Driver was experienced with mountain roads. Will definitely use Vaishnavi Travels again for future trips.",
    trip: "Mangalore → Goa",
  },
  {
    name: "Sunitha Rao",
    location: "Udupi",
    rating: 5,
    review:
      "Perfect experience for our temple tour. Visited Dharmasthala and Kukke Subramanya. Vaishnavi Travels made our pilgrimage comfortable and memorable. Thank you!",
    trip: "Temple Tour",
  },
];

interface Review {
  id?: string;
  name: string;
  location?: string;
  rating: number;
  review: string;
  trip?: string;
  created_at?: string;
}

const StarPicker = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="focus:outline-none"
        >
          <Star
            size={26}
            className={
              star <= (hovered || value)
                ? "text-accent-orange fill-accent-orange transition-colors"
                : "text-border transition-colors"
            }
          />
        </button>
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-surface-light rounded-xl p-6 border border-border hover:border-accent-orange/30 hover:shadow-card transition-all duration-300">
    <Quote size={28} className="text-accent-orange/30 mb-3" />
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < review.rating ? "text-accent-orange fill-accent-orange" : "text-border"}
        />
      ))}
    </div>
    <p className="font-body text-foreground text-sm leading-relaxed mb-5">"{review.review}"</p>
    <div className="border-t border-border pt-4 flex items-center justify-between">
      <div>
        <p className="font-display font-bold text-primary text-sm">{review.name}</p>
        <p className="font-body text-muted-foreground text-xs">{review.location}</p>
      </div>
      {review.trip && (
        <span className="bg-accent-orange/10 text-accent-orange font-display font-semibold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wide">
          {review.trip}
        </span>
      )}
    </div>
  </div>
);

const ReviewsSection = () => {
  const [dynamicReviews, setDynamicReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", rating: 0, review: "", trip: "" });

  useEffect(() => {
    supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setDynamicReviews(data as Review[]);
      });
  }, []);

  const allReviews = [...dynamicReviews, ...staticReviews];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) return;
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert([
      {
        name: form.name.trim(),
        location: form.location.trim() || null,
        rating: form.rating,
        review: form.review.trim(),
        trip: form.trip.trim() || null,
      },
    ]);
    setSubmitting(false);
    if (!error) {
      // Optimistically add to top
      setDynamicReviews((prev) => [
        { ...form, location: form.location || undefined, trip: form.trip || undefined },
        ...prev,
      ]);
      setSubmitted(true);
    }
  };

  // Overall rating: weighted average of static (4.83) and dynamic reviews
  const allRatings = [
    ...staticReviews.map((r) => r.rating),
    ...dynamicReviews.map((r) => r.rating),
  ];
  const overallRating =
    allRatings.length > 0
      ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1)
      : "4.7";

  return (
    <section id="reviews" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="font-display text-accent-orange font-semibold text-xs tracking-widest uppercase mb-2">
            Customer Feedback
          </p>
          <h2 className="font-display font-black text-primary text-3xl md:text-4xl mb-3">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base">
            Thousands of happy travellers trust Vaishnavi Travels for their journeys across Karnataka and beyond.
          </p>

          {/* Overall Rating Badge */}
          <div className="inline-flex items-center gap-3 mt-6 bg-surface-light border border-accent-orange/30 rounded-2xl px-6 py-3 shadow-card">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={18}
                  className={
                    s <= Math.round(parseFloat(overallRating))
                      ? "text-accent-orange fill-accent-orange"
                      : "text-border"
                  }
                />
              ))}
            </div>
            <span className="font-display font-black text-primary text-2xl">{overallRating}</span>
            <span className="font-body text-muted-foreground text-sm">/ 5</span>
            <span className="font-body text-muted-foreground text-sm">
              · {allRatings.length} reviews
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.slice(0, 6).map((review, idx) => (
            <ReviewCard key={idx} review={review} />
          ))}
        </div>

        {/* Leave a Review CTA */}
        <div className="mt-12 text-center">
          {!showForm && !submitted && (
            <button
              onClick={() => setShowForm(true)}
              className="gradient-cta text-accent-orange-foreground font-display font-black text-sm px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2 tracking-wider uppercase"
            >
              <Star size={16} />
              Leave a Review
            </button>
          )}
        </div>

        {/* Feedback Form */}
        {showForm && !submitted && (
          <div className="mt-10 max-w-xl mx-auto bg-surface-light border border-border rounded-2xl p-8 shadow-card">
            <h3 className="font-display font-black text-primary text-lg mb-6">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    maxLength={100}
                    placeholder="e.g. Rahul Shetty"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border rounded-lg px-3 py-2.5 bg-card text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                    Location
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    placeholder="e.g. Mangalore"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full border border-border rounded-lg px-3 py-2.5 bg-card text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-display font-bold text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                  Your Rating <span className="text-destructive">*</span>
                </label>
                <StarPicker value={form.rating} onChange={(v) => setForm({ ...form, rating: v })} />
                {form.rating === 0 && (
                  <p className="text-xs text-muted-foreground mt-1">Please select a star rating</p>
                )}
              </div>

              <div>
                <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  Trip (optional)
                </label>
                <input
                  type="text"
                  maxLength={100}
                  placeholder="e.g. Mangalore → Coorg"
                  value={form.trip}
                  onChange={(e) => setForm({ ...form, trip: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2.5 bg-card text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors"
                />
              </div>

              <div>
                <label className="block font-display font-bold text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  Your Review <span className="text-destructive">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={600}
                  placeholder="Tell us about your experience..."
                  value={form.review}
                  onChange={(e) => setForm({ ...form, review: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2.5 bg-card text-sm font-body text-foreground placeholder:text-muted-foreground outline-none focus:border-accent-orange transition-colors resize-none"
                />
                <p className="text-xs text-muted-foreground text-right mt-1">{form.review.length}/600</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-border text-muted-foreground font-display font-bold text-sm py-3 rounded-xl hover:bg-border/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || form.rating === 0}
                  className="flex-1 gradient-cta text-accent-orange-foreground font-display font-black text-sm py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send size={15} />
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Success State */}
        {submitted && (
          <div className="mt-10 max-w-xl mx-auto bg-surface-light border border-border rounded-2xl p-10 text-center shadow-card">
            <CheckCircle size={48} className="text-accent-orange mx-auto mb-4" />
            <h3 className="font-display font-black text-primary text-xl mb-2">Thank You!</h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              Your review has been submitted and is now live. We appreciate your feedback!
            </p>
            <button
              onClick={() => { setSubmitted(false); setShowForm(false); setForm({ name: "", location: "", rating: 0, review: "", trip: "" }); }}
              className="mt-6 gradient-cta text-accent-orange-foreground font-display font-bold text-sm px-8 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Write Another
            </button>
          </div>
        )}

        {/* Stats bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "25+", label: "Vehicles" },
            { value: "30+", label: "Years Experience" },
            { value: "2000+", label: "Trips" },
            { value: "10,000+", label: "Happy Customers" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-xl border border-border bg-surface-light">
              <p className="font-display font-black text-accent-orange text-3xl mb-1">{stat.value}</p>
              <p className="font-body text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
