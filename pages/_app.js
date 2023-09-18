import '../styles/globals.css'
import {UserProvider} from'@auth0/nextjs-auth0/client';
import{Josefin_Sans , DM_Sans , Pacifico} from '@next/font/google'
import {config} from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false;

const josefinSans = Josefin_Sans({
  weight: ['300' , '400' , '500' , '600', '700'],
  subsets : ['latin'],
  variable : '--font-josefin-sans'
});

const  dmSans= DM_Sans({
  weight: ['300' , '400' , '500' , '600', '700'],
  subsets : ['latin'],
  variable : '--font-dm-sans'
});
const  pacifico= Pacifico({
   weight: [ '400'],
  subsets : ['latin'],
  variable : '--font-pacifico'
});






function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page)=> page)
  return ( <UserProvider>
   <main className={`${josefinSans.variable} ${dmSans.variable} ${pacifico.variable}`}>
   
      {getLayout(  <Component {...pageProps} /> , pageProps )}

   </main>
  
   
     </UserProvider>)
}

export default MyApp
