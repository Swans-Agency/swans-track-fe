import React from "react";
import { useRouter } from "next/router";

export default function Join() {
  const router = useRouter();
  return (
    <section className="h-[70vh] flex flex-col justify-center bg-opacity-25">
      <h1 className="text-[3.75rem] font-bold text-[#0191E7] text-center">
        Join for free
      </h1>
      <p className="text-center mt-10 text[1.563rem] text-[#575757] flex justify-center gap-2">
        No need for a credit card to join our platform, just sign up and enjoy
        your <span className="text-[#0191E7]">30 days free trial.</span>
      </p>
      <div className="flex justify-center pt-10">
        <button
          className="bg-gradient-to-br from-[#003B76] to-[#00A3FF] hover:shadow-md hover:shadow-white text-white font-bold py-3 px-4 rounded-lg w-[200px] my-3"
          onClick={() => router.push("/login")}
        >
          Join for free
        </button>
      </div>
    </section>
  );
}
