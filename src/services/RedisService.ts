import client from "../config/redis";
import { RedisType } from "../types/RedisType";

class RedisService {
  
  public async setRedisConfig(body: RedisType) {
		try {
      /**
       * @param body.key is the from number
       * @param body.value is from:to concatinated
       */

      const options: any = {
        EX: body.hours*60*60, // 4 hours
        NX: body.nx // create if it doesn't exist
      }

			await client.set(body.key, body.value, {
        ...options,
      });
			return true
		} catch (error) {
			return false
		}
	}

  public async getRedisConfig(key: string): Promise<string> {
		try {
			const data: string | null = await client.get(key);
			return data || "";
		} catch (error) {
			console.log(error);
			return "";
		}
	}
}

export default new RedisService();
