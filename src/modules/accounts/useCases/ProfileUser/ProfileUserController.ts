import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
    async handle(request: Request, response: Response) {
        const { user_id: id } = request.user;

        const profileUserUseCase = container.resolve(ProfileUserUseCase);

        const profile = await profileUserUseCase.execute(id);

        return response.json(profile);
    }
}

export { ProfileUserController };
