// MongoDB Data Insertion Script (for creating user records)
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection string for the 'login' database
const dbURI = 'mongodb+srv://iambibin:cGggPH5xKOVY42I7@map-users.ridby.mongodb.net/login'; // Ensure this is the correct DB

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define the User schema for the 'login-credential' collection
const loginCredentialSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user', 'special'] }, // Ensure the roles match
}, { collection: 'users' });

// Create the LoginCredential model
const LoginCredential = mongoose.model('LoginCredential', loginCredentialSchema);

// Function to insert multiple login credentials with roles
async function insertLoginCredentials(users) {
    try {
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10); // Hash password

            const loginCredential = new LoginCredential({
                username: user.username,
                password: hashedPassword,
                role: user.role
            });

            const savedCredential = await loginCredential.save();
            console.log('Login credential inserted:', savedCredential);
        }
    } catch (error) {
        console.error('Error inserting login credentials:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after insert
    }
}

// Sample users to insert (including roles)
const usersToInsert = [
    { username: 'bibin', password: 'bibincv', role: 'admin' },
    { username: 'vivek', password: 'vivek1995', role: 'special' },
    { username: 'user1', password: 'user123', role: 'user' },
    { username: 'user2', password: 'user123', role: 'user' },
    { username: 'user3', password: 'user123', role: 'user' }
];

insertLoginCredentials(usersToInsert);
