import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategory,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    // eslint-disable-next-line no-use-before-define

    constructor() {
        this.repository = getRepository(Category);
    }
    async create({ name, description }: ICreateCategory): Promise<void> {
        const category = await this.repository.create({
            name,
            description,
        });

        this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        return category;
    }
}

export { CategoriesRepository };
