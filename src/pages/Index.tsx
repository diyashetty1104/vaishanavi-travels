import { useState } from "react";
import Navbar from "@/components/Navbar";
import BookingWidget from "@/components/BookingWidget";
import WhyUsSection from "@/components/WhyUsSection";
import ServicesSection from "@/components/ServicesSection";
import FleetSection from "@/components/FleetSection";
import ReviewsSection from "@/components/ReviewsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export interface BookingPrefill {
  from: string;
  to: string;
  date: string;
  time: string;
  tripType: string;
}

const Index = () => {
  const [prefill, setPrefill] = useState<BookingPrefill | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <BookingWidget onEnquiry={(data) => {
        setPrefill(data);
        setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50);
      }} />
      <WhyUsSection />
      <ServicesSection />
      <FleetSection />
      <ReviewsSection />
      <GallerySection />
      <ContactSection prefill={prefill} />
      <Footer />
    </div>
  );
};

export default Index;
