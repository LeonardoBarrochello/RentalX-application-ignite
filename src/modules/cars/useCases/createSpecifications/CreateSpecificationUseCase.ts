import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;

    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const checkSpecificationAlreadyExists =
            await this.specificationRepository.findByName(name);

        if (checkSpecificationAlreadyExists) {
            throw new AppError("Specification Already Exists");
        }

        this.specificationRepository.create({
            name,

            description,
        });
    }
}

export { CreateSpecificationUseCase };
