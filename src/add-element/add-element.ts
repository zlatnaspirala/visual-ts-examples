/**
 * Import global css
 */
// import STYLE from "../../styles.css");
// require("./../../../style/animations.css");
// import AppIcon from "../../../app-icon";

import * as V from "visual-ts"
import ClientConfig from "./client-config";
import Demo1 from "./myGame";

/**
 * plarformerGameInfo
 * This is strong connection.
 * html-components are on the same level with app.ts
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
// const appIcon: AppIcon = new AppIcon(master.get.Browser);
master.singlton(Demo1, master.get.Starter);
console.log("Starter : ", master.get.Demo1);

master.get.Demo1.attachAppEvents();

/**
 * Make it global for fast access in console testing.
 * (window as any).platformer = master.get.GamePlay;
 */
(window as any).master = master;
(window as any).demo1 = master.get.Demo1;
