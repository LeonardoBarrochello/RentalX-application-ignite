import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import AppError from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create a car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });
    it("Should be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "Car name",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 15,
            brand: "Brand",
            category_id: "Category",
        });
    });
    it("Should not be able to create a car with existing license plate", async () => {
        await createCarUseCase.execute({
            name: "Car 1",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 15,
            brand: "Brand",
            category_id: "Category",
        });
        await expect(
            createCarUseCase.execute({
                name: "Car 2",
                description: "Car description",
                daily_rate: 100,
                license_plate: "ABC-123",
                fine_amount: 15,
                brand: "Brand",
                category_id: "Category",
            })
        ).rejects.toEqual(new AppError("Car already exists"));
    });

    it("Should be able to create a car available by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Car 3",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 15,
            brand: "Brand",
            category_id: "Category",
        });

        expect(car.available).toBe(true);
    });
});
