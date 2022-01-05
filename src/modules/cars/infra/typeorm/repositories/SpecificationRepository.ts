import {
    ICreateSpecificationDTO,
    ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";
import { getRepository, Repository } from "typeorm";

import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = await this.repository.create({
            name,
            description,
        });

        this.repository.save(specification);
    }
}

export { SpecificationRepository };