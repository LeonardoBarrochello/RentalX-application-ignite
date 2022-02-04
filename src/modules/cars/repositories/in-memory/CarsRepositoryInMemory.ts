import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(car);

        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.cars.find(
            (car) => car.license_plate === license_plate
        );
        return car;
    }

    async findAvailable(category_id, brand, name): Promise<Car[]> {
        const cars = await this.cars.filter((car) => {
            if (
                car.available === true &&
                ((category_id && car.category_id === category_id) ||
                    (brand && car.brand === brand) ||
                    (name && car.name === name) ||
                    (!category_id && !brand && !name))
            ) {
                return car;
            }
            return null;
        });
        return cars;
    }
    async findById(id: string): Promise<Car> {
        const car = await this.cars.find((car) => car.id === id);
        return car;
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = await this.cars.findIndex((car) => car.id === id);
        this.cars[findIndex].available = available;
    }
}

export { CarsRepositoryInMemory };
