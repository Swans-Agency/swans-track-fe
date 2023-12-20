import { useRouter } from 'next/router';
import React from 'react';


export default function SignupButton({ text = "Signup", style ="ml-2 py-2 px-8 hover:bg-[#bebebe] "}) {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push("/signup")}
            className={`bg-white text-[#282828] font-bold rounded-lg ${style}`}
        >
            {text}
        </button>
    );
};