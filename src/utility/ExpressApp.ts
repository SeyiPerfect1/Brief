import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler, notFound } from "../middlewares";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import hpp from "hpp"
// import { options } from "../docs/swagger";

import AuthRoutes from '../routes/User.route'
import ShortnerRoutes from '../routes/URL.route'

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //set cross origin resource sharing
  app.use(cors());

  // Set security headers
  app.use(helmet());

  // Prevent http para
  app.use(hpp());

  //setting up swagger doc
  // const specs = swaggerJsDoc(options);
  // app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use("/api/auth", AuthRoutes);
  app.use("/api/shortner", ShortnerRoutes);


  // Error handler
  app.use(notFound);
  app.use(errorHandler);

  return app;
};