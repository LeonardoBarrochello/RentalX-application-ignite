import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        email,
        id,
        avatar,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const user = await this.repository.create({
            name,
            email,
            id,
            avatar,
            password,
            driver_license,
        });
        this.repository.save(user);
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }
    async findById(user_id: string): Promise<User> {
        const user = await this.repository.findOne(user_id);
        return user;
    }
}

export { UsersRepository };
