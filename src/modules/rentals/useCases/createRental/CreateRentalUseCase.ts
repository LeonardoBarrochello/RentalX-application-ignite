import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DatejsProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimunHoursStayWithCar = 24;
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        const rentalIsOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalIsOpenToUser) {
            throw new AppError("There's a rental in progress for this user!");
        }

        const dateNow = this.dateProvider.DateNow();

        const compare = this.dateProvider.CompareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minimunHoursStayWithCar) {
            throw new AppError("Invalid return time!");
        }
        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
