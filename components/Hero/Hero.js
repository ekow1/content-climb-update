'use client'

import Image from "next/image"
import blur from '../../public/blur.png'
import Typed from 'react-typed'
import Link from "next/link"
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import Logo from "../Logo/Logo";

// import Carousel from "./Carousel"

const Hero = () => {
  return (
    <div className="h-screen w-full bg-[#ecf0f3] relative">
        <Image
   src={blur}
    alt="blur"
    layout="fill"
    objectFit="cover"
    quality={100}
    priority
    className="absolute animate-pulse"
    />

    <div className="flex flex-col text-center mx-auto max-w-[1260px] items-center justify-center pt-32 font-heading text-slate-700  ">
        <div className=" lg:visible hidden">
               <Logo  iconSize='2x' textSize='2xl'/>
        </div>
     
<h1 className="text-5xl sm:text-8xl font-bold tracking-tight z-20 mt-14 ">
    AI powered 
    <span className="bg-gradient-to-r from-slate-900 to-slate-400 text-transparent bg-clip-text pl-3">
        blog article
    </span>
 </h1>
 <h1 className="text-5xl sm:text-8xl font-bold z-20">SAAS slotution.</h1>
 <h2 className="text-xl font-body sm:text-2xl mt-10">
   <Typed 
   strings={[
         'Generate SEO-optimized blog posts in minutes.',
            ' Proper workflow during content creation.',
            'Get high-quality content , without sacrificing your time.',
   ]}
    typeSpeed={200}
    backSpeed={100}
    loop
    /> {" "}
 </h2>
 <div className="flex flex-col items-center mx-auto justify-center text-center pt-16 z-20 mt-5 gap-10">
 <Link href="/post/newpost">
    <button className=" flex justify-center items-center gap-5 bg-transparent border-2 border-slate-800 hover: text-slate-700 text-2xl px-10 py-5 rounded-lg shadow-md shadow-black/20S hover:bg-slate-800 transition-colors hover:text-white cursor-pointer  ">
        Get Started <BsFillArrowRightCircleFill className="" />
    </button>
    </Link>
    <p className="pt-6  text-md font-body-200">
        Subscriptions based model with no hidden fees. Unlimited Requests
    </p>
 </div>
    </div>
   
    </div>
  )
}

export default Hero