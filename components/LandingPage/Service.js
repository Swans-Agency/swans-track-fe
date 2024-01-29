import React from "react";
import ServicesButtonStyle from "./ServicesButtonStyle";

export default function Service({ }) {
  const data = [
    { img: "/Writing.svg", text: "Writing" },
    { img: "/Photography.svg", text: "Photography" },
    { img: "/Marketing.svg", text: "Marketing" },
    { img: "/Coaching.svg", text: "Coaching" },
    { img: "/Florist.svg", text: "Florist" },
    { img: "/Design.svg", text: "Design" },
    { img: "/Videography.svg", text: "Videography" },
    { img: "/ClientBased.svg", text: "Client based" },
    { img: "/Development.svg", text: "Development" },
    { img: "/Contractor.svg", text: "Contractor" },
    { img: "/Consulting.svg", text: "Consulting" },
  ]
  return (
    <section id="User" className="pb-20">
      <p className="text-white desktop:text[1.563rem] text-center">
        WHO IT'S FOR
      </p>
      <h1 className="text-[3rem] py-2 font-black text-[#0191E7] text-center phone:hidden laptop:block">
        Explore the new standard for service professionals
      </h1>
      <div className="text-center laptop:text-[1.563rem] py-2 text-white desktop:flex justify-center phone:hidden tablet:flex gap-7">
        <p>Client based</p>
        <p>•</p>
        <p>Service-oriented businesses</p>
        <p>•</p>
        <p>Up to 10 employees</p>
      </div>
      <div className="flex flex-wrap justify-center gap-5 py-6">
        {
          data?.map((item, index) => {
            return (
              <ServicesButtonStyle img={item?.img} text={item?.text} />
            )
          })
        }
      </div>

    </section>
  );
}
