# visual-ts-example

 - Visual TS Game engine access from node module (npm service) plus examples 
   in different variant.
   First variant is webpack packing, typescript project.

## Installatioin

```
 npm i
```

Used webpack:
```
npm run game
```

First visual-ts-module is abstract with no player.
Just adding ball to the scene.

![visualTSGameEngine-From-Node-Module](https://github.com/zlatnaspirala/visual-ts-module/blob/main/screenshot1.png)


## CodePen demo live links:
https://codepen.io/zlatnaspirala/pen/NWdZJQJ



<pre>

├── package.json
├── package-lock.json
├── webpack.config.js
├── tsconfig.json
├── tslint.json
├── launch.json
├── template.html
├── app-icon.ts
└── app.ts
├── build/  (This is auto generated)
|   ├── externals/
|   ├── templates/
|   ├── imgs/
|   ├── styles/
|   |   └── favicon.ico
|   ├── visualjs2.js
|   ├── app.html
├── src/
|   ├── zero-point/
|   |   ├── index.ts
|   ├── add-element/
|   |   ├── add-element.ts
|   |   ├── client-config.ts
|   |   ├── myGame.ts
|   ├── ui/
|   |   ├── Html files
|   ├── imgs/ 
|   |   ├── IMAGES
├── externals/
|   ├── adapter.js
|   ├── cacheInit.ts
|   ├── drag.ts
|   ├── fb.js
|   ├── hack-timer.js
|   ├── hack-timer-worker.js

</pre>


### Here is the basic usage:
```ts

class AppConfig extends V.ClientConfig {

  constructor(gameList: any) {
    super(gameList);
    console.info("Make changes on Application Config.");
  }

  /**
   * @description
   * You can use prop from exstended ClientConfig class
   * @name getDrawRefference
   * @returns string
   */
  public getDrawRefference(): string {
    // Do something...
    console.log("Setup draw type")
    // return "diametric-fullscreen"
    // return this.drawReference;
    return "frame"
  }
}

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
    console.info("App event test");
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
    this.myFirstGamePlayObject.render.sprite.xScale = 0.2;
    this.myFirstGamePlayObject.render.sprite.yScale = 0.2;

    if (addToScene) {
      this.myFirstGamePlayObject.id = 2;
      this.starter.AddNewBodies(
        this.myFirstGamePlayObject as V.Type.worldElement
      );
    }
  }

  protected destroyGamePlayPlatformer() {
    this.starter.destroyGamePlay();
    this.starter.deattachMatterEvents();
  }
}

// Make instance - Run app

const gameInfo = {
  name: "Demo",
  title: "Create game with module visual-ts.",
};

const gamesList: any[] = [
  gameInfo,
];

let injectedConfig: V.Interface.IClientConfig = new AppConfig(gamesList);
const master = new V.IocSinglePlayerMode(null, injectedConfig);

master.singlton(Demo1, master.get.Starter);
master.get.Demo1.attachAppEvents();

```