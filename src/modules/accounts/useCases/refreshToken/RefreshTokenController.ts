import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } =
            request.body || request.query || request.headers["x-access-token"];

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const refresh_token = await refreshTokenUseCase.execute(token);

        return response.json(refresh_token);
    }
}

export { RefreshTokenController };
