import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoryController } from "../modules/cars/useCases/listCategories/ListCategoryController";

const upload = multer({
    dest: "./tmp",
});

const categoriesRoute = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoute.post("/", createCategoryController.handle);

categoriesRoute.get("/", listCategoryController.handle);

categoriesRoute.post(
    "/import",
    upload.single("file"),
    importCategoryController.handle
);

export default categoriesRoute;
