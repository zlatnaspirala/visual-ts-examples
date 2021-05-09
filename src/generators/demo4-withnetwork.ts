
import * as V from "visual-ts";

/**
 * @author Nikola Lukic
 * @class Sprite Stream Animation from generator tutorial
 * @param Starter
 * @description 
 * Very interest and power full.
 */

class GeneratorsDemo4 {

  public gameName: string = "Add sprite stream objects with generator.";
  public version: number = 1.0;
  public playerCategory = 0x0002;
  public staticCategory = 0x0004;
  public starter: V.Starter;
  public broadcaster;
  public isStreamLoaded = false;
  public generatorOfCollecions = [];
  private mediaDom = null;

  public selectedTileOptions = {
    labelName: "iAmWebcam",
    poster: require("../imgs/players/smart-girl/smart-girl.png"),
    resource: [
      require("../imgs/explosion/flame.png").default,
      require("../imgs/explosion/flame.png").default,
    ],
    type: "sprite",
    spriteTile: {
                run: { byX: 4, byY: 4 },
                idle: { byX: 4, byY: 4 },
                stream: { byX: 1, byY: 1 },
              },
    spriteTileCurrent: "stream",
    setCurrentTile(key: string) {
      this.spriteTileCurrent = key;
  }};

  constructor(starter: V.Starter) {
    this.starter = starter;
    this.broadcaster = starter.ioc.get.Broadcaster;
  }

  private justCheckStream() {
    let mediaDom = document.getElementsByTagName("video")[0]
    this.mediaDom = mediaDom;
    this.isStreamLoaded = true;
          this.createMySprite({
            pos: {
              x: 400,
              y: 300,
            }
          })
    console.log("Stream present.");
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

    const newStaticElement: V.Type.worldElement = V.Matter.Bodies.rectangle(
      350 , 400, 300, 100,
      {
        isStatic: true,
        label: "enjoy",
        render: {
          visualComponent: new V.TextComponent("SpriteStreamComponent.", {
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

    this.getStream();
    this.addGround();

    V.Matter.Events.on(
      this.starter.getEngine(),
      "beforeUpdate",
      function () {
        root.generatorOfCollecions.forEach((element) => {
          element.counter.getValue();
        });
      }
    );

    this.justCheckStream();
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
            visualComponent: new V.SpriteStreamComponent(
              "imgGround2",
              (this.selectedTileOptions.resource as any),
              ({ byX: 6, byY: 6 } as any)),
              sprite: {
                xScale: 1,
                yScale: 1,
              },
          } as any | Matter.IBodyRenderOptions,
        });

       (newStaticElement.render as any).visualComponent.setVerticalTiles(6).
        setHorizontalTiles(2);
       (newStaticElement.render as any).visualComponent.assets.SeqFrame.setNewSeqFrameRegimeType("CONST");
       // (newStaticElement.render as any).render.visualComponent.keepAspectRatio = true;
       
       this.starter.AddNewBodies([newStaticElement] as V.Type.worldElement);
       (window as any).FLOOR = newStaticElement;

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
            visualComponent: new V.TextureComponent("imgGround2", [require("../imgs/backgrounds/wall3.png").default]),
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
      this.starter.AddNewBodies([newStaticElementRight]);

  }

  /**
   * @description How to create sprite
   * with different options
   */
  public createMySprite(spriteOptions: any) {

    V.System.byId("media-rtc3-controls").style.display = "none";
    
    let visualComponent;
    
    if (this.isStreamLoaded === false) {
      visualComponent = new V.SpriteStreamComponent(
        "explosion",
        require("../imgs/explosion/explosion.png").default,
        ({ byX: 1, byY: 1 } as any),
      )
    } else {
      visualComponent = new V.SpriteStreamComponent(
        "explosion",
        [require("../imgs/explosion/explosion.png").default,
         require("../imgs/explosion/explosion.png").default],
        ({ byX: 2, byY: 2 } as any),
        this.mediaDom
      )
      this.selectedTileOptions.setCurrentTile("stream");
      visualComponent.setNewShema(this.selectedTileOptions);
      // visualComponent.seqFrameX.regimeType = "CONST";
      // visualComponent.seqFrameY.regimeType = "CONST";
      visualComponent.seqFrameX.finish = 1;
      visualComponent.seqFrameY.finish = 1;
      // visualComponent.keepAspectRatio = true;
      // visualComponent.setVerticalTiles(2)
      // visualComponent.setHorizontalTiles(2)
      // visualComponent.seqFrameX.setDelay(120);

    }
    

    const playerRadius = 50;
    // tslint:disable-next-line:prefer-const
    let newParamsElement = {
      x: spriteOptions.pos.x,
      y: spriteOptions.pos.y,
      w: 100,
      h: 100,
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
          visualComponent,
          fillStyle: "blue",
          sprite: {
            xScale: 2,
            yScale: 2,
          },
        }
    }};

    
    console.info("My generated sprite body created from 'dead'.  22Test stream");
    this.generatorOfCollecions.push(new V.Generator({
      genType: "rect",
      emit: [
        { force: { x: 0.02 , y: -0.008 }, initDelay: 200 },
      ],
      delayForce: [
        { delta: 1000, force: { x: -0.03 , y: 0.0 }},
      ],
      counter: new V.NMath.Counter(0, 1, 1, "REPEAT"),
      newParamsElement: newParamsElement,
      starter: this.starter,
      destroyAfter: 2000
    }));
    this.generatorOfCollecions[this.generatorOfCollecions.length - 1].counter.setDelay(30);
  }

  protected destroyGamePlay() {
    this.starter.destroyGamePlay();
    this.starter.deattachMatterEvents();
  }

}
export default GeneratorsDemo4;
