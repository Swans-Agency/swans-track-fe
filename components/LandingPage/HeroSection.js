import React, { useEffect, useState } from "react";
import HeroPhone from "./HeroPhone";
import Image from "next/image";
import { useRouter } from "next/router";

export default function HeroSection() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // useEffect(() => {
  //   if (window !== undefined) {
  //     const ul = document.querySelector("ul");
  //     const nav = document.querySelector("nav");
  //     const menuButton = document.getElementById("menu-button");

  //     window.addEventListener("scroll", () => {
  //       if (window.scrollY > 750) {
  //         ul.classList.add("scrolled");
  //         nav.classList.add("scrolled-border");
  //         menuButton.classList.add("text-black");
  //         menuButton.classList.remove("text-white");
  //       } else {
  //         ul.classList.remove("scrolled");
  //         nav.classList.remove("scrolled-border");
  //         menuButton.classList.remove("text-black");
  //         menuButton.classList.add("text-white");
  //       }
  //     });
  //   }

  // },[])

  return (
    <section
      id="hero-section"
      className="w-full grid gap-0 relative"
      style={{ backgroundImage: "url(/Main.png)", backgroundPosition: "center", backgroundSize: "cover" }}

    >
      <nav className="desktop:flex desktop:justify-between desktop:items-center px-[10%] phone:py-2 laptop:py-0 w-full phone:flex bg-transparent backdrop-blur-sm z-50 fixed top-0 left-0 right-0 ">
        <div>
          <Image src="/Main.svg" width={45} height={45} />

        </div>

        <ul className={`${isMenuOpen ? 'flex' : 'hidden'} desktop:flex justify-between desktop:gap-10 phone:gap-5 text-white self-center`}>
          <a href="/">Home</a>
          <a href="#Features">Features</a>
          <a href="#User">User</a>
        </ul>

        <div className="desktop:hidden phone:grid ">
          <button
            onClick={toggleMenu}
            id="menu-button"
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="phone:hidden phone:relative desktop:block">
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="bg-gradient-to-br from-[#003B76] to-[#00A3FF] hover:shadow hover:shadow-gray-400 text-white font-bold py-3 px-10 rounded-lg my-3"
          >
            Login
          </button>
        </div>
      </nav>

      <div className="desktop:block py-20 mb-[18%] mt-[4%] self-center">
        <HeroPhone />
      </div>
    </section>
  );
}
