import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

const createCarsController = new CreateCarController();
const carRoutes = Router();

carRoutes.post("/", createCarsController.handle);

export { carRoutes };
