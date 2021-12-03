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

    async execute({ name, description }: IRequest): Promise<void> {
        const checkCategoryExists = await this.categoriesRepository.findByName(
            name
        );

        console.log(checkCategoryExists);
        if (checkCategoryExists) {
            throw new Error("Category already exists");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
