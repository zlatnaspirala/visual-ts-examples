/**
 * Import global css
 */
require("../../style/styles.css")
// import css from "../../style/styles,css";

// require("./../../../style/animations.css");
// import AppIcon from "../../../app-icon";

import * as V from "visual-ts"
import ClientConfig from "./client-config";
import Demo1 from "./myGame";

/**
 * @description gameInfo
 * This is strong connection.
 * html-components are on the same level with app.ts
 * webpack will handle copying files.
 * Put any parameters here.
 */
const gameInfo = {
  name: "Demo 1",
  title: "Create game with module visual-ts. ",
};

const gamesList: any[] = [
  gameInfo,
];

let injectedConfig: V.Interface.IClientConfig = new ClientConfig(gamesList);
const master = new V.IocSinglePlayerMode(null, injectedConfig);

master.singlton(Demo1, master.get.Starter);
console.info("One time instance creation with master.singlton !");
console.info("The object `master.get.Demo1` is constructed intro ioc controller and represent real instance object Access with => ",
               master.get.Demo1);
console.info("This is good to avoid double instancing / shadows etc. ");
console.info("attachAppEvents is final runner. In this case it is the simple adding two elements to the world (scene).");
master.get.Demo1.attachAppEvents();

/**
 * Make it global for DEV testing - fast access in console for testing only please.
 */
(window as any).master = master;
(window as any).demo1 = master.get.Demo1;
