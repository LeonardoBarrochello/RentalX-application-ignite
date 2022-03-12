import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { UserMap } from "../../mappers/UserMap";

@injectable()
class ProfileUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute(id: string) {
        const user = await this.usersRepository.findById(id);

        return UserMap.toDTO(user);
    }
}

export { ProfileUserUseCase };
