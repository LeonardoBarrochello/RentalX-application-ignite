import uploadCategory from "@config/upload";
import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/useCases/listCategories/ListCategoryController";
import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const uploadCategories = multer(uploadCategory.upload("./tmp"));

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
);

categoriesRoutes.get(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    listCategoryController.handle
);

categoriesRoutes.post(
    "/import",
    uploadCategories.single("file"),
    ensureAuthenticated,
    ensureAdmin,
    importCategoryController.handle
);

export { categoriesRoutes };
