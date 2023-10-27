import React from "react";
import SvgRight from "./SvgRight";
import SvgLeft from "./SvgLeft";

export default function Features(props) {
  return (
    <section className="pb-32">
      <SvgRight
      id={'Calendar'}
        title={"Calendar"}
        description={
          "Effortlessly manage your appointments and events, whether personal or collaborative with colleagues."
        }
        image={"/Calender.svg"}
      />

      <SvgLeft
      id={'Sched'}

        image={"/Sched.svg"}
        title={"Sched Track"}
        description={
          "Automation scheduling platform for eliminating the back-and-forth emails to find the perfect time"
        }
      />

      <SvgRight
      id={'Tasks'}

        title={"Tasks"}
        description={
          "Streamline your daily routine by organizing and monitoring tasks and assignments with ease."
        }
        image={"/Task.svg"}
      />

      <SvgLeft
      id={'Projects'}

        image={"/Projects.svg"}
        title={"Projects"}
        description={
          "Empower yourself to create and oversee projects systematically from a centralized hub."
        }
      />

      <SvgRight
      id={'Client'}

        title={"Client Portal"}
        description={
          "Bring your people, clients and partners under one roof for a modern transparency and professional business experience"
        }
        image={"/Client.svg"}
      />

      <SvgLeft
      id={'Intelligent'}

        image={"/Intelligent.svg"}
        title={"Intelligent Swan (ChatGPT)"}
        description={
          "Enhance your web experience with ChatGPT, your AI-powered conversational companion."
        }
      />

      <SvgRight
      id={'Proposals'}

        title={"Proposals & Invoicing"}
        description={
          "Simplify your project workflow by effortlessly generating proposals and issuing invoices for both projects and clients"
        }
        image={"/Proposals.svg"}
      />

      <SvgLeft
      id={'Expenses'}

        image={"/Expenses.svg"}
        title={"Expenses and income tracking"}
        description={
          "Gain a comprehensive understanding of your personal or business finances with precise tracking of expenses and income"
        }
      />

      <SvgRight
      id={'Team'}

        title={"Team collaboration"}
        description={
          "Elevate collaboration within your team through shared projects, tasks, and smooth interaction"
        }
        image={"/Team.svg"}
      />
    </section>
  );
}
