import React from "react";
import { useRouter } from "next/router";

export default function HeroPhone() {
  const router = useRouter();
  return (
    <div className="px-3 flex flex-col items-center text-center tablet:px-10">
      <div className="desktop:w-[80%] phone:w-[90%] m-auto">
        <h1 className="desktop:text-[3.75rem] phone:text-[1.8rem] font-black text-white text-center">
          Create. Manage. Succeed Effortlessly
        </h1>
        <p className="text-white text-[1.563rem] desktop:block phone:hidden">
          Unleash your productivity with our magic powered management tool.
        </p>
      </div>
      <div className="my-[50px] w-[90%] m-auto desktop:block phone:hidden">
        <p className="text-[1.25rem] font-extralight text-white">
          Freelance project management tools are a unique solution for
          organizing and streamlining freelance work. These tools empower you to
          make the most of your freelancing skills and experience. They offer
          easy tracking of projects and tasks, efficient calendar and schedule
          management, and systematic organization of tasks and projects.
          Additionally, they enable seamless collaboration with your team. In
          “Swan track” we bring all tools in one place.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          className="bg-gradient-to-br from-[#003B76] to-[#00A3FF] hover:shadow hover:shadow-gray-400 text-white font-bold py-3 px-4 rounded-lg w-[200px] my-3"
          onClick={() => router.push("/signup")}
        >
          Join for free
        </button>
      </div>
    </div>
  );
}
