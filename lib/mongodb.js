import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

let clientPromise;

export async function connectToDatabase() {
  if (!clientPromise) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    clientPromise = client.connect();
  }
  return clientPromise;
}

// You can also export a function to close the MongoDB connection when needed.
export async function closeDatabase() {
  if (clientPromise) {
    const client = await clientPromise;
    client.close();
    clientPromise = null;
  }
}
