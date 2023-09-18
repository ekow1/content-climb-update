'use client'
import Link from "next/link"
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useState } from "react"
import Logo from "../Logo/Logo"

const Navbar = () => {
   const [menuOpen, setMenuOpen] = useState(false)

   const handleMenu = () => {
         setMenuOpen(!menuOpen)
   }

  return (
    <nav className="w-full fixed z-[100] bg-white sm:bg-transparent shadow-sm h-20 font-body sm:shadow-none">
        <div className="flex items-center sm:justify-center justify-between h-full w-full px-5">
            <Logo />
           
                <div className="mr-6">
   <AiOutlineMenu onClick={handleMenu} className="sm:hidden text-2xl cursor-pointer" />
                </div>
        </div>
        {/* Mobile Version Listed Items */}
        <div className={
            menuOpen ? 'left-0 top-0 w-[65%] h-screen relative bg-[#ecf0f3] ease-in duration-500 flex flex-col justify-start z-50': 'hidden'
        }>
            <div className="flex absolute top-6 right-6 w-full justify-end items-center">
                <AiOutlineClose onClick={handleMenu} className="text-2xl text-black mb-4" />
            </div>
            <ul className="flex flex-col justify-center items-center mt-20 gap-10 ">
                <li className="text-2xl text-black mb-4">
                    <Link href="/"> home</Link>
                </li>
                <li className="text-2xl text-black mb-4 font-logo">
                    <Link href="post/newpost">contentclimb </Link>
                </li>
                <li className="text-2xl text-black mb-4">
                    <Link href="#"> plans</Link>
                </li>
                <li className="text-2xl text-black mb-4">
                    <Link href="/portfolio"> faq</Link>
                </li>
            </ul>

        </div>

    </nav>
  )
}

export default Navbar