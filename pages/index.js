import React from "react";
import HeroSection from "@/components/LandingPage/HeroSection";
import OurFeatures from "@/components/LandingPage/OurFeatures";
import Service from "@/components/LandingPage/Service";
import Join from "@/components/LandingPage/Join";
import Footer from "@/components/LandingPage/Footer";

export default function index() {
  return (
    <main>
      <div className="overflow-hidden relative">
        <HeroSection />
        <OurFeatures/>
        <Service/>
        <Join/>
        <Footer/>
      </div>
    </main>
  );
}
