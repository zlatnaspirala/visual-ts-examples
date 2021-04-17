
const CopyWebpackPlugin = require('copy-webpack-plugin')

let webPackModule = {
  mode: "development",
  watch: true,
  stats: false,
  entry: ["./src/add-element/add-element.ts"],
  output: {
    filename: "visualts.engine.js",
    path: __dirname + "/build",
  },
  // devtool: "none",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader", options: { allowTsInNodeModules: true } },
      {
        test: /\.(jpg|png)$/, loader: "file-loader", options: {
          name: '[name].[ext]',
          outputPath: "./imgs"
        }
      },
      // { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.(ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '/styles'
          }
        }
      },
       {
         test: /\.(mp4|ogg)$/,
         // include: __dirname + "/src/examples/platformer-single-player/audios",
         loader: 'file-loader',
         options: {
           name: '[name].[ext]',
           outputPath: "/audios"
         }
       },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    // new CleanWebpackPlugin(['build'], { /*exclude:  ['index.html']*/ }),
    new CopyWebpackPlugin({
      patterns: [
      { from: './externals/hack-timer.js', to: 'externals/hack-timer.js'},
      { from: './externals/drag.ts', to: 'externals/drag.ts' },
      { from: './externals/hack-timer-worker.js', to: 'externals/hack-timer-worker.js' },
      { from: './externals/cacheInit.ts', to: 'externals/cacheInit.ts' },
      { from: './externals/worker.js', to: 'worker.js' },
      { from: './externals/offline.html', to: 'offline.html' },
      { from: './externals/adapter.js', to: 'externals/adapter.js' },
      { from: "./src/add-element/ui/player-board.html", to: "templates/player-board.html"},
      { from: "./src/add-element/ui/select-player.html", to: "templates/select-player.html"},
      { from: "./src/add-element/ui/player-board.html", to: "templates/single-player-board.html"},
      { from: "./src/add-element/ui/message-box.html", to: "templates/message-box.html"},

      // { from: './externals/facebook/fb.js', to: 'externals/fb.js' },
      // { from: './src/manifest.web', to: 'manifest.web' },
    ]})
  ],

};

module.exports = webPackModule;
