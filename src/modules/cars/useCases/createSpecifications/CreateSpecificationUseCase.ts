import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {}
    execute({ name, description }: IRequest): void {
        const checkSpecificationAlreadyExists =
            this.specificationRepository.findByName(name);
        if (checkSpecificationAlreadyExists) {
            throw new Error("Specification Already Exists");
        }
        this.specificationRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
