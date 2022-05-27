import express, { Express, Request, Response } from "express";
import SmsController from "../controllers/SmsController";
import { Account } from "../db/models/Account";
import middlewares from "../middlewares/middlewares";

const app: Express = express();

function smsRoute(): express.Application {
  app
    .route("/inbound/sms/")
    .post(middlewares.authMiddleware, SmsController.inbound);

  app
    .route("/outbound/sms/")
    .post(middlewares.authMiddleware, SmsController.outbound);

  app
    .route("**")
    .all((req: Request, res: Response) => {
      res.status(405).send({
        error: "unknown error"
      })
    })

  return app;
}

export default smsRoute;
