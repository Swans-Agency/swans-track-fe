import React from "react";
import HeroSection from "@/components/LandingPage/HeroSection";
import OurFeatures from "@/components/LandingPage/OurFeatures";
import Service from "@/components/LandingPage/Service";
import Join from "@/components/LandingPage/Join";
import Footer from "@/components/LandingPage/Footer";
import NewNavbar from "@/components/NewLanding/NewNavbar";
import HeroPhone from "@/components/LandingPage/HeroPhone";
import Features from "@/components/LandingPage/Features";

export default function index() {
  return (
    <main>
      <NewNavbar />
      <div className="relative laptop:px-[10%] phone:px-[5%] mt-[7.5rem] ">
        <HeroPhone />
        <Features />
        <Service/>
        <Join/>
        <Footer/> 
      </div>
    </main>
  );
}
