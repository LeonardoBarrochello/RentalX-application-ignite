import dayjs from "dayjs";

import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";
import AppError from "@shared/errors/AppError";

import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsProvider: DayjsProvider;
describe("Create Rental", () => {
    const addDayInHours = dayjs().add(1, "day").toDate();
    beforeEach(() => {
        dayjsProvider = new DayjsProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsProvider
        );
    });

    it("Should be able to create a rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12122",
            car_id: "12121",
            expected_return_date: addDayInHours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a rental if there's a another rental in progress to the user", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12122",
                car_id: "123",
                expected_return_date: addDayInHours,
            });

            await createRentalUseCase.execute({
                user_id: "12122",
                car_id: "321",
                expected_return_date: addDayInHours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a rental if there's a another rental in progress to the car", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: addDayInHours,
            });

            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: addDayInHours,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a rental if expected_return_date its less than 24 hours", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
