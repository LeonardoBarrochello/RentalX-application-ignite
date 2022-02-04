import AppError from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInmemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("Authenticate User", () => {
    let authenticateUserUseCase: AuthenticateUserUseCase;
    let usersRepositoryInMemory: UsersRepositoryInMemory;
    let createUserUseCase: CreateUserUseCase;

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate a user", async () => {
        const user: ICreateUserDTO = {
            name: "User Test",
            email: "usertest@gmail.com",
            password: "1234",
            driver_license: "0020201",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });
    it("Should not be able to authenticate an non existing user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "falseemail@gmail.com",
                password: "1212",
            })
        ).rejects.toEqual(new AppError("email or password is incorrect!"));
    });
    it("Should not be able to athenticate with incorrect password ", async () => {
        const user: ICreateUserDTO = {
            name: "User ramdom",
            email: "userramdom@gmail.com",
            password: "1234",
            driver_license: "0020201",
        };
        await createUserUseCase.execute(user);
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword",
            })
        ).rejects.toEqual(new AppError("email or password is incorrect!"));
    });
});
