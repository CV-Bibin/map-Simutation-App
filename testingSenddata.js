const { MongoClient } = require('mongodb');

// MongoDB Atlas URI and Database Setup
const uri = 'mongodb+srv://iambibin:cGggPH5xKOVY42I7@map-users.ridby.mongodb.net/userquizData?retryWrites=true&w=majority'; // Your Atlas connection string
const dbName = 'userquizData'; // Database name
const collectionName = 'user_data'; // Collection name

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function createUserData(userId, data) {
  try {
    await client.connect();  // Connect to the database

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Data structure to be inserted
    const userDocument = {
      _id: userId,
      username: data.username,
      questions_attempted: data.questions_attempted,
      relevance_accuracy: data.relevance_accuracy,
      name_accuracy: data.name_accuracy,
      address_accuracy: data.address_accuracy,
      pin_accuracy: data.pin_accuracy,
      wrong_questions: data.wrong_questions
    };

    // Insert or update user data (upsert will insert if the user does not exist)
    const result = await collection.updateOne(
      { _id: userId },  // Match by userId
      { $set: userDocument }, // Update the document or insert if not found
      { upsert: true } // Upsert will insert the document if it doesn't exist
    );

    console.log(`User data for ${userId} saved/updated successfully!`);
    console.log(result);
  } catch (error) {
    console.error('Error inserting user data:', error);
  } finally {
    await client.close(); // Close the connection to MongoDB
  }
}

// Example usage:
const userData = {
  username: 'john_doe',
  questions_attempted: 10,
  relevance_accuracy: 6,
  name_accuracy: 4,
  address_accuracy: 5,
  pin_accuracy: 4,
  wrong_questions: [
    { 
      question_id: '2', 
      wrong: 'relevance',
      selected: 'good',
      actual_answer: 'excellent'
    },
    { 
      question_id: '4', 
      wrong: 'address accuracy',
      selected: 'excellent',
      actual_answer: 'wrong'
    }
  ]
};

createUserData('user_id_1', userData);
