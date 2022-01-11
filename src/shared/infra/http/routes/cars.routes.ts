import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listCar/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { Router } from "express";
import multer from "multer";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const upload = multer(uploadConfig.upload("./tmp/cars"));
const createCarsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const carRoutes = Router();

carRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarsController.handle
);

carRoutes.get("/available", listAvailableCarsController.handle);

carRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    uploadCarImagesController.handle
);

export { carRoutes };
