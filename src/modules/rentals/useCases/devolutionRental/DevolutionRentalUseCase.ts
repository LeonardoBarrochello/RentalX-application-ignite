import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DatejsProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({ id }: IRequest): Promise<Rental> {
        /* 
            verifica se aluguel existe 
            verifica quantas diarias o carro permaneceu alugado 
            se diaria for menor que 0 , diaria atribui a diaria minima que é 1 
            calcula o atraso baseado na data atual  e a data esperada de retorno de aluguel  
            se atraso for maior que 0 calcula multa baseado em fine_amount
            calcula o total que seria multa + as diarias vezes o custo da diaria
            atualiza aluguel com end_date e total
            atualiza carro para disponivel
        
        */
        const rental = await this.rentalsRepository.findById(id);
        const dateNow = this.dateProvider.DateNow();
        const minimumDaily = 1;

        if (!rental) {
            throw new AppError("Rental does not exists");
        }
        const car = await this.carsRepository.findById(rental.car_id);

        let daily = await this.dateProvider.CompareInDays(
            rental.start_date,
            dateNow
        );

        if (daily <= 0) {
            daily = minimumDaily;
        }

        const delay = await this.dateProvider.CompareInDays(
            dateNow,
            rental.expected_return_date
        );

        let total = 0;

        if (delay > 1) {
            const calculateFine = delay * car.fine_amount;
            total = calculateFine;
        }

        const totalDaily = daily * car.daily_rate;
        total += totalDaily;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };
