import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../../../errors/AppError";

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
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;
        request.user = {
            user_id,
        };
        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
