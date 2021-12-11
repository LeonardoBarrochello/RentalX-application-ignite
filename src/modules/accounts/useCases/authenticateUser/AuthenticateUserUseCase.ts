import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import AppError from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}
interface IRequest {
    email: string;
    password: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("email or password is incorrect!");
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("email or password is incorrect!");
        }
        const token = sign({}, "9bd09c4c99e77e4eb6d61e51aa17b8b4", {
            subject: user.id,
            expiresIn: "1d",
        });
        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
        };
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
