import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject("CarImagesRepository")
        private carImagesRepository: ICarImagesRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carImagesRepository.create(car_id, image);
            await this.storageProvider.save(image, "cars");
        });
    }
}

export { UploadCarImagesUseCase };
