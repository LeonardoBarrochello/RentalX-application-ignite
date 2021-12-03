import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerDocument from "./swagger.json";
import "./database";

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(router);
console.log("");
app.listen(3333, () => {
    console.log("Refresh working 2 test");
    console.log("Server is running");
});
