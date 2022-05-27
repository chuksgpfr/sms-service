export default interface ISmsHelper {
  checkText(text: string): boolean;
  isStop(to: string, from: string): Promise<boolean>;
}