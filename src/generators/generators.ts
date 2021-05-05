/**
 * Import global css
 */
require("/style/styles.css");
 

import * as V from "visual-ts";
import GeneratorsDemos from "./demo";
import GeneratorsDemo2 from "./demo2";

/**
 * Put any parameters here.
 */
const gameInfo = {
  name: "Generator class test demos",
  title: "Generators of world element.",
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


master.singlton(GeneratorsDemos, master.get.Starter);
master.get.GeneratorsDemos.attachAppEvents();
console.log("Starter : ", master.get.GeneratorsDemos);


/**
 * Make it global for fast access in console testing.
 * (window as any).platformer = master.get.GamePlay;
 */
(window as any).master = master;
(window as any).generatorsDemos = master.get.GeneratorsDemos;

var CURENT_SCENE = 0;

window.addEventListener("click", function(event) {

  if (CURENT_SCENE === 0) {
    CURENT_SCENE = 1;
    master.get.GeneratorsDemos.destroyGamePlay()
    master.singlton(GeneratorsDemo2, master.get.Starter);
    master.get.GeneratorsDemo2.attachAppEvents();
  }

});
