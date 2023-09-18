import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React , {useState}from 'react'
import { AppLayout } from '../../components'
import { useRouter } from 'next/router';
import { getAppProps } from '../../utils/appprops';



export default function NewPostPage({user}) {
const router = useRouter()

  const [topic , setTopic] =useState("");
  const [keywords , setKeywords] = useState("");



const handleSubmit = async (e) => {
  e.preventDefault();
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
    console.log('Response: ', json);
    console.log(topic , keywords)
  if (json?.postId) {
    router.push(`/post/${json.postId}`)
  }
  } catch (error) {
    console.error('Error: ', error);
  }

  
};

  return (
    <div className=' flex  flex-col gap-10 justify-center items-center h-screen max-h-screen'>
      <form onSubmit={handleSubmit} className='   w-8/12 h-4/6 flex  flex-col items-center gap-10 py-36 font-heading' >
        <div className='w-4/12 h-4/6'>
          <label className='font-heading'>
            Generate a blog of the topic of :
          </label>
          <textarea className=' resize border-2 border-slate-700 block  my-2 px-4 py-2 rounded-sm w-full h-5/6' value={topic} onChange={e => setTopic(e.target.value)}/>
        </div>
        <div className='w-4/12 h-4/6'>
          <label className='font-heading'>
            Targeting the following keywords :
          </label>
          <textarea className='resize border-2 border-slate-700 block  my-2 px-4 py-2 rounded-sm w-full h-5/6' value={keywords} onChange={e => setKeywords(e.target.value)}/>
        </div>
        <button  type='submit'  className=" flex justify-center items-center gap-5 bg-transparent border-2 border-slate-800     hover: text-slate-700 text-md mt-5   px-5 py-5 rounded-lg shadow-md shadow-black/20S hover:bg-slate-800 transition-colors hover:text-white cursor-pointer w-2/12 ">
        Generate New Post
    </button>

      </form>
   
        
    </div>
  )
}


NewPostPage.getLayout = function getLayout(page , pageProps) {

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