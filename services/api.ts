import { Role } from "@/constants/data";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const AUTH_ENDPOINTS = (role: Role) => ({
    LOGIN:    `${BASE_URL}/auth/${role}/login`,
    REGISTER: `${BASE_URL}/auth/${role}/register`,
});

export const SHARED_ENDPOINTS = {
    FORGOT_PASSWORD:  `${BASE_URL}/auth/forgot-password`,
    VERIFY_CODE:      `${BASE_URL}/auth/verify-code`,
    RESET_PASSWORD:   `${BASE_URL}/auth/reset-password`,
    DRIVER_PROFILE:   `${BASE_URL}/driver/profile`,
    DRIVER_FUNDS:     `${BASE_URL}/driver/funds`,
    PASSENGER_PROFILE: `${BASE_URL}/passenger/profile`,
};

export const BULLETIN_ENDPOINTS = {
    ANNOUNCEMENTS: `${BASE_URL}/driver/announcements`,
    OFFICERS:      `${BASE_URL}/driver/officers`,
    FARE:          `${BASE_URL}/driver/fare`,
    LOST_FOUND:    `${BASE_URL}/driver/lost-found`,
    CODING:        `${BASE_URL}/driver/coding`,
    MY_VIOLATIONS: `${BASE_URL}/driver/my-violations`,
};

// ── Passenger-specific bulletin (no violations) ─────────────────
export const PASSENGER_BULLETIN_ENDPOINTS = {
    ANNOUNCEMENTS: `${BASE_URL}/passenger/announcements`,
    OFFICERS:      `${BASE_URL}/passenger/officers`,
    FARE:          `${BASE_URL}/passenger/fare`,
    LOST_FOUND:    `${BASE_URL}/passenger/lost-found`,
    CODING:        `${BASE_URL}/passenger/coding`,
};

export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.EXPO_PUBLIC_API_KEY as string,
    },
};