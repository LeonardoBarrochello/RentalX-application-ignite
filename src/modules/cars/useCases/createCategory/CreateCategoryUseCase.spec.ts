import AppError from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: CategoriesRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepository = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    });

    it("Should not to be able to create a category that already exists", async () => {
        const category = {
            name: "Category name Test",
            description: "Category description Test",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepository.findByName(
            category.name
        );

        console.log(categoryCreated);
        expect(categoryCreated).toHaveProperty("id");
    });
    it("Should be able to create a new category", async () => {
        expect(async () => {
            const category = {
                name: "Category name Test",
                description: "Category description Test",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
