import {  createContext, useCallback, useState , useContext } from "react";

const PostContext = createContext({})


export default PostContext;


export const PostProvider = ({children}) =>{
    const [posts , setPosts] = useState([]);

    const setPostsFromSSR = useCallback((postsFromSSR =[]) =>{
       setPosts(postsFromSSR)
    } , [])

    const getPosts = useCallback(async ({lastPostDate}) =>{
        const result = await fetch(`/api/getPosts` , {
            method : "POST" ,
            headers : {
                'content-type' : "applicatio/json"
            },
            body : JSON.stringify({lastPostDate})
        });
        const json = await result.json();
        const postResult = json.posts || [];

        console.log(postResult)
    } , [])

    return <PostContext.Provider value={{posts , setPostsFromSSR , getPosts} }>{children}</PostContext.Provider>
}