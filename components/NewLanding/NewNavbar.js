import Image from 'next/image';
import React, { useState } from 'react';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import ToggleMenu from './ToggleMenu';
import Link from 'next/link';


export default function NewNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <nav className="desktop:flex justify-around desktop:items-center border-b-[0.5px] border-b-[#282828] phone:py-2 laptop:py-3 w-full phone:flex bg-transparent backdrop-blur-3xl z-50 fixed top-0 left-0 right-0">
                <div className='flex justify-start gap-x-10'>
                    <Image src="/logoNew.svg" width={45} height={45} />
                    <ul className={`laptop:flex gap-x-4 text-white self-center phone:hidden`}>
                        <a className='hover:text-white' href="/">Home</a>
                        <a className='hover:text-white' href="#Features">Features</a>
                        <a className='hover:text-white' href="#User">User</a>
                    </ul>
                </div>

                <div className="laptop:hidden phone:grid ">
                    <ToggleMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
                </div>

                <div className="phone:hidden laptop:flex items-center justify-start gap-x-2">
                    <LoginButton />
                    <SignupButton text="Join for free" style="py-2 px-4 hover:bg-[#282828] border border-[#282828] hover:text-white" />

                </div>
            </nav>
            {isMenuOpen  && <div className='fixed top-[62px] left-0 right-0 bottom-0 !z-50 bg-transparent backdrop-blur-3xl text-white text-center flex flex-col items-center justify-center gap-[3rem]'>

                <Link className='text-white w-full text-2xl ' href="/">Home</Link>
                <Link className='text-white w-full text-2xl ' href="#Features">Features</Link>
                <Link className='text-white w-full text-2xl ' href="#User">User</Link>

            </div>}
        </>
    );
};