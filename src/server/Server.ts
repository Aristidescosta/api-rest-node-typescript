import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger.json";

import "./shared/services/TranslationsYup";
import { router } from "./routes";

const server = express();

server.use(express.json());
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
server.use("/v1", router);

export { server };