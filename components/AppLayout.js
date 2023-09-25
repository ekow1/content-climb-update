import { useUser } from '@auth0/nextjs-auth0/client';
import { useContext, useEffect, useState, useRef } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { AiFillDelete, AiFillPlusCircle, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { FaCartPlus, FaCoins } from "react-icons/fa6";
import { FiDelete, FiLogOut, FiMessageSquare } from 'react-icons/fi';
import Logo from './Logo/Logo';
import Button from './button/Button';
import PostContext from '../context/postContext';
import getPost from '../pages/api/getPost';

export const AppLayout = ({ children, availableTokens, posts: postsFromSSR, postId }) => {
  const { user } = useUser();
  const { setPostsFromSSR, posts } = useContext(PostContext);
  useEffect(() => {
    setPostsFromSSR(postsFromSSR);
  }, [postsFromSSR, setPostsFromSSR]);

  console.log(availableTokens)

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const debounceTimeoutRef = useRef(null); // Ref to store the debounce timeout ID

  const handlePostSelect = (postId) => {
    if (selectedPostId === postId) {
      // If the same post is selected again, toggle the confirmation message.
      setShowDeleteConfirmation(!showDeleteConfirmation);
    } else {
      // If a different post is selected, close the confirmation message on the previous post.
      setShowDeleteConfirmation(false);
      setSelectedPostId(postId);
    }
  };

  const handleDeleteClick = (postId) => {
    // Show the confirmation message when delete is clicked
    handlePostSelect(postId);
  };

  const handleCancelDelete = () => {
    // Close the confirmation message when cancel is clicked
    setShowDeleteConfirmation(false);
  };

  const handlePostDeselect = () => {
    // Deselect the post and close the confirmation message
    setSelectedPostId(null);
    setShowDeleteConfirmation(false);
  };

  // Define a debounced version of handlePostSelect
  const debouncedHandlePostSelect = (postId) => {
    clearTimeout(debounceTimeoutRef.current); // Clear any existing debounce timeout

    debounceTimeoutRef.current = setTimeout(() => {
      handlePostSelect(postId); // Call the original function after the debounce delay
    }, 10000); // Adjust the delay as needed
  };

  const showSuccessSnackbar = (message, duration = 3000) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);

    // Automatically close the snackbar after the specified duration
    setTimeout(() => {
      setSnackbarMessage("");
      setShowSnackbar(false);
    }, duration);
  };

  const handleConfirmDelete = async (postId) => {
    // Handle the actual deletion logic here
    try {
      const response = await fetch('/api/deletePost', {
        method: 'POST',
        body: JSON.stringify({ postId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Delete was successful, update the post list or take other appropriate actions
        console.log(`Deleted post with ID: ${postId}`);
        showSuccessSnackbar("Post deleted successfully"); // Show success message
      } else {
        console.error('Failed to delete post:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while deleting the post:', error);
    } finally {
      // Close the confirmation message
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-[300px,1fr] h-screen max-h-screen`}>
      <div className={`md:flex flex-col bg-white drop-shadow-xl text-slate-800 overflow-hidden `}>
        <section className={`px-4 py-4 flex flex-col font-heading font-bold`}>
          <Logo textSize='text-xl' />
          <div className={`flex mt-10 mb-6 w-full py-5`}>
            <Button text='New Post' iconData={AiFillPlusCircle} width='w-80 ' height='h-14' />
            <div className={`flex items-center tracking-wider w-20 text-center font-semibold cursor-pointer pl-4`} >
              {/* <FontAwesomeIcon icon={darkModeEnabled ? faMoon : faSun} size='xl' /> */}
            </div>
          </div>
          <Link href='/token-topup' className={`flex justify-center gap-5 items-center `}>
            <div className=' flex'>
              <FaCoins size={18} className={`text-slate-800 text-sm`} />
              <span className={`pl-2 font-heading font-md text-md`}>{availableTokens} tokens available</span>
            </div>
            <div className=' text-slate-800 font-thin flex flex-col items-center px-1 py-1 rounded-md border-2 border-slate-700 hover:bg-slate-800 transition-colors hover:text-white'>
              <FaCartPlus size={20} />
              <span className={` text-xs`}>top-up</span>
            </div>
          </Link>
        </section>
        <section className={`flex-1 overflow-auto font-body text-slate-800 `}>
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
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post._id}`}>
              <div
                className={`relative flex items-center justify-between text-md font-light font-heading text-ellipsis overflow-hidden whitespace-nowrap my-2 mx-2 px-4 py-2 cursor-pointer scroll-m-0 ${postId === post._id ? " bg-slate-800 text-white font-bold rounded-md drop-shadow-md" : ""}`}
                onMouseEnter={() => debouncedHandlePostSelect(post._id)}
                onMouseLeave={handlePostDeselect}
              >
                <div className="flex items-center truncate">
                  {showDeleteConfirmation && postId === post._id ? (
                    <div className="text-slate-300 text-xs">
                      Are you sure?
                      <button className="mx-2 " onClick={() => handleConfirmDelete(post._id)}>Confirm</button>
                      <button onClick={handleCancelDelete}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <FiMessageSquare />
                    </div>
                  )}
                  <div className="truncate ml-2">{post.topic}</div>
                </div>
                {postId === post._id && !showDeleteConfirmation && (
                  <div>
                    <button onClick={(e) => { e.preventDefault(); handleDeleteClick(post._id); }}>
                      <AiFillDelete />
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </section>
        <section className={`flex flex-col justify-center  items-center gap-5 border-t border-t-slate-300 h-40 px-2 `}>
          <Link href="/api/auth/logout" className=' bg-slate-100  rounded-md  text-md gap-5  w-full flex items-center justify-start font-bold font-heading text-md  hover:bg-slate-800 transition-background-color cursor-pointer px-8   hover:text-white hover:font-bold hover:rounded-md hover:drop-shadow-md py-3'><AiOutlineLogout size={20} />Logout </Link>

          {!!user ? (
            <div className='flex  items-center'>
              <div className={`min-w-[80px]  `}>
                <Image
                  width={55}
                  height={55}
                  src={user.picture}
                  alt={user.name}
                  className={`rounded-lg`}
                />
              </div>
              <div className={`flex-1  `}>
                <div className={`text-md  font-heading text-md font-semibold `}>{user.name}</div>
                <small className={`text-md  font-body text-xs `}>{user.email}</small>
              </div>
            </div>
          ) : (
            <div className={`text-md font-heading`}><Link href="/api/auth/login">Login <AiOutlineLogin size={20} className={`pl-5`} /></Link></div>
          )}
        </section>
      </div>
      {children}
      {showSnackbar && (
        <div className="fixed bottom-4 right-4 bg-green-700 text-white px-4 py-2 rounded shadow">
          {snackbarMessage}
        </div>
      )}
    </div>
  );
}
