import { Account } from "../db/models/Account";

export default interface ISms {
  storeUniquetext(text: string, from: string, to: string): Promise<void>,
  checkToPhoneNumber(username: string, auth_id: string, to: string): Promise<boolean>,
  getAccount(username: string, auth_id: string): Promise<Account | null>,
  getAccountWithPhoneNumber(username: string, auth_id: string): Promise<Account | null>,
  checkFromNumberRequest(text: string, from: string, to: string): Promise<{ error: string }>,
}