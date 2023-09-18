import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from '../components/AppLayout';
import { getAppProps } from "../utils/appprops";

function TokenTopUp() {

  const handleClick =  async () =>{

    const response = await fetch(`/api/addTokens` , {
      method : 'POST'
    })
  }

  return (
    <div className=" flex flex-col justify-center items-center">
      <h1>Token Top Up</h1><br/>
        <button   onClick={handleClick}   className=" flex justify-center items-center gap-5 bg-transparent border-2 border-slate-800 hover: text-slate-700 text-2xl px-10 py-5 rounded-lg shadow-md shadow-black/20S hover:bg-slate-800 transition-colors hover:text-white cursor-pointer  ">
        add tokens
    </button>
    </div>
  )
}

TokenTopUp.getLayout = function getLayout(page , pageProps) {

  return <AppLayout {...pageProps}>{page}</AppLayout>
  
}
export const getServerSideProps = withPageAuthRequired ({
  async getServerSideProps (ctx){
    const props = await getAppProps(ctx);
    return{
      props
    }
  }
});

export default TokenTopUp


