/**
 * Import global css
 */
require("/style/styles.css");
 

import * as V from "visual-ts";
import AppConfig from "./app-config";
import GeneratorsDemo1 from "./demo";
import GeneratorsDemo2 from "./demo2";
import GeneratorsDemo3 from "./demo3";
import GeneratorsDemo4 from "./demo4";

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

var master: V.IocMultiPlayerMode | V.IocSinglePlayerMode = new V.IocSinglePlayerMode(gamesList);

const appIcons = [
  require("/icon/favicon.ico").default,
  require("/icon/favicon-96x96.png").default,
  require("/icon/android-icon.png").default,
  require("/icon/apple-icon.png").default,
];
const appIcon: V.AppIcon = new V.AppIcon(master.get.Browser, appIcons);

master.singlton(GeneratorsDemo1, master.get.Starter);
master.get.GeneratorsDemo1.attachAppEvents();
console.log("Starter : ", master.get.GeneratorsDemo1);

/**
 * Make it global for fast access in console testing.
 * (window as any).platformer = master.get.GamePlay;
 */
(window as any).master = master;
(window as any).GeneratorsDemo1 = master.get.GeneratorsDemo1;


var CURENT_SCENE = 0;
let masterNet = null;

window.addEventListener("click", function(event) {

  if (CURENT_SCENE === 0) {
    CURENT_SCENE++;

    master.get.GeneratorsDemo1.destroyGamePlay()

    master.singlton(GeneratorsDemo2, master.get.Starter);
    master.get.GeneratorsDemo2.attachAppEvents();
  } else if (CURENT_SCENE === 1) {
    CURENT_SCENE++;
    master.get.GeneratorsDemo2.destroyGamePlay()
    master.singlton(GeneratorsDemo3, master.get.Starter);
    master.get.GeneratorsDemo3.attachAppEvents();

  } else if (CURENT_SCENE === 2) {

    CURENT_SCENE++;

     /**
     * @description
     * Destroy world elements and 
     * Create new master `masterNet` with multiPlayer add on.
     * We need to hide canvas dom element of master program.
     */
    master.get.GeneratorsDemo3.destroyGamePlay()
    master.singlton(GeneratorsDemo4, master.get.Starter);
    master.get.GeneratorsDemo4.attachAppEvents();
    // CURENT_SCENE = 0;

  } 
  else if (CURENT_SCENE === 4) {
    /*
      CURENT_SCENE++;
     /**
     * @description
     * Destroy world elements and 
     * Create new master `masterNet` with multiPlayer add on.
     * We need to hide canvas dom element of master program.
    master.get.GeneratorsDemo3.destroyGamePlay()
    master.get.ViewPort.canvasDom.style.display = 'none';
    let injectedConfig = new AppConfig(gamesList);
    masterNet = new V.IocMultiPlayerMode(null, injectedConfig);
    (window as any).masterNet = masterNet;
    // masterNet.get.GeneratorsDemo3.broadcaster.connection.close()
    masterNet.singlton(GeneratorsDemo4, masterNet.get.Starter);
    masterNet.get.GeneratorsDemo4.attachAppEvents();
    // CURENT_SCENE = 0;  */

  } else {
    CURENT_SCENE++;
  }

});
