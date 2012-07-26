// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  paths: {
    // JavaScript folders
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    jquery: "../assets/js/libs/jquery",
    underscore: "../assets/js/libs/lodash",
    backbone: "../assets/js/libs/backbone",
    google: "../assets/js/libs/google",
    ls: "../assets/js/libs/backbone.localStorage-min",
    transit: "../assets/js/libs/jquery.transit.min",
    peel: "../assets/js/libs/jquery.peelback",
    amplify: "../assets/js/libs/backbone.amplify",
    amplifylib: "../assets/js/libs/amplify.store",
    json: "../assets/js/libs/json2",
    newrelic: "../assets/js/libs/jquery.newrelic",

    // Plugins
    async: "../assets/js/plugins/async",
    use: "../assets/js/plugins/use"
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
    peel: {
      deps: ["jquery"]
    },
    newrelic: {
      deps: ["jquery"]
    },
    amplify: {
      deps: ["amplifylib","json"]
    },
  }
});
