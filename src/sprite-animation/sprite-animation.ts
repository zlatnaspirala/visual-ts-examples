/**
 * Import global css
 */
require("/style/styles.css");
 

import * as V from "visual-ts";
import DemoSpriteAnimation from "./demo";

/**
 * Put any parameters here.
 */
const gameInfo = {
  name: "Sprite animation Demo",
  title: "Start game play and add new sprite element.",
};

const gamesList: any[] = [
  gameInfo,
];

const master = new V.IocSinglePlayerMode(gamesList);

const appIcons = [
  require("/icon/favicon.ico").default,
  require("/icon/favicon-96x96.png").default,
  require("/icon/android-icon.png").default,
  require("/icon/apple-icon.png").default,
];
const appIcon: V.AppIcon = new V.AppIcon(master.get.Browser, appIcons);

master.singlton(DemoSpriteAnimation, master.get.Starter);
console.log("Starter : ", master.get.DemoSpriteAnimation);

master.get.DemoSpriteAnimation.attachAppEvents();

/**
 * Make it global for fast access in console testing.
 * (window as any).platformer = master.get.GamePlay;
 */
(window as any).master = master;
(window as any).DemoSpriteAnimation = master.get.DemoSpriteAnimation;
