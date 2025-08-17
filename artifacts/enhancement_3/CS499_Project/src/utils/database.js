// src/utils/database.js
import { MongoClient } from 'mongodb';

const dbName = process.env.DB_NAME || 'projectdb';
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

let client;
let db;

// Function to connect to MongoDB
export async function connectDB() {
    if (db) return db;

    try {
        client = new MongoClient(mongoUri);
        await client.connect();
        db = client.db(dbName);
        console.log(`Connected to MongoDB: ${dbName}`);
        return db;
    } catch (err) {
        console.error('MongoDB failed to connect:', err);
        throw err;
    }
}

// Function to close connection to MongoDB
export async function closeDB() {
    try {
        if (client) {
            await client.close();
            console.log('MongoDB connection has closed');
        }
    } catch (err) {
        console.error('Error closing connection to MongoDB:', err);
    }
}