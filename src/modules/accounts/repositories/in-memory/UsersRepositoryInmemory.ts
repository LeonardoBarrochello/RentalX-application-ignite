import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, { name, email, password, driver_license });
        await this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.users.find((user) => user.email === email);
        return user;
    }

    async findById(user_id: string): Promise<User> {
        const user = await this.users.find((user) => user.id === user_id);
        return user;
    }
}

export { UsersRepositoryInMemory };
