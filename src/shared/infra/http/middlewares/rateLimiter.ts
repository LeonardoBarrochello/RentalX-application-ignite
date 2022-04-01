import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import * as redis from "redis";

import AppError from "@shared/errors/AppError";

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "rateLimiter",
    points: 5, // 10 requests
    duration: 5, // per 1 second by IP
});

export default async function rateLimiterMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
) {
    try {
        await rateLimiter.consume(request.ip);
        next();
    } catch (error) {
        throw new AppError("Too many requests", 429);
    }
}
