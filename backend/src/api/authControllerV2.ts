import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    RegisterRequest,
    LoginRequest,
    AuthResponse,
    JwtPayload,
} from "../types/auth";
import prisma from "../db";
import { hashPassword } from "../services/Hasher";
import { generateToken } from "../services/TokenGen";
// init everything tath needed 
//register 
//login
//logout
