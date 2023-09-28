import React from "react";
import ServicesButtonStyle from "./ServicesButtonStyle";

export default function Service(props) {
  return (
    <section className="h-[100vh] bg-[#e3f5ffba] flex flex-col justify-center bg-opacity-25">
      <div className="w-[90%] m-auto">
        <p className="text-[#575757] text[1.563rem] text-center">
          WHO IT'S FOR
        </p>
        <h1 className="text-[3.75rem] font-bold text-[#0191E7] text-center">
          Explore the new standard for
        </h1>
        <h1 className="text-[3.75rem] font-bold text-[#0191E7] text-center">
          service professionals
        </h1>
        <div className="text-center mt-10 text[1.563rem] text-[#575757] flex justify-center gap-7">
          <p>Client based</p>
          <p>•</p>
          <p>Service-oriented businesses</p>
          <p>•</p>
          <p>Up to 10 employees</p>
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-20 w-[80%] mx-auto">
          <ServicesButtonStyle img="/Writing.svg" text="Writing" />
          <ServicesButtonStyle img="/Photography.svg" text="Photography" />
          <ServicesButtonStyle img="/Marketing.svg" text="Marketing" />
          <ServicesButtonStyle img="/Coaching.svg" text="Coaching Design" />
          <ServicesButtonStyle img="/Florist.svg" text="Florist" />
          <ServicesButtonStyle img="/Design.svg" text="Design" />
          <ServicesButtonStyle img="/Videography.svg" text="Videography" />
          <ServicesButtonStyle img="/ClientBased.svg" text="Client based" />
          <ServicesButtonStyle img="/Development.svg" text="Development" />
          <ServicesButtonStyle img="/Contractor.svg" text="Contractor" />
          <ServicesButtonStyle img="/Consulting.svg" text="Consulting" />
        </div>
      </div>
    </section>
  );
}
