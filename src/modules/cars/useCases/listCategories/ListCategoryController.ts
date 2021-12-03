import { Request, Response } from "express";

import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {
    constructor(private listCategoryUseCase: ListCategoryUseCase) {}

    async handle(request: Request, response: Response) {
        const all = await this.listCategoryUseCase.execute();

        return response.json(all);
    }
}

export { ListCategoryController };
