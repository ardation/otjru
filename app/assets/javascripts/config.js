// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: ["main"],
  paths: {
    // Libraries
    jquery: "/assets/jquery",
    underscore: "/assets/lodash",
    backbone: "/assets/backbone",
    google: "/assets/google",
    ls: "/assets/backbone.localStorage-min",
    transit: "/assets/jquery.transit.min",
    amplify: "/assets/backbone.amplify",
    amplifylib: "/assets/amplify.store",
    json: "/assets/json2",

    // Plugins
    async: "/assets/async",
    use: "/assets/use"
  },

  use: {
    backbone: {
      deps: ["underscore", "jquery"],
      attach: "Backbone"
    },
    ls: {
      deps: ["backbone"]
    },
    transit: {
      deps: ["jquery"]
    },
    amplify: {
      deps: ["amplifylib","json"]
    },
  }
});
