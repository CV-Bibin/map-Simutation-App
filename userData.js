// Get the username from localStorage (assuming the username is stored in localStorage)
let username = localStorage.getItem('username');

// Get the totQstns (total number of questions) from localStorage (it's a number)
let storedTotQstns = 0; // Default to 0 if not found
try {
    storedTotQstns = JSON.parse(localStorage.getItem('totQstns')) || 0;
} catch (e) {
    console.error('Error parsing totQstns from localStorage:', e);
}

// Get the error count from localStorage, or initialize with default values
let errorCount = JSON.parse(localStorage.getItem('errorCount')) || {
    Relevance: 0,
    NameAccuracy: 0,
    AddressAccuracy: 0,
    PinAccuracy: 0
};

// Get the list of used questions from localStorage (if any)
let usedQuestions = JSON.parse(localStorage.getItem('usedQuestions')) || [];

// Set values in the profile section
function loadUserProfile() {
    // Only proceed if a username is stored in localStorage
    if (username) {
        // Set the username and role (assuming role is saved in localStorage or you can hardcode it)
        document.getElementById('profile-username').textContent = username;
        document.getElementById('profile-role').textContent = 'user'; // Set role, you may fetch this as well

        // Set the number of attempted questions and wrong answers
        document.getElementById('total-atqstns').textContent = usedQuestions.length; // Display the count of attempted questions
        document.getElementById('total-wrong').textContent = usedQuestions.length; // Display the count of wrong answers

        // Set error count values
        document.getElementById('profile-relevance').textContent = errorCount.Relevance;
        document.getElementById('profile-name').textContent = errorCount.NameAccuracy;
        document.getElementById('profile-address').textContent = errorCount.AddressAccuracy;
        document.getElementById('profile-pin').textContent = errorCount.PinAccuracy;

        // Set wrong answers details (list of used questions)
        document.getElementById('profile-wrong').textContent = usedQuestions.join(", ");
    }
}

// Function to prepare user data and send it to MongoDB
async function sendDataToMongo() {
    // Assuming the user ID is unique (e.g., stored in localStorage or generated)
    const userId = username;  // You can use username or another identifier as the user ID

    // Structure the data
    const userData = {
        username: username,
        questions_attempted: usedQuestions.length,
        relevance_accuracy: errorCount.Relevance,
        name_accuracy: errorCount.NameAccuracy,
        address_accuracy: errorCount.AddressAccuracy,
        pin_accuracy: errorCount.PinAccuracy,
        wrong_questions: usedQuestions.map((questionId) => {
            // Assuming you have a function to get details of the wrong question
            // For demonstration, it's just a mock-up. Replace with actual logic to get wrong answers' details.
            return {
                question_id: questionId, 
                wrong: 'relevance', // Add correct wrong answer logic here
                selected: 'good', // Replace with actual selected answer
                actual_answer: 'excellent' // Replace with actual correct answer
            };
        })
    };

    // Call the backend function to save data to MongoDB
    await createUserData(userId, userData);
}

// Call the function to load the profile and send data to MongoDB when the page is loaded
window.onload = function() {
    loadUserProfile();  // Load user profile first
    sendDataToMongo();  // Send data to MongoDB
};

// MongoDB connection and insertion logic
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
