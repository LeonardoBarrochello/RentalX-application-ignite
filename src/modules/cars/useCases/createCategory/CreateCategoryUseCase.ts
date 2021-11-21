import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

/**
 *   [x] - Definir tipo de retorno
 *   [x] - Alterar retorno de erro
 *   [x] - Acessar o repositório
 *   [x] - Retornar algo
 */
class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}
    execute({ name, description }: IRequest): void {
        const checkCategoryExists = this.categoriesRepository.findByName(name);
        if (checkCategoryExists) {
            throw new Error("Category already exists");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
