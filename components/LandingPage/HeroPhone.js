import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';


export default function HeroPhone() {
    const router = useRouter();
    return (
        <div className='px-3 flex flex-col items-center text-center w-[100%] tablet:px-10'>
            <Image src="/Logo.png" width={100} height={100} className='p-1 opacity-100' />
            <h1 className='text-[2.4rem] my-[15px] font-light text-black'>Create. Manage. Succeed Effortlessly</h1>
            <iframe
                title="YouTube video player"
                src="https://www.youtube-nocookie.com/embed/xNRJwmlRBNU?rel=0&autoplay=1"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                width="100%"
                height="350"
                frameborder="0"
                allowfullscreen
            ></iframe>
            <p className='text-[1.25rem] tracking-[0.2rem] my-[15px] font-extralight text-black'>
                Unleash your productivity with our <span className='font-bold'>magic</span> powered <span className='font-bold'>management</span> tools.
            </p>
            <button
                className='py-3 px-8 text-[1.25rem] text-white hover:text-[#dc2626] hover:bg-white bg-[#dc2626] rounded-lg border border-[#dc2626] flex items-center gap-x-2'
                onClick={() => router.push('/signup')}
            >
                Get Exclusive Access
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </button>
        </div>
    );
};