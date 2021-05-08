
import * as V from "visual-ts";

class GeneratorsDemo3 {

  public gameName: string = "Demo 1 - Add sprite objects with generator.";
  public version: number = 1.0;
  public playerCategory = 0x0002;
  public staticCategory = 0x0004;
  public starter: V.Starter;
  public generatorOfCollecions = [];
  public isStreamLoaded = false;
  public broadcaster;
  private mediaDom = null;

  constructor(starter: V.Starter) {
    this.starter = starter;
    this.broadcaster = starter.ioc.get.Broadcaster;
  }

  private getStream() {
    var myInstance = this;
    window.addEventListener("stream-loaded", function (e: CustomEvent) {
      try {
        let mediaDom = V.System.byId(e.detail.data.streamId);
        mediaDom = mediaDom.getElementsByTagName("video")[0];
        myInstance.mediaDom = mediaDom;
        /**
         * @description
         * Determinate local or not
         */
        if (myInstance.broadcaster.connection.userid === e.detail.data.userId) {
          myInstance.isStreamLoaded = true;
          myInstance.createMySprite({
            pos: {
              x: 400,
              y: 300,
            }
          })
          console.log("Stream added.");
        }
    } catch (err) { console.error("Very bad", err); }
    });
  }

  public attachAppEvents() {
    const root = this;

    this.getStream();
    const newStaticElement: V.Type.worldElement = V.Matter.Bodies.rectangle(
      350 , 400, 300, 100,
      {
        isStatic: true,
        label: "enjoy",
        render: {
          visualComponent: new V.TextComponent("Please allow webcam access.", {
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


    root.addGround();

    V.Matter.Events.on(
      this.starter.getEngine(),
      "beforeUpdate",
      function () {
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

    const playerRadius = 30;
    // tslint:disable-next-line:prefer-const
    let newParamsElement = {
      x: spriteOptions.pos.x,
      y: spriteOptions.pos.y,
      w: 30,
      h: 30,
      playerRadius: playerRadius,
      arg2: {
        label: "mySprite",
        density: 0.0005,
        friction: 0.01,
        frictionAir: 0.01,
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
            require("../imgs/explosion/explosion.png").default,
            this.mediaDom
          ),
          fillStyle: "blue",
          sprite: {
            xScale: 1,
            yScale: 1,
          },
        }
    }};

    console.info("My generated sprite body created from 'dead.");
    this.generatorOfCollecions.push(new V.Generator({
      genType: "rect",
      emit: [
        { force: { x: 0.02 , y: -0.008 }, initDelay: 200 },
        { force: { x: -0.02 , y: -0.008 }, initDelay: 400 },
        { force: { x: 0.02 , y: -0.02 }, initDelay: 600 },
        { force: { x: -0.02 , y: -0.02 }, initDelay: 800 },
      ],
      delayForce: [
        { delta: 1000, force: { x: -0.03 , y: 0.0 }},
        { delta: 1000, force: { x: 0.03 , y: 0.0 }},
      ],
      counter: new V.NMath.Counter(0, 1, 1, "REPEAT"),
      newParamsElement: newParamsElement,
      starter: this.starter,
      destroyAfter: 31000
    }));

    // this.generatorOfCollecions[this.generatorOfCollecions.length - 1].counter.setDelay(1);
  }

  protected destroyGamePlay() {
    this.starter.destroyGamePlay();
    this.starter.deattachMatterEvents();
  }

}
export default GeneratorsDemo3;
