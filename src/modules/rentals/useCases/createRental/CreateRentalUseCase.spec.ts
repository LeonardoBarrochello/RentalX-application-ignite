import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";
import AppError from "@shared/errors/AppError";

import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsProvider: DayjsProvider;
describe("Create Rental", () => {
    const addDayInHours = dayjs().add(2, "day").toDate();
    beforeEach(() => {
        dayjsProvider = new DayjsProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "test",
        });
        const rental = await createRentalUseCase.execute({
            user_id: "12122",
            car_id: car.id,
            expected_return_date: addDayInHours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a rental if there's a another rental in progress to the user", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "12122",
            car_id: "123",
            expected_return_date: addDayInHours,
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "12122",
                car_id: "321",
                expected_return_date: addDayInHours,
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for this user!")
        );
    });

    it("Should not be able to create a rental if there's a another rental in progress to the car", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "123",
            car_id: "test",
            expected_return_date: addDayInHours,
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: addDayInHours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });

    it("Should not be able to create a rental if expected_return_date its less than 24 hours", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time!"));
    });
});
