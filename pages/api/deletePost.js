import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { user: { sub } } = await getSession(req, res);
    const client = await connectToDatabase();
    const db = client.db("ContentClimb");
    const userProfile = await db.collection("users").findOne({
      auth0Id: sub
    });

    const { postId } = req.body;

    // Handle the deletion logic here
    await db.collection("post").deleteOne({
      userId: userProfile._id,
      _id: new ObjectId(postId)
    });

    res.status(200).json({ success: true });

  } catch (e) {
    console.log('Error trying to delete a post:', e);
    res.status(500).json({ success: false, error: e.message });
  }
});
