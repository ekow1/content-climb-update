import { getSession } from '@auth0/nextjs-auth0';
import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const { user } = await getSession(req, res);
    const client = await connectToDatabase();
    const db = client.db("ContentClimb");

    const userProfile = await db.collection("users").findOne({
      auth0Id: user.sub,
    });

    if (!userProfile?.availableTokens || userProfile.availableTokens <= 0) {
      return res.status(403).json({ error: "No available tokens" });
    }

    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(config);

    const { topic, keywords } = req.body;

    if (!topic || topic.length > 100) {
      return res.status(422).json({ error: "Invalid topic" });
    }

    let generatedKeywords = "";

    // Check if keywords are not provided or are empty
    if (!keywords || keywords.length === 0) {
      // Generate keywords from the blog content
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 3600, // Adjust the max_tokens based on your content length
        prompt: `Generate keywords for the topic "${topic}"`,
      });

      // Extract keywords from the response
      generatedKeywords = response.data.choices[0]?.text.trim();
    }

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 3600,
      prompt: `Generate a detailed SEO-friendly blog about ${topic}, that targets ${
        keywords || generatedKeywords
      }. The content should be formatted in SEO-friendly HTML. The response must also include appropriate HTML title and meta description content. HTML list tags if necessary.
        The return format must be stringified JSON in the following format {
            "postContent" : post content here
            "title" : title goes here
            "metaDescription" : meta description goes here
        }`,
    });

    await db.collection("users").updateOne(
      {
        auth0Id: user.sub,
      },
      {
        $inc: {
          availableTokens: -1,
        },
      }
    );

    const parsed = JSON.parse(response.data.choices[0]?.text.split('\n').join(""));

    const post = await db.collection("post").insertOne({
      postContent: parsed?.postContent,
      title: parsed?.title,
      metaDescription: parsed?.metaDescription,
      topic,
      keywords: keywords || generatedKeywords,
      userId: userProfile._id,
      created: new Date(),
    });

    return res.status(200).json({
      postId: post.insertedId,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({ error: 'An internal server error occurred' });
  }
}
