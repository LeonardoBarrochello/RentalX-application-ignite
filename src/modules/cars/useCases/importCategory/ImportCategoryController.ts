import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { file } = request;

            console.log(file);

            await this.importCategoryUseCase.execute(file);

            return response.send();
        } catch (exception) {
            return response.status(400).json({ error: exception.message });
        }
    }
}

export { ImportCategoryController };
