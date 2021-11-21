import { Category } from "../models/Category";

interface ICreateCategory {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({ name, description }: ICreateCategory): void;
    list(): Category[];
    findByName(name: string): Category;
}

export { ICategoriesRepository, ICreateCategory };
