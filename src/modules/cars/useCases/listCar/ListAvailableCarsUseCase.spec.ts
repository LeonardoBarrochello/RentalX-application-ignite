import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarsUseCase: CreateCarUseCase;

describe("List cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
        createCarsUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
        const car = await createCarsUseCase.execute({
            name: "Car 1",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 15,
            brand: "Brand",
            category_id: "Category",
        });

        const cars = await listAvailableCarUseCase.execute({});

        console.log(cars);
        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await createCarsUseCase.execute({
            name: "Opala",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 15,
            brand: "Brand",
            category_id: "Category",
        });

        const cars = await listAvailableCarUseCase.execute({ name: "Opala" });
        console.log(cars);
        expect(cars).toEqual([car]);
    });
    it("Should be able to list all available cars by category", async () => {
        const car = await createCarsUseCase.execute({
            name: "Opala",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 15,
            brand: "Brand",
            category_id: "Sedan",
        });

        const cars = await listAvailableCarUseCase.execute({
            category_id: "Sedan",
        });
        console.log(cars);
        expect(cars).toEqual([car]);
    });
    it("Should be able to list all available cars by brand", async () => {
        const car = await createCarsUseCase.execute({
            name: "Opala",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 15,
            brand: "Hb20",
            category_id: "Category",
        });

        const cars = await listAvailableCarUseCase.execute({ brand: "Hb20" });
        console.log(cars);
        expect(cars).toEqual([car]);
    });
});
