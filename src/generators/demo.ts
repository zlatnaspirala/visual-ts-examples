
import * as V from "visual-ts";

/**
 * @author Nikola Lukic
 * @description 
 * Generator class usage examples.
 */

class GeneratorsDemo1 {

  public gameName: string = "Demo 1 - Add sprite objects with generator.";
  public version: number = 1.0;
  public playerCategory = 0x0002;
  public staticCategory = 0x0004;
  public starter: V.Starter;

  public generatorOfCollecions = [];

  constructor(starter: V.Starter) {
    this.starter = starter;
  }

  public attachAppEvents() {
    const root = this;

    let spriteOptions = {
      delay: 1,
      pos: {
        x: 100,
        y: 200,
      },
      tile: {
        x: 1,
        y: 1,
      },
    };
    root.createMySprite(spriteOptions);

    spriteOptions = {
      delay: 10,
      pos: {
        x: 400,
        y: 200,
      },
      tile: {
        x: 1,
        y: 1,
      },
    };
    root.createMySprite(spriteOptions);

    spriteOptions = {
      delay: 30,
      pos: {
        x: 700,
        y: 200,
      },
      tile: {
        x: 5,
        y: 5,
      },
    };
    root.createMySprite(spriteOptions);

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

       const newStaticElement: V.Type.worldElement = V.Matter.Bodies.rectangle(400, 550, 1000, 90,
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
          visualComponent: new V.SpriteTextureComponent(
            "explosion",
            require("../imgs/explosion/explosion.png").default,
            ({ byX: 4, byY: 4 } as any),
          ),
          fillStyle: "blue",
          sprite: {
            xScale: 1,
            yScale: 1,
          },
        }
    }};

    console.info("My generated sprite body created from 'dead'.");
    this.generatorOfCollecions.push( new V.Generator({
      genType: "rect", // V.Type.worldElementType.RECT,
      emit: [1],
      counter: new V.NMath.Counter(0, 10, 1, "REPEAT"),
      newParamsElement: newParamsElement,
      starter: this.starter,
      destroyAfter: 11000,
    }));

    this.generatorOfCollecions[this.generatorOfCollecions.length - 1].counter.setDelay(1);

  }

  protected destroyGamePlay() {
    this.starter.destroyGamePlay();
    this.starter.deattachMatterEvents();
  }

}
export default GeneratorsDemo1;
