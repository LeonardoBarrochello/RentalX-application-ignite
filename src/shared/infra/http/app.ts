import "reflect-metadata";
import "dotenv/config";
import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";

import AppError from "@shared/errors/AppError";
import { router } from "@shared/infra/http/routes";

import swaggerDocument from "../../../swagger.json";
import createConnection from "../typeorm/index";
import rateLimiterMiddleware from "./middlewares/rateLimiter";

createConnection();
const app = express();

Sentry.init({
    dsn: process.env.SENTRY_DNS,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),

        new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(rateLimiterMiddleware);
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use(cors());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ message: err.message });
        }
        return response.status(500).json({
            status: "error",
            message: `Internal Server Error - ${err.message}`,
        });
        next();
    }
);

export { app };
