
/**
 * @description
 * Using visualTS Game engine from npm service
 * @variation Typescript-Webpack
 * 
 * @example From zero point.
 */

import * as V from "visual-ts"

console.info("===============================");
console.info("V is alias for visualTs => 0.0.1 " , V);
console.info("===============================");

/**
 * Make it global
 */
(window as any).V = V;