import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        user_id,
        car_id,
        expected_return_date,
        id,
        total,
        end_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            user_id,
            car_id,
            expected_return_date,
            id,
            total,
            end_date,
        });

        await this.repository.save(rental);

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const findByCar = await this.repository.findOne({
            where: { car_id, end_date: null },
        });
        return findByCar;
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const findByUser = await this.repository.findOne({
            where: { user_id, end_date: null },
        });
        return findByUser;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);
        return rental;
    }
    async findByUserId(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car"],
        });
        return rentals;
    }
}

export { RentalsRepository };
