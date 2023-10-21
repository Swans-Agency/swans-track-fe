import Image from 'next/image'
import React from 'react'

export default function Navbar({ content }) {


  return (
    <div className="flex px-[10%] bg-sidebar text-white">
      <div className="flex-1">
        <a href='/'>
        <Image src="/logoNew.svg" width={60} height={60} className='py-2' />
        </a>
      </div>
      <div className="flex-none hover:cursor-pointer hover:shadow-lg bg-foreignBackground self-center px-4 py-2 rounded-xl">
        <div className="menu menu-horizontal px-1">
          <p>
            <a href="/signup" className="text-white">
              {content}
            </a>
          </p>
        </div>
      </div>
    </div>

  )
}
