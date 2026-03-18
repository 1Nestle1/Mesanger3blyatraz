// db.ts (add at the top for debugging)
import dotenv from 'dotenv';
dotenv.config();

console.log('=== DATABASE CONNECTION DEBUG ===');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);

if (process.env.DATABASE_URL) {
    try {
        const url = new URL(process.env.DATABASE_URL);
        console.log('Host:', url.hostname);
        console.log('Port:', url.port);
        console.log('Database:', url.pathname.substring(1));
        console.log('Username:', url.username);
        console.log('Password exists:', !!url.password);
        console.log('Password length:', url.password?.length || 0);
        console.log('Password type:', typeof url.password);
    } catch (e) {
        console.error('Failed to parse DATABASE_URL:', e);
    }
}
console.log('=================================');