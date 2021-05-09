
import * as V from "visual-ts";

/**
 * @author Nikola Lukic
 * @class Generator example
 */

class GeneratorsDemo2 {

  public gameName: string = "Demo 1 - Add sprite objects with generator.";
  public version: number = 1.0;
  public playerCategory = 0x0002;
  public staticCategory = 0x0004;
  public starter: V.Starter;
  public localWebcamStream = null;
  public generatorOfCollecions = [];

  constructor(starter: V.Starter) {
    this.starter = starter;
  }

  public attachAppEvents() {
    const root = this;

    window.addEventListener("local-stream-loaded", function (e: CustomEvent) {
      console.log("DETAILS => ", e)
      var videoDom = document.getElementsByTagName("video")[0];
      videoDom.play();
      root.localWebcamStream = e.detail.data.stream
      let spriteOptions = {
        stream: videoDom,
        pos: {
          x: 400,
          y: 300,
        },
        tile: {
          x: 1,
          y: 1,
        },
      };
      root.createMySprite(spriteOptions);
    });

    console.log(" Test acces local webcam 2")
    this.starter.localDevice.getLocalWebcam();

    const newStaticElement: V.Type.worldElement = V.Matter.Bodies.rectangle(
      350 , 100, 500, 100,
      {
        isStatic: true,
        label: "enjoy",
        render: {
          visualComponent: new V.TextComponent("Use webcam stream active in gamePlay.", {
            color: "red",
            size: "20px"
        }),
          sprite: {
            olala: true,
          },
        } as any | Matter.IBodyRenderOptions,
      });
    newStaticElement.collisionFilter.group = -1;
    this.starter.AddNewBodies([newStaticElement] as V.Type.worldElement);

    const newStaticElement2: V.Type.worldElement = V.Matter.Bodies.rectangle(
      350 , 150, 600, 100,
      {
        isStatic: true,
        label: "enjoy",
        render: {
          visualComponent: new V.TextComponent("Example for TextureStreamComponent", {
            color: "orange",
            size: "20px"
        }),
          sprite: {
            olala: true,
          },
        } as any | Matter.IBodyRenderOptions,
      });
    newStaticElement2.collisionFilter.group = -1;
    this.starter.AddNewBodies([newStaticElement2] as V.Type.worldElement);

    root.addGround();

    V.Matter.Events.on(
      this.starter.getEngine(),
      "beforeUpdate",
      function (event) {
        root.generatorOfCollecions.forEach((element) => {
          element.counter.getValue();
        });

      }
    );

  }

  public addGround() {

       const newStaticElement: V.Type.worldElement = V.Matter.Bodies.rectangle(
         400, 750, 1000, 90,
        {
          isStatic: true,
          isSleeping: false,
          label: "ground",
          collisionFilter: {
            group: this.staticCategory,
          } as any,
          render: {
            visualComponent: new V.TextureComponent("imgGround", [require("../imgs/backgrounds/wall3.png").default]),
            sprite: {
              olala: true,
            },
          } as any | Matter.IBodyRenderOptions,
        });

       (newStaticElement.render as any).visualComponent.setVerticalTiles(4);
       // setHorizontalTiles(1);
       this.starter.AddNewBodies([newStaticElement] as V.Type.worldElement);

       const newStaticElementLeft: V.Type.worldElement = V.Matter.Bodies.rectangle(
         -50, 400, 50, 600,
        {
          isStatic: true,
          isSleeping: false,
          label: "groundLeft",
          collisionFilter: {
            group: this.staticCategory,
          } as any,
          render: {
            visualComponent: new V.TextureComponent("imgGround", [require("../imgs/backgrounds/wall3.png").default]),
            sprite: {
              olala: true,
            },
          } as any | Matter.IBodyRenderOptions,
        });

       (newStaticElementLeft.render as any).visualComponent.setVerticalTiles(1)
        .setHorizontalTiles(10);
        
       this.starter.AddNewBodies([newStaticElementLeft] as V.Type.worldElement);

       const newStaticElementRight: V.Type.worldElement = V.Matter.Bodies.rectangle(
        850, 400, 50, 600,
       {
         isStatic: true,
         isSleeping: false,
         label: "groundLeft",
         collisionFilter: {
           group: this.staticCategory,
         } as any,
         render: {
           visualComponent: new V.TextureComponent("imgGround", [require("../imgs/backgrounds/wall3.png").default]),
           sprite: {
             olala: true,
           },
         } as any | Matter.IBodyRenderOptions,
       });

      (newStaticElementRight.render as any).visualComponent.setVerticalTiles(1)
       .setHorizontalTiles(8);
       
      this.starter.AddNewBodies([newStaticElementRight] as V.Type.worldElement);

  }

  /**
   * @description How to create sprite
   * with different options
   */
  public createMySprite(spriteOptions: any) {

    const playerRadius = 50;
    // tslint:disable-next-line:prefer-const
    let newParamsElement = {
      x: spriteOptions.pos.x,
      y: spriteOptions.pos.y,
      w: 50,
      h: 50,
      playerRadius: playerRadius,
      arg2: {
        label: "mySprite",
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
          visualComponent: new V.TextureStreamComponent(
            "explosion",
            [require("../imgs/explosion/explosion.png").default,
             require("../imgs/explosion/explosion.png").default],
            spriteOptions.stream,
          ),
          fillStyle: "blue",
          sprite: {
            xScale: 1,
            yScale: 1,
          },
        }
    }};

    console.info("My generated sprite body created from 'dead'.");
    this.generatorOfCollecions.push(new V.Generator({
      genType: "rect",
      emit: [
        { force: { x: 0.01 , y: -0.001 }},
        { force: { x: -0.01 , y: -0.001 }},
      ],
      delayForce: [
        { delta: 20, force: { x: 0.01 , y: 0.0 }},
        { delta: 20, force: { x: -0.01 , y: 0.0 }},
      ],
      counter: new V.NMath.Counter(0, 1, 1, "REPEAT"),
      newParamsElement: newParamsElement,
      starter: this.starter,
      destroyAfter: 3000
    }));

  }

  protected destroyGamePlay() {
    this.starter.destroyGamePlay();
    this.starter.deattachMatterEvents();
  }

}
export default GeneratorsDemo2;
