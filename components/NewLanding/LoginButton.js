import { useRouter } from 'next/router';
import React from 'react';


export default function LoginButton() {
    const router = useRouter();
  return (
      <button
          onClick={() => router.push("/login")}
          className="border border-[#282828] bg-[#141414] hover:bg-[#282828] text-white font-bold py-2 px-8 rounded-lg "
      >
          Login
      </button>

  );
};