import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoryController } from "../modules/cars/useCases/listCategories";

const upload = multer({
    dest: "./tmp",
});

console.log("")

const categoriesRoute = Router();

categoriesRoute.post("/", (request, response) => {
    createCategoryController.handle(request, response);
});
categoriesRoute.get("/", (request, response) => {
    listCategoryController.handle(request, response);
});

categoriesRoute.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response);
});

export default categoriesRoute;
