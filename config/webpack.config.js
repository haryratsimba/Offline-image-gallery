// Use the following VueJS Webpack boilerplate : https://github.com/dushyant89/vue-webpack

const path = require('path')
const webpack = require('webpack')

const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * `..` Since this config file is in the config folder so we need
 * to resolve path in the top level folder.
 */
const resolve = relativePath => path.resolve(__dirname, '..', relativePath)

module.exports = {
  mode: 'development',
  entry: {
    // Since we need to load vue in the entry page.
    vue: 'vue',
    // This is where the `main-content` component is
    index: resolve('src/index.js')
  },
  output: {
    filename: '[name].js',
    // Folder where the output of webpack's result go.
    path: resolve('dist')
  },
  module: {
    rules: [
      // eslint loader. Lint .js and .vue files
      // Make sure rules are defined in a .eslintrc file
      // https://www.robinwieruch.de/react-eslint-webpack-babel/#eslint
      {
        test: /\.(js|vue)$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          emitWarning: true
        }
      },
      {
        // vue-loader config to load `.vue` files or single file components.
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // https://vue-loader.vuejs.org/guide/scoped-css.html#mixing-local-and-global-styles
            css: ['vue-style-loader', {
              loader: 'css-loader'
            }],
            js: [
              'babel-loader'
            ]
          },
          cacheBusting: true
        }
      },
      {
        // This is required for other javascript you are gonna write besides vue.
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      }
    ]
  },
  devtool: 'eval',
  devServer: {
    // The url you want the webpack-dev-server to use for serving files.
    host: '0.0.0.0',
    port: 8010,
    // gzip compression
    compress: true,
    // Open the browser window, set to false if you are in a headless browser environment.
    open: false,
    watchOptions: {
      ignored: /node_modules/,
      poll: true
    },
    // Path webpack-dev-server will use for serving files
    // publicPath: '/dist/',
    // For static assets
    contentBase: resolve('src/assets'),
    // Reload for code changes to static assets.
    watchContentBase: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // Exchanges, adds, or removes modules while an application is running, without a full reload.
    new webpack.HotModuleReplacementPlugin(),
    // Starting vue-loader version 15
    new VueLoaderPlugin(),
    // Static files are served into the dist/ folder.
    // Automatically build the index.html, using the provided template and by injecting the bundled JS. Then, output the file into dist/
    // https://medium.com/a-beginners-guide-for-webpack-2/index-html-using-html-webpack-plugin-85eabdb73474
    new HtmlWebpackPlugin({
      title: 'Offline image gallery',
      template: './index.html',
      filename: 'index.html'
    })
  ],
  resolve: {
    /**
         * The compiler-included build of vue which allows to use vue templates
         * without pre-compiling them
         */
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.vue', '.js', '.json']
  },
  // webpack outputs performance related stuff in the browser.
  performance: {
    hints: false
  }
}
