import ISmsHelper from "../interface/ISmsHelper";
import RedisService from "../services/RedisService";

class SmsHelper implements ISmsHelper {
  async isStop(to: string, from: string): Promise<boolean> {
    try {
      const key: string = `STOP:${from}:${to}`
      const result: string = await RedisService.getRedisConfig(key);
      if (!result) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  checkText(text: string): boolean {
    switch (text) {
      case "STOP":
        return true;

      case "STOP\n":
        return true;

      case "STOP\r":
        return true;

      case "STOP\r\n":
        return true;

      default:
        return false;
    }
  }


}

export default new SmsHelper();
