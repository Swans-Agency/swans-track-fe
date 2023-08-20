import Image from 'next/image'
import React from 'react'

export default function Navbar(props) {
    

    return (
        <div className="flex px-[10%] bg-sidebar text-white">
        <div className="flex-1 p-2">
          <Image src="/Logo.png" width={60} height={60} />
        </div>
        <div className="flex-none bg-gray-500 self-center p-2 rounded-xl">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/signup" className="text-white">
                Get your own calendar
              </a>
            </li>
          </ul>
        </div>
      </div>

    )
}
