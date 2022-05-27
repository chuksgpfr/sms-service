import { Account } from "../db/models/Account";
import { PhoneNumber } from "../db/models/PhoneNumber";
import SmsHelper from "../helpers/SmsHelper";
import ISms from "../interface/ISms";
import { RedisType } from "../types/RedisType";
import RedisService from "./RedisService";

class SmsService implements ISms {

  async checkFromNumberRequest(text: string, from: string, to: string): Promise<{ error: string }> {
    try {
      const checkStop: boolean = await SmsHelper.isStop(to, from);
      if (checkStop) {
        return {
          error: `sms from ${from} to ${to} blocked by STOP request`
        }
      }

      // check if from request is up to 50 and increment if not
      const key: string = `Request:${from}`;
      const redisData: string = await RedisService.getRedisConfig(key);
      

      if (!redisData) {
        const body: RedisType = {
          key: `Request:${from}`,
          value: "1",
          hours: 24,
          nx: false,
        }
        await RedisService.setRedisConfig(body);
      } else {
        
        const requestCount: number = parseInt(redisData);
        if (requestCount >= 50) {
          return {
            error: `limit reached for from <${from}>`
          }
        }
        const body: RedisType = {
          key: `Request:${from}`,
          value: (requestCount + 1).toString(),
          hours: 24,
          nx: false,
        }
        await RedisService.setRedisConfig(body);
      }

      return {
        error: ""
      }
    } catch (error) {
      return {
        error: "unknown error"
      }
    }
  }

  async getAccountWithPhoneNumber(username: string, auth_id: string): Promise<Account | null> {
    try {
      const accountRaw: Account | null = await Account.findOne({ where: { username, auth_id}, include: [PhoneNumber]  });

      const account = accountRaw?.toJSON();
      
      return account;
    } catch (error) {
      return null;
    }
  }

  async getAccount(username: string, auth_id: string): Promise<Account | null> {
    try {
      const account: Account | null = await Account.findOne({ where: { username, auth_id} });
      return account;
    } catch (error) {
      return null;
    }
  }

  async storeUniquetext(text: string, from: string, to: string): Promise<void> {
    try {
      const checkText: boolean = SmsHelper.checkText(text);

      if (checkText) {
        const body: RedisType = {
          key: `STOP:${from}:${to}`,
          value: to,
          hours: 4,
          nx: true,
        }
        await RedisService.setRedisConfig(body);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async checkToPhoneNumber(username: string, auth_id: string, to: string): Promise<boolean> {
    try {
      const account: Account | null = await this.getAccountWithPhoneNumber(username, auth_id);

      if(!account) {
        return false;
      }
      

      const phoneNumbers: PhoneNumber[] | undefined = account.phoneNumbers;

      if (!phoneNumbers) {
        return false;
      }

      const containsFrom: PhoneNumber | undefined = phoneNumbers.find((x: PhoneNumber) => {
        return x.number === to;
      });

      if (!containsFrom) {
        return false;
      }

      return true;

    } catch (error) {
      return false;
    }
  }
}

export default new SmsService();
