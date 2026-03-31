import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../services/Hasher';
import {
    RegisterRequest,
    LoginRequest,
    AuthResponse,
    JwtPayload,
} from '../types/auth';
import prisma from '../db';
import { generateToken } from '../services/TokenGen';

// --- Helper: Generate Token & Set Cookie ---
const TokenGenAndSetCookie = (userId: number, res: Response<AuthResponse>): void => {
    const token = generateToken(userId);


// --- Helper: Generate Token & Set Cookie ---


    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
// Acces token , refresh token вынести в сервисы хэш пароля и токенов свзязь с дб тож вынести , удаление куки поправить
// --- 1. REGISTER ---
export const register = async (
    req: RegisterRequest,
    res: Response<AuthResponse>
): Promise<void> => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            res.status(400).json({ message: 'Email or Username already taken' });
            return;
        }

        // Hash Password
        const hashedPassword: string = await hashPassword(password);
        // Create User
        const newUser = await prisma.user.create({
            data: { username, email, password: hashedPassword },
            
        });
        console.log('New User:', newUser);
        // Generate Token
        generateTokenAndSetCookie(newUser.id, res);

        res.status(201).json({
            message: 'User registered!',
            user: { id: newUser.id, username: newUser.username, email: newUser.email },
        });
    } catch (error: unknown) {
        console.error('Register Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// --- 2. LOGIN ---
export const login = async (
    req: LoginRequest,
    res: Response<AuthResponse>
): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        // Find User
        const user = await prisma.user.findFirst({ 
    where: { email } 
});;
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Verify Password
        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Generate Token
        generateTokenAndSetCookie(user.id, res);

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, username: user.username, email: user.email },
        });
    } catch (error: unknown) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// --- 3. LOGOUT ---
export const logout = (
    _req: RegisterRequest | LoginRequest,
    res: Response<AuthResponse>
): void => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};