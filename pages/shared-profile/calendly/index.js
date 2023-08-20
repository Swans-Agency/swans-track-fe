import React from "react";
import Navbar from "@/components/Calendly/Navbar";
import CalendlyForm from "@/components/Calendly/CalendlyForm";
import Calender from "@/components/Calendly/Calender";
import Image from "next/image";

export default function Index(props) {
  return (
    <section>
      <Navbar />
      <div className="w-[100%] items-center content-center mt-10">
        <div className="w-[90%] m-auto flex justify-center gap-20">
          <CalendlyForm />
          <Calender />
        </div>
      </div>

      <footer className="bg-black">
      <div className="text-center px-[10%] bg-sidebar text-white">
        <h1>
          2023 @ Swans Track LTD, all right reseved
        </h1>
        <a href="#" className="text-blue-400">
          Terms of use | privacy Policy
        </a>
        
      </div>
      </footer>
    </section>
  );
}
