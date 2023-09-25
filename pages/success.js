import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from '../components/AppLayout';
import { getAppProps } from "../utils/appprops";

function Success() {

//   const handleClick =  async () =>{

//     const response = await fetch(`/api/addTokens` , {
//       method : 'POST'
//     })
   
//   }

  return (
    <div className=" flex flex-col justify-center items-center">
      <h2>Thank you for your purchase!</h2>
    </div>
  )
}

Success.getLayout = function getLayout(page , pageProps) {

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

export default Success


