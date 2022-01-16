import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();
const createRentalsController = new CreateRentalController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalsController.handle);

export { rentalsRoutes };
