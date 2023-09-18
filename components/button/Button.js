import React from 'react'
import  Link  from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiFillPlusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
// import {  faPlus } from '@fortawesome/free-solid-svg-icons';


function Button({themeClass , iconData ,text ,width , height}) {
  return (
    
        
        <Link href='/post/newpost' >
                
               <button      className=" flex justify-center items-center gap-5 bg-transparent border-2 border-slate-800 hover: text-slate-700 text-md px-5 py-3 rounded-lg shadow-md shadow-black/20S hover:bg-slate-800 transition-colors hover:text-white cursor-pointer w-52 ">
        New Post <AiFillPlusCircle className='text-xl ml-8'/>
    </button>
              

                </Link>



  )
}

export default Button