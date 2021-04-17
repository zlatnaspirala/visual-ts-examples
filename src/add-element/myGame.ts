
import * as V from "visual-ts";

/**
 * @author Nikola Lukic
 * @class Demo1 tutorial
 * @param Starter
 * @description This is game logic part
 * we stil use class based methodology.
 * About resource we use require
 */
class Demo1 implements V.Interface.IGamePlayModelNoPlayer {

  public gameName: string = "Demo 1 - Add new element";
  public version: number = 1.0;
  public playerCategory = 0x0002;
  public staticCategory = 0x0004;

  public starter: V.Starter;
  public myFirstGamePlayObject: V.Matter.Body | any = undefined;

  constructor(starter: V.Starter) {
    this.starter = starter;
  }

  public attachAppEvents() {
    const root = this;
    root.createMyElements(true);
    root.addGround();
    console.info("App event");
  }

  public addGround() {
    const newStaticElement: V.Type.worldElement = V.Matter.Bodies.rectangle(
      400,
      550,
      1000,
      90,
      {
        isStatic: true,
        isSleeping: false,
        label: "ground",
        collisionFilter: {
          group: this.staticCategory,
        } as any,
        render: {
          // visualComponent: new TextureComponent("imgGround",[require("./imgs/backgrounds/wall3.png")]),
          sprite: {
            olala: true,
          },
        } as any | Matter.IBodyRenderOptions,
      }
    );

    //  (newStaticElement.render as any).visualComponent.setVerticalTiles(2).
    //    setHorizontalTiles(1);
    this.starter.AddNewBodies([newStaticElement] as V.Type.worldElement);
  }

  public createMyElements(addToScene: boolean) {
    const playerRadius = 50;
    this.myFirstGamePlayObject = V.Matter.Bodies.circle(
      400,
      100,
      playerRadius,
      {
        label: "MYFIRSTOBJECT",
        density: 0.0005,
        friction: 0.01,
        frictionAir: 0.06,
        restitution: 0.3,
        ground: true,
        jumpCD: 0,
        portal: -1,
        collisionFilter: {
          category: this.playerCategory,
        } as any,
        render: {
          fillStyle: "blue",
          sprite: {
            xScale: 1,
            yScale: 1,
          },
        } as any,
      } as Matter.IBodyDefinition
    );
    this.myFirstGamePlayObject.collisionFilter.group = -1;

    // hardcode for now
    this.myFirstGamePlayObject.render.sprite.xScale = 0.2;
    this.myFirstGamePlayObject.render.sprite.yScale = 0.2;

    if (addToScene) {
      this.myFirstGamePlayObject.id = 2;
      this.starter.AddNewBodies(
        this.myFirstGamePlayObject as V.Type.worldElement
      );
      console.info("myFirstGamePlayObject body created from 'dead'.");
    }
  }

  protected destroyGamePlayPlatformer() {
    this.starter.destroyGamePlay();
    this.starter.deattachMatterEvents();
  }
}
export default Demo1;
