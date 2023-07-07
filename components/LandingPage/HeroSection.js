import React from "react";

import HeroPhone from "./HeroPhone";

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative w-full h-[100vh] overflow-hidden grid desktop:grid-cols-2 gap-0 phone:grid-cols-1"
    >
      <div className="desktop:block">
        <HeroPhone />
      </div>
      <div className="desktop:block phone:hidden">
        <img src="/landingPic.png" />
      </div>
    </section>
  );
}
