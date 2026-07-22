// src/config.ts
// Centralized configuration for the Vj's Beastline gym website.
// Values are read from Vite's environment variables.
// Ensure a .env file provides these variables for production.

export const PHONE = import.meta.env.VITE_PHONE ?? "919393936781";

// Use a fallback base URL for production builds (e.g., GitHub Pages). When VITE_BASE_URL is not set, '/' works for root deployment.
export const BASE_URL = import.meta.env.VITE_BASE_URL ?? "/";


// Additional configuration can be added here as needed.
