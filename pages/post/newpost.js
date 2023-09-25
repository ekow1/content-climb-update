import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React , {useState}from 'react'
import { AppLayout } from '../../components'
import { useRouter } from 'next/router';
import { getAppProps } from '../../utils/appprops';



export default function NewPostPage({user}) {
const router = useRouter()

  const [topic , setTopic] =useState("");
  const [keywords , setKeywords] = useState("");
  const [generating , setGenerating] = useState(false)



const handleSubmit = async (e) => {
  e.preventDefault();
  setGenerating(true)
  try {
    const response = await fetch(`/api/generatedpost`, {
      method: 'POST',
      headers:{
        'content-type': 'application/json'
      },
      body : JSON.stringify({topic , keywords})
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const json = await response.json();
    // console.log('Response: ', json);
    // console.log(topic , keywords)
  if (json?.postId) {
    router.push(`/post/${json.postId}`)
  }
  } catch (error) {
    console.error('Error: ', error);
    setGenerating(false)
  }

  
};

  return (
    <div className='  h-full overflow-hidden'>
      {
        !!generating && (

           <div className='text-slate-800  flex flex-col justify-center items-center h-full animate-pulse'>
            <span className={`pl-1  font-logo up bg-slate-800 text-white font-bold sm:h-24 sm:w-24 w-10 h-10  flex items-center justify-center text-xl sm:text-5xl `}>C.</span>
            <small className='mx-auto block text-center text-md font-heading mt-3'>generating....</small>
         
     </div>

        )
      }
    

     {
      !generating && (

        <div className='h-full overflow-auto flex flex-col justify-center'>

         <form onSubmit={handleSubmit} className='  flex flex-col items-center justify-center w-full  h-5/6 rounded-md drop-shadow-md' >
        <div className='w-4/12 h-2/6'>
          <label className='font-heading'>
            Generate a blog of the topic of :
          </label>
          <textarea className=' resize border-2 border-slate-700 block  my-2 px-4 py-2 rounded-sm w-full h-5/6' value={topic} onChange={e => setTopic(e.target.value)} required maxLength={100}/>
        </div>
        <div className='w-4/12 h-2/6'>
          <label className='font-heading'>
            Targeting the following keywords :
          </label>
          <textarea className='resize border-2 border-slate-700 block  my-2 px-4 py-2 rounded-sm w-full h-5/6' value={keywords} onChange={e => setKeywords(e.target.value)}  maxLength={100}/>
          <small className='text-sm mt-5 '>Separate keywords with a comma</small>
        </div>
    
        <button  type='submit'  className=" flex justify-center items-center gap-5 bg-transparent border-2 border-slate-800   disabled:cursor-not-allowed   hover: text-slate-700 text-md mt-14   px-5 py-5 rounded-lg shadow-md shadow-black/20S hover:bg-slate-800 transition-colors hover:text-white cursor-pointer w-58 " disabled={!topic}>
        Generate New Post
    </button>

      </form>

      </div>

      )
     }

      
     
   
        
    </div>
  )
}


NewPostPage.getLayout = function getLayout(page , pageProps) {

  return <AppLayout {...pageProps}>{page}</AppLayout>
  
}

export const getServerSideProps = withPageAuthRequired ({
  async getServerSideProps (ctx){
    const props = await getAppProps(ctx);
    if(!props.availableTokens){
      return{
         redirect :{
          destination : '/token-topup',
          permanent : false
        }
      }
       
      
    }
    return{
      props
    }
  }
});