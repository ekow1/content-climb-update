import { useUser } from '@auth0/nextjs-auth0/client';
import { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSignOutAlt, faSignInAlt, faSun, faMoon,  faCartPlus } from '@fortawesome/free-solid-svg-icons';
import {  AiFillPlusCircle, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'
import { FaCartPlus, FaCoins, } from "react-icons/fa6";
import {  FiLogOut, FiMessageSquare } from 'react-icons/fi'
import Logo from './Logo/Logo';
import Button from './button/Button';


export const AppLayout = ({ children ,availableTokens , posts ,postId }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    console.log('Posts:', posts); 
    console.log('Posts:', postId); 

  const toggleTheme = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const { user } = useUser();
  
  const themeClass = darkModeEnabled ? 'dark' : 'light';

  return (
    <div className={`grid grid-cols-1 md:grid-cols-[300px,1fr] h-screen max-h-screen ${themeClass}`}>
      <div className={`md:flex flex-col bg-white drop-shadow-xl text-slate-800 overflow-hidden  ${themeClass}`}>
        
        <section className={`px-4 py-4 flex flex-col font-heading font-bold ${themeClass}`}>
          <Logo  themeClass={themeClass} textSize='text-xl'/>
          <div className={`flex mt-10 mb-6 w-full ${themeClass} py-5`}>
            <Button themeClass={themeClass} text='New Post'  iconData={AiFillPlusCircle} width='w-80 ' height='h-14'/>
            <div className={`flex items-center tracking-wider w-20 text-center font-semibold cursor-pointer pl-4 ${themeClass}`} onClick={toggleTheme}>
              <FontAwesomeIcon icon={darkModeEnabled ? faMoon : faSun} size='xl' />
            </div>
          </div>
          <Link href='/token-topup' className={`flex justify-center gap-5 items-center  ${themeClass}`}>
            <div className=' flex'>
              <FaCoins size= {18}  className={`text-slate-800 text-sm`} />
            <span className={`pl-2 font-heading font-md text-md`}>{availableTokens} tokens available</span>
            </div>
           
            <div className=' text-slate-800 font-thin flex flex-col items-center px-1 py-1 rounded-md border-2 border-slate-700 hover:bg-slate-800 transition-colors hover:text-white'>
              <FaCartPlus  size={20} />
              <span className={` text-xs`}>top-up</span>
            </div>
          </Link>
        </section>
        <section className={`flex-1 overflow-auto font-body text-slate-800  ${themeClass}`}>

         
          <style jsx global>{`
            /* Webkit-based browsers (Chrome, Safari) */
            ::-webkit-scrollbar {
              width: 8px;
              
            }
            ::-webkit-scrollbar-track {
              background: ;
               scrollbar-color: transparent transparent;
            }
            ::-webkit-scrollbar-thumb {
              background: transparent;
              border-radius: 4px;
               scrollbar-color: transparent transparent;
            }

            /* Firefox */
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;

            /* Show scrollbar on hover */
            &:hover {
              ::-webkit-scrollbar-thumb {
                background: #888;
                
              }
              scrollbar-color: #888 #f1f1f1;
            }
          `}</style>

         {posts.map(post => (
          <Link key={post._id} href={`/post/${post._id}`}>
           <div  className={`flex items-center gap-5 text-md font-light font-heading text-ellipsis overflow-hidden whitespace-nowrap my-2 mx-2 px-4 py-2 cursor-pointer scroll-m-0 ${postId === post._id? " bg-slate-800 text-white font-bold rounded-md drop-shadow-md" : ""}`}>
                <FiMessageSquare />
                {post.topic}
              </div>
              </Link>
            ))
            
          }

        </section>
        <section className={`flex items-center gap-2 border-t border-t-slate-300 h-24 py-3 px-2 ${themeClass}`}>
          {!!user ? (
            <>
              <div className={`min-w-[50px] ${themeClass}`}>
                <Image
                  width={60}
                  height={60}
                  src={user.picture}
                   alt={user.name}
                  className={`rounded-full`}
                 
                />
              </div>
              <div className={`flex-1 ${themeClass}`}>
                <div className={`text-md  font-body`}>{user.email}</div>
                <div className={`text-md mt-2 px-3 font-bold font-heading `}><Link href="/api/auth/logout" className='flex gap-4 items-center'>Logout <AiOutlineLogout size={25}  /></Link></div>
              </div>
            </>
          ) : (
            <div className={`text-md font-heading`}><Link href="/api/auth/login">Login <AiOutlineLogin size={20} className={`pl-5`} /></Link></div>
          )}
        </section>
      </div>
      
        {children}
      
    </div>
  );
}
