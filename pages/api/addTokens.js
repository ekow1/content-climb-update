import { getSession } from "@auth0/nextjs-auth0";
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const { user } = await getSession(req, res);
    console.log('user:', user);

    const client = await connectToDatabase();
    const db = client.db("ContentClimb");

    const userProfile = await db.collection("users").updateOne(
      {
        auth0Id: user.sub
      },
      { 
        $inc: {
          availableTokens: 10
        },
        $setOnInsert: {
          auth0Id: user.sub
        }
      },
      {
        upsert: true
      }
    );

    res.status(200).json({ name: 'John Doe' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
