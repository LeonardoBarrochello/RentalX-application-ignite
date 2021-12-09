import { Parser } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;

    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);

            const categories: IImportCategory[] = [];

            const parseFile = new Parser({ columns: false });

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    // eslint-disable-next-line no-param-reassign
                    let formatedLine = [];
                    console.log("default line", line);
                    line.forEach((element) => {
                        formatedLine = element.split(";");
                        formatedLine = formatedLine.filter(
                            (entry) => entry.trim() !== ""
                        );
                        // eslint-disable-next-line no-param-reassign
                    });
                    const [name, description] = formatedLine;
                    if (name && description) {
                        categories.push({
                            name,
                            description,
                        });
                    }
                })

                .on("end", () => {
                    fs.promises.unlink(file.path);

                    resolve(categories);
                })

                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        console.log("lista de categorias", categories);

        categories.map(async (category) => {
            const { name, description } = category;

            const existsCategory = await this.categoriesRepository.findByName(
                name
            );

            if (!existsCategory) {
                await this.categoriesRepository.create({ name, description });
            }
        });
    }
}

export { ImportCategoryUseCase };
