import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    findByLicensePlate(license_plate: string): Promise<Car>;
    create(data: ICreateCarDTO): Promise<Car>;
}

export { ICarsRepository };
