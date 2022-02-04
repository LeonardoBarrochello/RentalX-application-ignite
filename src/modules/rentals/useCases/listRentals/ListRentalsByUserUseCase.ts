import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { injectable, inject } from "tsyringe";

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ) {}
    async execute(user_id: string) {
        const rentals = await this.rentalsRepository.findByUserId(user_id);

        return rentals;
    }
}

export { ListRentalsByUserUseCase };
