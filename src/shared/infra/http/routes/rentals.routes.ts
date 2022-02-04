import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentals/ListRentalsByUserController";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();
const createRentalsController = new CreateRentalController();
const devolutionRentalsController = new DevolutionRentalController();
const listRentalsByUser = new ListRentalsByUserController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalsController.handle);
rentalsRoutes.post(
    "/devolution/:id",
    ensureAuthenticated,
    devolutionRentalsController.handle
);
rentalsRoutes.get("/user", ensureAuthenticated, listRentalsByUser.handle);
export { rentalsRoutes };
