import rateLimit from "express-rate-limit";
import { NODE_ENV, RATE_LIMIT } from "../../src/shared/utils/constants.js";

// IP-based rate limiter
export const ipLimiter = rateLimit({
    windowMs: RATE_LIMIT.WINDOW_MS,
    max: RATE_LIMIT.IP_LIMIT,
    message: { message: "Too many requests in a minute, wait for a minute and retry." },
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => process.env.NODE_ENV === NODE_ENV.TEST, // skip in test env
});

export const postLimiter = rateLimit({
    windowMs: RATE_LIMIT.WINDOW_MS,
    max: RATE_LIMIT.POST_LIMIT,
    message: { message: "Too many requests in a minute, wait for a minute and retry." },
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => process.env.NODE_ENV === NODE_ENV.TEST,
});