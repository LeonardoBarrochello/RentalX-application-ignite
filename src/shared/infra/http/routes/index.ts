import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/rentals", rentalsRoutes);
router.use("/cars", carRoutes);
router.use("/categories", categoriesRoutes);
router.use("/password", passwordRoutes);
router.use("/specifications", specificationRoutes);
router.use(authenticateRoutes);

export { router };
