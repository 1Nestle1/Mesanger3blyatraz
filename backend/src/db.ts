// db.ts
import { Pool } from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";
import dotenv from 'dotenv';
dotenv.config();
// Parse the DATABASE_URL manually to ensure password is a string
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
}

// Create pool with explicit password handling
const pool = new Pool({
    connectionString: connectionString,
    // Force password to be a string
    ...(process.env.DB_PASSWORD && { password: String(process.env.DB_PASSWORD) })
});


// Test the pool connection
pool.on('error', (err) => {
    console.error('Unexpected pool error:', err);
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ 
    adapter, 
    log: ["query", "error", "warn"] 
});

// Test connection on startup
pool.connect()
    .then(client => {
        console.log('✅ Database pool connected successfully');
        client.release();
    })
    .catch(err => {
        console.error('❌ Database pool connection failed:', err);
        console.error('Connection string format:', connectionString?.substring(0, 30) + '...');
    });

export default prisma;