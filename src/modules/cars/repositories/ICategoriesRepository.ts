import { Category } from "../infra/typeorm/entities/Category";

interface ICreateCategory {
    name: string;

    description: string;
}

interface ICategoriesRepository {
    create({ name, description }: ICreateCategory): Promise<void>;

    list(): Promise<Category[]>;

    findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategory };
