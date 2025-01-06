const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// MongoDB Atlas URI and Database Setup
const uri = 'mongodb+srv://iambibin:cGggPH5xKOVY42I7@map-users.ridby.mongodb.net/userquizData?retryWrites=true&w=majority';
const dbName = 'userquizData';
const collectionName = 'user_data';

// Enable CORS
app.use(cors());  // Allow all origins. You can specify a more restricted origin if needed.

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to handle saving user data to MongoDB
app.post('/saveUserData', async (req, res) => {
    const { username, data } = req.body;

    // Log the received data
    console.log('Received data:', req.body);

    if (!username || !data) {
        return res.status(400).json({ error: 'Username and data are required' });
    }

    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect(); // Connect to MongoDB

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Data structure to be inserted into MongoDB
        const userDocument = {
            _id: username,
            username: data.username,
            questions_attempted: data.questions_attempted,
            relevance_accuracy: data.relevance_accuracy,
            name_accuracy: data.name_accuracy,
            address_accuracy: data.address_accuracy,
            pin_accuracy: data.pin_accuracy,
            wrong_questions: data.wrong_questions
        };

        // Insert or update the user document (upsert: true means insert if not found)
        const result = await collection.updateOne(
            { _id: username },
            { $set: userDocument },
            { upsert: true }
        );

        console.log(`User data for ${username} saved/updated successfully!`);
        res.status(200).json({ message: 'User data saved successfully!' });
    } catch (error) {
        console.error('Error inserting user data:', error);
        res.status(500).json({ error: 'Failed to save user data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
