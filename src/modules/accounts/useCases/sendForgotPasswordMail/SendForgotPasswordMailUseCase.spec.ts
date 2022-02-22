import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInmemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";

import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import AppError from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DayjsProvider;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        mailProviderInMemory = new MailProviderInMemory();
        dateProvider = new DayjsProvider();
        usersTokensRepository = new UsersTokensRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepository,
            dateProvider,
            mailProviderInMemory
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "58277222",
            name: "Jeffrey Rhodes",
            email: "fu@zipdiltu.ls",
            password: "121312",
        });

        await sendForgotPasswordMailUseCase.execute("fu@zipdiltu.ls");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("vekij@do.fr")
        ).rejects.toEqual(new AppError("User does not exists"));
    });

    it("Should be able to generate a reset user password token", async () => {
        const generateToken = jest.spyOn(usersTokensRepository, "create");
        await usersRepositoryInMemory.create({
            driver_license: "3134145134",
            name: "Ryan Carr",
            email: "jurus@sozfo.bh",
            password: "12324",
        });

        await sendForgotPasswordMailUseCase.execute("jurus@sozfo.bh");

        expect(generateToken).toBeCalled();
    });
});
