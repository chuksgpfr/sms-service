import { NextFunction, Request, Response } from 'express';
import { Account } from '../db/models/Account';


class Middlewares {
  async authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      
      const authorization: string | undefined = req.headers.authorization;

      if (!authorization) {
        return res.status(403).send({
          message: "No authorization header found"
        });
      }

      const authorizationArr: string[] = authorization.split(" ");
      const login: string =   Buffer.from(authorizationArr[1], "base64").toString("ascii");
      

      const loginArr: string[] = login.split(":");

      const username: string = loginArr[0];
      const auth_id: string = loginArr[1];
  
      const account: Account | null = await Account.findOne({
        where: {
          auth_id,
          username
        }
      });
  
      if (!account) {
        return res.status(403).send({
          message: "Unauthorized user"
        });
      }

      req.body = {
        ...req.body,
        auth_id,
        username
      };
      
      next()
    } catch (error: any) {
      console.log(error.message);
      
      return res.status(500).send({
        message: "[Authorization]: unknown failure"
      });
    }
  }
}



export default new Middlewares();
