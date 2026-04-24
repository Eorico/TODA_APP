const BASE_URL = process.env.EXPO_PUBLIC_API_URL

export const ENDPOINTS = {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    VERIFY_CODE: '',
    // add nalang dito
};

export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.EXPO_PUBLIC_API_KEY as string
    }
};