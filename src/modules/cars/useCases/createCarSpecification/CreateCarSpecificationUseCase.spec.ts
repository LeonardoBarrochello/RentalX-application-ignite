import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import AppError from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
describe("Create a car specification", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            specificationsRepositoryInMemory,
            carsRepositoryInMemory
        );
    });

    it("Should not be able to create a specification to a non-existent car", () => {
        expect(async () => {
            const car_id = "121313";
            const specifications_id = ["131213"];
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("Should  be able to create a specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car name",
            description: "Car description",
            daily_rate: 100,
            license_plate: "ABC-123",
            fine_amount: 15,
            brand: "Brand",
            category_id: "Category",
        });
        const specification = await specificationsRepositoryInMemory.create({
            name: "name",
            description: "description",
        });
        const specifications_id = [specification.id];
        const carSpecification = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(carSpecification).toHaveProperty("specification");
        expect(carSpecification.specifications.length).toBe(1);
    });
});
