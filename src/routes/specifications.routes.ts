import { Router } from "express";

import { createSpecificationsController } from "../modules/cars/useCases/createSpecifications";

const specificationRoute = Router();
specificationRoute.post("/", (request, response) => {
    createSpecificationsController.handle(request, response);
});
export { specificationRoute };
console.log("");
