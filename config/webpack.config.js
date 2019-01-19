// Use the following VueJS Webpack boilerplate : https://github.com/dushyant89/vue-webpack

const path = require('path')
const webpack = require('webpack')

const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Use this plugin to integrate the service worker file in the webpack build.
// It also allows to configure Service workers cache with dynamic assets name (Webpack build can generate different files names)
// Then exposes configured options to the Service worker JS file (https://github.com/oliviertassinari/serviceworker-webpack-plugin/blob/master/docs/webpack/baseConfig.js)
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

const CopyWebpackPlugin = require('copy-webpack-plugin')

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
        loader: 'vue-loader'
      },
      {
        // This is required for other javascript you are gonna write besides vue.
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  // Use this option as this is a demo app
  // switch to source-map for production
  devtool: 'eval-source-map',
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
    }),
    new ServiceWorkerWebpackPlugin({
      entry: resolve('src/sw.js')
    }),
    // Static assets, if not imported explicitely with the "import" statement in scripts files, will not be part of the Webpack bundled
    // as it cannot detect dependencies. Use this plugin to copy static assets into the Webpack bundle
    // so it can be referenced (eg : we can link statics files in domain/assets/)
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ])
  ],
  resolve: {
    /**
         * The compiler-included build of vue which allows to use vue templates
         * without pre-compiling them
         */
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // Congigure @ as an alias for root in JS files
      // eg : import x from '@/src'
      '@': resolve('src')
    },
    extensions: ['*', '.vue', '.js', '.json']
  },
  // webpack outputs performance related stuff in the browser.
  performance: {
    hints: false
  }
}
