import * as yup from 'yup';
import { Inbound } from '../types/UserTypes';

class SmsValidation {
  
  async inboundValidation(body: Inbound) {
    try {
      const schema = yup.object().shape({
        from: yup.string().required("from is missing").min(6, "from is invalid").max(16, "from is invalid"),
        to: yup.string().required("to is missing").min(6, "to is invalid").max(16, "to is invalid"),
        text: yup.string().required("text is missing").min(1, "text is invalid").max(120, "text is invalid"),
      });
  
      await schema.validate(body);
      
      return {
        errors: null
      }
    } catch (error: any) {
      return {
        errors: error.errors
      }
    }
  }
}

export default new SmsValidation();