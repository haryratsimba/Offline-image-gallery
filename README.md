# Offline-image-gallery
Image gallery app using Service Workers to provide an offline mode

# Developpement

There are 2 versions of the app :
*   An [ES6](https://github.com/haryratsimba/Offline-image-gallery/tree/es6-version) version (up-to-date)
*   A [TypeScript](https://github.com/haryratsimba/Offline-image-gallery/tree/ts-version) version

This app is built with :
*   [VueJS](https://vuejs.org/),
*   Service Workers,
*   Cache API

Files are bundled with [Webpack](https://webpack.js.org/) and served locally with [webpack-dev-server](https://github.com/webpack/webpack-dev-server).

This app is a demo that is not intended to be deployed in production.

# Run the app

    npm install

    npm run start

# Uses-cases

1. Open Chrome 
2. Run the app
3. Use the "Save categories" button to save the content you want to visualize offline
4. Turn off your network connection
5. Saved categories are available