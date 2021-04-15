
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

let internalConfig = {
  createDocumentation: false,
  stats: "errors-warnings"
};

/*
let documentationPlugin = new TypedocWebpackPlugin({
  out: './api-doc',
  module: 'amd',
  target: 'es5',
  exclude: '/node_modules',
  experimentalDecorators: true,
  excludeExternals: true,
  name: 'sn-theme',
  mode: 'file',
  theme: './sn-theme/',
  includeDeclarations: false,
  ignoreCompilerErrors: true,
}); */

let webPackModule = {
  mode: "development",
  watch: true,
  stats: internalConfig.stats,
  entry: ["./src/index.ts"],
  output: {
    filename: "visualts.engine.js",
    path: __dirname + "/build",
  },

  // devtool: "inline-",

  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader", options: { allowTsInNodeModules: true }, exclude: [/node_modules/] },
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
    // Make sure that the plugin is after any plugins that add images
    // new CleanWebpackPlugin(['build'], { /*exclude:  ['index.html']*/ }),
  ],
  /*
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30,
      maxSize: 240000,
      minChunks: 4,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 3,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
  */

};

if (internalConfig.createDocumentation == true) {
  webPackModule.plugins.push(documentationPlugin);
}

module.exports = webPackModule;
