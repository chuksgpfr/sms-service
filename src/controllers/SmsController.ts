import { Request, Response } from "express";
import SmsService from "../services/SmsService";
import SmsValidation from "../validations/SmsValidation";

class SmsController {
  constructor() {
    
  }

  async inbound(req: Request, res: Response) {
   try {
     const validate: any = await SmsValidation.inboundValidation(req.body);

     if (validate.errors) {
      return res.status(400).send({
        meaasge: "",
        error: validate.errors[0]
      })
    }

     const { username, auth_id, to, from, text } = req.body;

     const checkTo: boolean = await SmsService.checkToPhoneNumber(username, auth_id, to);

     if (!checkTo) {
        return res.status(400).send({
          meaasge: "",
          error: "to parameter not found"
        })
     }

      await SmsService.storeUniquetext(text, from, to);

      return res.status(200).send({
        message: "inbound sms ok",
        error: ""
      });
   } catch (error) {
    return res.status(400).send({
      error: "[Inbound]: unknown failure"
    });
   }
  }

  async outbound(req: Request, res: Response) {
    try {
      const validate: any = await SmsValidation.inboundValidation(req.body);

      if (validate.errors) {
        return res.status(400).send({
          meaasge: "",
          error: validate.errors[0]
        })
      }

      const { username, auth_id, to, from, text } = req.body;

      const checkFrom: boolean = await SmsService.checkToPhoneNumber(username, auth_id, from);

     if (!checkFrom) {
        return res.status(400).send({
          meaasge: "",
          error: "from parameter not found"
        })
     }
      
      const result: { error: string } = await SmsService.checkFromNumberRequest(text, from, to);

      if (result.error) {
        return res.status(400).send({
          message: "",
          error: result.error
        })
      }

      return res.status(200).send({
        message: "outbound sms ok",
        error: ""
      })

    } catch (error) {
      
    }
  }
}

export default new SmsController();
