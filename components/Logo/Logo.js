import Link from 'next/link';


export default function Logo({themeClass , textSize , iconSize}) {
  return (
     <Link href='/' className={`flex items-end justify-center ${themeClass} `}>
        
            <span className={`pl-1 ${textSize} font-logo up bg-slate-800 text-white font-bold sm:h-14 sm:w-14 w-10 h-10  flex items-center justify-center text-xl sm:text-2xl `}>C.</span>
            <p className='text-slate-800 text-xl sm:text-3xl font-logo pl-3'>ContentClimb</p>
          </Link>
  )
}

