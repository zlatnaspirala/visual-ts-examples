
import { ClientConfig } from "visual-ts";

class AppConfig extends ClientConfig {
 
  constructor(gameList: any) {
    super(gameList)
  }

  // Default is false we need to setup
  public didAppUseAccountsSystem(): boolean {
    return false;
  }

  // Default is false we need to setup
  public getBroadcastAutoConnect(): boolean {
    return true;
  }

  public getDomain() {
    return "maximumroulette.com"
  }

}
export default AppConfig;
