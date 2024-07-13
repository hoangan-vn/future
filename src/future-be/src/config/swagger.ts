import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

export default function initSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(swaggerUi.generateHTML(await import("../swagger.json")));
  });
}
