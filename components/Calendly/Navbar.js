import Image from 'next/image'
import React from 'react'

export default function Navbar({content}) {
    

    return (
        <div className="flex px-[10%] bg-sidebar text-white">
        <div className="flex-1 ">
          <Image src="/Light Logo.svg" width={80} height={80} />
        </div>
        <div className="flex-none  bg-foreignBackground hover:bg-mainBackground self-center px-4 py-2 rounded-xl">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/signup" className="text-white">
                {content}
              </a>
            </li>
          </ul>
        </div>
      </div>

    )
}
