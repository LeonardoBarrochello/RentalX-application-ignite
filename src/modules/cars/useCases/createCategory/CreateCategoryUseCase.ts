import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;

    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const checkCategoryExists = await this.categoriesRepository.findByName(
            name
        );

        if (checkCategoryExists) {
            throw new AppError("Category already exists");
        }

        await this.categoriesRepository.create({
            name,
            description,
        });
    }
}

export { CreateCategoryUseCase };
