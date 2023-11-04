import Image from 'next/image';
import React, { useState } from 'react';
import LoginButton from './LoginButton';
import SignupButton from './SignupButton';
import ToggleMenu from './ToggleMenu';


export default function NewNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <nav className="desktop:flex justify-around desktop:items-center border-b-[0.5px] border-b-[#282828] phone:py-2 laptop:py-3 w-full phone:flex bg-transparent backdrop-blur-sm z-50 fixed top-0 left-0 right-0">
            <div className='flex justify-start gap-x-10'>
                <Image src="/logoNew.svg" width={45} height={45} />
                <ul className={`${isMenuOpen ? 'flex' : 'hidden'} laptop:flex gap-x-4 text-white self-center`}>
                    <a className='hover:text-white' href="/">Home</a>
                    <a className='hover:text-white' href="#Features">Features</a>
                    <a className='hover:text-white' href="#User">User</a>
                </ul>
            </div>

            <div className="laptop:hidden phone:grid ">
                <ToggleMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            </div>

            <div className="phone:hidden laptop:block">
                <LoginButton />
                <SignupButton />
            </div>
        </nav>
    );
};