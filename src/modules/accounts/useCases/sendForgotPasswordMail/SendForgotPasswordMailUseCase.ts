import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import AppError from "@shared/errors/AppError";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DatejsProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) {}
    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists");
        }
        const token = uuidV4();

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date: this.dateProvider.AddHours(3),
        });

        const templateFilePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "emails",
            "forgotPassword.hbs"
        );

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_PASSWORD_URL}${token}`,
        };

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templateFilePath
        );
    }
}

export { SendForgotPasswordMailUseCase };
