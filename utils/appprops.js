import { getSession } from "@auth0/nextjs-auth0";
import { connectToDatabase } from "../lib/mongodb";

export const getAppProps = async (ctx) => {
  const userSession = await getSession(ctx.req, ctx.res);
  const client = await connectToDatabase();
  const db = client.db("ContentClimb");
  const user = await db.collection("users").findOne({
    auth0Id: userSession.user.sub,
  });

  if (!user) {
    return {
      availableTokens: 0,
      posts: [],
    };
  }

  const posts = await db.collection("post").find({
    userId: user._id, // Convert user._id to a string
  }) .sort({
    created : -1,
  }).toArray();

  // Transform the posts data to ensure userId is serializable
  const serializablePosts = posts.map(({ created, _id, userId, ...rest }) => ({
    _id: _id.toString(),
    created: created.toString(),
    userId: userId.toString(), // Convert userId to a string
    ...rest,
  }));

  const postId = ctx.params?.postid || null;
  console.log(postId)

  return {
    availableTokens: user.availableTokens,
    posts: serializablePosts, 
    postId : postId
    // Use the transformed data
  };

 

};

