import React from "react";
import Navbar from "@/components/Calendly/Navbar";
import CalendlyForm from "@/components/Calendly/CalendlyForm";
import Calender from "@/components/Calendly/Calender";

export default function SchedTrack() {
  return (
    <section>
      <Navbar content="Get your calendar" />
      <div className="w-[100%] items-center content-center mt-10">
        <div className="w-[90%] m-auto flex justify-center gap-20">
          <CalendlyForm />
          <Calender />
        </div>
      </div>

      <footer className="text-sm">
        <div className="text-center">
          <h1 className=" text-gray-600"> 
            Swans Track &copy; 2023
          </h1>
          <div>
            <a  className="text-blue-400" href="/terms-conditions">Terms of use</a> | <a  className="text-blue-400" href="/swans-privacy-policy">privacy Policy</a>
          </div>

        </div>
      </footer>
    </section>
  )
}
