import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecifications/CreateSpecificationController";

const createSpecificationController = new CreateSpecificationController();
const specificationRoute = Router();

specificationRoute.post("/", createSpecificationController.handle);

export { specificationRoute };
