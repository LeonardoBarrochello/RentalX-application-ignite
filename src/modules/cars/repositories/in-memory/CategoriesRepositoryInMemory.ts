import { Category } from "../../infra/typeorm/entities/Category";
import {
    ICategoriesRepository,
    ICreateCategory,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async create({ name, description }: ICreateCategory): Promise<void> {
        const category = new Category();
        Object.assign(category, {
            name,
            description,
        });
        this.categories.push(category);
    }
    async list(): Promise<Category[]> {
        const all = this.categories;
        return all;
    }
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(
            (category) => category.name === name
        );
        return category;
    }
}

export { CategoriesRepositoryInMemory };
