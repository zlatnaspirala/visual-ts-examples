
import ClientConfig from "../client-config";

/**
 * ClientConfig is config file for whole client part of application.
 * It is a better to not mix with server config staff.
 * All data is defined like default private property values.
 * Use mmethod class to get proper.
 * Class don't have any args passed.
 */
class AppConfig extends ClientConfig {
 
  constructor(gameList: any) {
    super(gameList)

    console.info("Make changes on Application Config.")
  }

  /**
   * @description
   * You can use prop from exstended ClientConfig class
   * @returns string
   */
  public getDrawRefference(): string {
    // Do something...
    console.log("Overrided test... for diametric-fullscreen ")
    // return "diametric-fullscreen"
    return "frame"
    // return this.drawReference;
  }

  /**
   * @description
   * or put any logic...
   * @returns number
   */
  public getConnectorPort() {
    console.log("Overrided test... for connector Port ")
    return 10000;
    // return this.connectorPort;
  }

}
export default AppConfig;
