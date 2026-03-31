import jwt from "jsonwebtoken";
import { Response } from 'express';
import { access_token_generator,
    refresh_token_generator } from "./TokenGen";

// services/CookieService.ts


class CookieStaff {
    private defaultOptions: {
        httpOnly: boolean;
        secure: boolean;
        sameSite: 'strict' | 'lax' | 'none';
        path: string;
    };

    constructor() {
        this.defaultOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        };
    }

    // --- Set Access Token Cookie ---
    setAccessToken(res: Response, token: string): void {
        res.cookie('access_token', token, {
            ...this.defaultOptions,
            maxAge: 15 * 60 * 1000, // 15 minutes
        });
    }

    // --- Set Refresh Token Cookie ---
    setRefreshToken(res: Response, token: string): void {
        res.cookie('refresh_token', token, {
            ...this.defaultOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/api/auth/refresh', // only sent to refresh endpoint
        });
    }

    // --- Set Both Tokens ---
    setTokens(
        res: Response,
        accessToken: string,
        refreshToken: string
    ): void {
        this.setAccessToken(res, accessToken);
        this.setRefreshToken(res, refreshToken);
    }

    // --- Clear Access Token ---
    clearAccessToken(res: Response): void {
        res.cookie('access_token', '', {
            ...this.defaultOptions,
            expires: new Date(0),
            maxAge: 0,
        });
    }

    // --- Clear Refresh Token ---
    clearRefreshToken(res: Response): void {
        res.cookie('refresh_token', '', {
            ...this.defaultOptions,
            path: '/api/auth/refresh',
            expires: new Date(0),
            maxAge: 0,
        });
    }

    // --- Clear All Auth Cookies ---
    clearAllTokens(res: Response): void {
        this.clearAccessToken(res);
        this.clearRefreshToken(res);
    }
}

export const cookieService = new CookieService();