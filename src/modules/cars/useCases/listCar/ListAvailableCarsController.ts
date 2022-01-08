import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { category_id, brand, name } = request.query;

        const listAvailableCarUseCase = container.resolve(
            ListAvailableCarsUseCase
        );
        const listCars = await listAvailableCarUseCase.execute({
            category_id: category_id as string,
            brand: brand as string,
            name: name as string,
        });

        return response.json(listCars);
    }
}

export { ListAvailableCarsController };
