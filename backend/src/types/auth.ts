import { Request, Response } from 'express';

// --- Request Body Interfaces ---
export interface RegisterBody {
    username: string;
    email: string;
    password: string;
}

export interface LoginBody {
    email: string;
    password: string;
}

// --- Typed Requests ---
export type RegisterRequest = Request<{}, {}, RegisterBody>;
export type LoginRequest = Request<{}, {}, LoginBody>;

// --- JWT Payload ---
export interface JwtPayload {
    userId: number;
}

// --- API Response Shapes ---
export interface AuthResponse {
    message: string;
    user?: SafeUser;
    error?: string;
}

// User object WITHOUT the password (safe to send to frontend)
export interface SafeUser {
    id: number;
    username: string;
    email: string;
}