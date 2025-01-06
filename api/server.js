const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 5000;
const port = 3000;  // Port for the second server if needed

// MongoDB connection strings for both databases
const loginDB_URI = 'mongodb+srv://iambibin:cGggPH5xKOVY42I7@map-users.ridby.mongodb.net/login?retryWrites=true&w=majority';
const quizDataDB_URI = 'mongodb+srv://iambibin:cGggPH5xKOVY42I7@map-users.ridby.mongodb.net/quizData?retryWrites=true&w=majority';
const uri = 'mongodb+srv://iambibin:cGggPH5xKOVY42I7@map-users.ridby.mongodb.net/userquizData?retryWrites=true&w=majority';
const dbName = 'userquizData';
const collectionName = 'user_data';

// Apply CORS middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB databases and define models
async function connectDatabases() {
    try {
        // Connect to the login credentials database
        await mongoose.connect(loginDB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to login credentials database');

        // The second connection can be done by using the same mongoose instance, 
        // or you can use a different connection string for the quiz data if needed.
        const quizDBConnection = mongoose.createConnection(quizDataDB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to quiz data database');
        return quizDBConnection;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
}

// Define the Question schema for the 'queries' collection
const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true }
});

let Question;

// Initialize the database connection and set up the model
connectDatabases().then((quizDBConnection) => {
    // Register the model with the 'queries' collection explicitly
    Question = quizDBConnection.model('Question', questionSchema, 'queries');  // Specify 'queries' as the collection name
}).catch((err) => {
    console.error('Error connecting to databases:', err);
});

// Define the User schema for login
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Login route to authenticate users
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username: new RegExp('^' + username + '$', 'i') });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({
            token,
            username: user.username,
            userId: user._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to store attempts (store user answers)
app.post('/attempt', async (req, res) => {
    const { userId, questionId, answer } = req.body;

    if (!userId || !questionId || !answer) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        const isCorrect = answer === question.correctAnswer;

        const newAttempt = new Attempt({
            userId,
            questionId,
            answer,
            isCorrect
        });

        await newAttempt.save();
        res.status(200).json({ message: 'Attempt saved successfully', isCorrect });
    } catch (error) {
        res.status(500).json({ message: 'Error saving attempt' });
    }
});

// Route to fetch questions from MongoDB using Mongoose
app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.json({ questions });
    } catch (error) {
        res.status(500).send('Error fetching questions');
    }
});

// Route to fetch all users from the login database
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});


// Route to handle saving user data to MongoDB (Second server)
app.post('/saveUserData', async (req, res) => {
    const { username, data } = req.body;

    if (!username || !data) {
        return res.status(400).json({ error: 'Username and data are required' });
    }

    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const userDocument = {
            username: data.username,
            questions_attempted: data.questions_attempted,
            relevance_accuracy: data.relevance_accuracy,
            name_accuracy: data.name_accuracy,
            address_accuracy: data.address_accuracy,
            pin_accuracy: data.pin_accuracy,
            wrong_questions: data.wrong_questions,
            date_saved: new Date() // Adding a timestamp to track when the data was saved
        };
        
        // Insert a new record for the user data without overwriting any existing data
        const result = await collection.insertOne(userDocument);

        res.status(200).json({ message: 'User data saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save user data' });
    }
});

// Route to fetch all users from the login database
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

// Route to fetch all quiz questions from the quiz database
app.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find(); // This fetches all questions from MongoDB
        res.json({ questions });
    } catch (error) {
        res.status(500).send('Error fetching questions');
    }
});

// Route to fetch all user data from the 'userquizData' database (for viewing quiz-related statistics)
app.get('/api/userData', async (req, res) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        
        // Fetch all user data from MongoDB (user data statistics like quiz performance)
        const userData = await collection.find().toArray();

        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});








// Start the first server (login & quiz data API)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Start the second server (user data API)
app.listen(port, () => {
    console.log(`Second server is running on http://localhost:${port}`);
});
