import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DatejsProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute(token: string) {
        const { email, sub } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const user_id = sub;

        const usersTokens =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!usersTokens) {
            throw new AppError("Refresh token does not exists");
        }

        await this.usersTokensRepository.deleteById(usersTokens.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: auth.expires_in_refresh_token,
        });

        const expires_date = this.dateProvider.AddDays(
            auth.expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            refresh_token,
            expires_date,
            user_id,
        });

        return refresh_token;
    }
}

export { RefreshTokenUseCase };
