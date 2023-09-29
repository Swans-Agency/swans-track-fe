import React from "react";
import { useRouter } from "next/router";

export default function HeroPhone() {
  const router = useRouter();
  return (
    <div className="px-3 flex flex-col items-center text-center tablet:px-10">
      <div className="w-[80%] m-auto">
        <h1 className="text-[3.75rem] font-bold text-white text-center">
          Create. Manage. Succeed Effortlessly
        </h1>
        <p className="text-white text-[1.563rem]">
          Unleash your productivity with our magic powered management tool.
        </p>
      </div>
      <div className="my-[50px] w-[90%] m-auto">
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
          className="bg-gradient-to-br from-[#003B76] to-[#00A3FF] hover:shadow-md hover:shadow-white text-white font-bold py-3 px-4 rounded-lg w-[200px] my-3"
          onClick={() => router.push("/login")}
        >
          Join for free
        </button>
      </div>
    </div>
  );
}
