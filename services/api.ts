// services/api.ts
import { Role } from "@/constants/data";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// Role-aware endpoints — call with the actual role at request time
export const AUTH_ENDPOINTS = (role: Role) => ({
    LOGIN:          `${BASE_URL}/auth/${role}/login`,
    REGISTER:       `${BASE_URL}/auth/${role}/register`,
});

// Shared endpoints — no role needed
export const SHARED_ENDPOINTS = {
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    VERIFY_CODE:     `${BASE_URL}/auth/verify-code`,
    RESET_PASSWORD:  `${BASE_URL}/auth/reset-password`,
    DRIVER_PROFILE:    `${BASE_URL}/driver/profile`,
};

export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.EXPO_PUBLIC_API_KEY as string,
    },
};