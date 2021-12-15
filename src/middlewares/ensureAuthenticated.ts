import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("missing token!", 401);
    }
    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(
            token,
            process.env.CLIENT_ID
        ) as IPayload;
        console.log("validando token", user_id);
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id);
        if (!user) {
            throw new AppError("User does not exists", 401);
        }
        request.user = {
            user_id,
        };
        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
