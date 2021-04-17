# visual-ts-module

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


```ts

```