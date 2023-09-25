import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from '../../components';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from "mongodb";
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCopy } from "@fortawesome/free-solid-svg-icons";
import { AiTwotoneCopy, GrCopy } from "react-icons/gr";
import { FiHash, IconName } from "react-icons/fi";
import { getAppProps } from "../../utils/appprops";

export default function Post(props) {
  const removeHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const [copyStatus, setCopyStatus] = useState('');
  const [copiedSection, setCopiedSection] = useState('');

  const copyToClipboard = (content, section) => {
    // Remove HTML tags from the content
    const cleanedContent = removeHtmlTags(content);

    // Create a temporary textarea element to hold the cleaned content
    const textarea = document.createElement('textarea');
    textarea.value = cleanedContent;
    document.body.appendChild(textarea);

    // Select and copy the content
    textarea.select();
    document.execCommand('copy');

    // Clean up and provide feedback
    document.body.removeChild(textarea);
    setCopiedSection(section);
    setCopyStatus(`Copied ${section}`);

    // Clear the copy status and section after a few seconds (optional)
    setTimeout(() => {
      setCopyStatus('');
      setCopiedSection('');
    }, 3000);
  };

  return (
    <div className="overflow-auto h-full font-body">
      <div className="max-w-screen-lg mx-auto py-3 px-20">
        <div className="text-xl font-heading font-bold  mt-6 py-2 px-10 bg-slate-200  flex items-center border-2 border-slate-900">
          <div className="sm:flex-1 uppercase">Title</div>
          <button
            onClick={() => copyToClipboard(props.title, "Title")}
            className="mt-2 ml-80 px-4 text-white rounded-md"
          >
             <GrCopy size={25}   className=" text-slate-900 " />
          </button>
          <div className="font-light text-sm ">{copiedSection === "Title" && copyStatus}</div>
        </div>
        <div>
          <div className="font-heading font-black text-2xl  px-4 py-5 mb-16 border-2 border-slate-900 border-t-0" >
            {props.title}
          </div>
        </div>

        <div className=" font-bold  font-heading text-xl mt-6 py-2 px-10 bg-slate-200  flex  justify-center  items-center border-2 border-slate-900 ">
          <div className="sm:flex-1 uppercase">Meta Description</div>
          <button
            onClick={() => copyToClipboard(props.metaDescription, "Meta Description")}
            className="mt-2 ml-80 px-4 text-white rounded-md"
          >
            <GrCopy size={25}   className=" text-slate-900 " />
          </button>
          <div className="font-light text-sm">{copiedSection === "Meta Description" && copyStatus}</div>
        </div>

        <div className=" py-5 px-3 mb-16 border-2 border-slate-900 border-t-0">
          {props.metaDescription}
        </div>
        <div className=" font-bold  font-heading text-xl mt-6 py-2 px-10 bg-slate-200  flex  justify-center  items-center border-2 border-slate-900">
          <div className="sm:flex-1 uppercase">Keywords</div>
          <button
            onClick={() => copyToClipboard(props.keywords, "Keywords")}
            className="mt-2 ml-80 px-4 text-white rounded-md"
          >
            <GrCopy size={25}   className=" text-slate-900 " />
          </button>
          <div className="font-light text-sm">{copiedSection === "Keywords" && copyStatus}</div>
        </div>

        <div className=" py-5 px-3 mb-16 border-2 border-slate-900 border-t-0 flex gap-5 text-slate-800 ">
          {props.keywords.split(",").map((keyword , i) =>(
              <div key={i} className=" py-2 flex  justify-center  items-center px-3 rounded-full text-md font-semi-bold font-body text-sm ">  <FiHash size={12} />{keyword.trim()}</div>               
          ))}
        </div>

        <div className="text-xl font-heading font-bold mt-14 py-2  px-10 bg-slate-200  border-2 border-slate-900 border-b-0 flex items-center">
          <div className="sm:flex-1 uppercase">Blog Content </div>
          <button
            onClick={() => copyToClipboard(props.postContent, "Blog Content")}
            className="mt-2 ml-80 px-4 text-white rounded-md"
          >
              <GrCopy size={25}   className=" text-slate-900 " />
          </button>
          <div className="font-light text-sm">{copiedSection === "Blog Content" && copyStatus}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.postContent || "" }} className=' py-6 px-5  border-2 border-slate-900' />
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    try {
      const props = await getAppProps(ctx);
      const userSession = await getSession(ctx.req, ctx.res);
      console.log("User Session:", userSession);
      const client = await connectToDatabase();
      const db = client.db("ContentClimb");
      const user = await db.collection("users").findOne({
        auth0Id: userSession.user.sub,
      });

      console.log("User:", user);

      const postId = new ObjectId(ctx.query.postid); // Use ctx.query.postid to get the post ID from the query params
      const userId = user._id; // Use user._id (note the correct case)

      console.log("postId:", postId);
      console.log("userId:", userId);

      const post = await db.collection("post").findOne({
        _id: postId,
        userId: userId, // Optionally, you can add this filter if needed
      });

      if (!post) {
        return {
          redirect: {
            destination: "/post/newpost",
            permanent: false,
          },
        };
      }
      

      return {
        props: {
          postContent: post.postContent,
          title: post.title,
          metaDescription: post.metaDescription,
          keywords: post.keywords,
          ...props
        },
      };
    } catch (error) {
      console.error("An error occurred:", error);
      return {
        props: {
          postContent: "",
          title: "",
          metaDescription: "",
          keywords: "",
        },
      };
    }
  },
});
