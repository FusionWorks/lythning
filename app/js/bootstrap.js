(function() {
  require.config({
    baseUrl: "/js",
    wrapShim: true,
    shim: {
      "Bootstrap": {
        "deps": ["jquery"]
      },
      "Growl": {
        "deps": ["jquery"]
      }
    },
    paths: {
      "jquery": "https://code.jquery.com/jquery-2.2.4.min",
      "jquery-ui": "https://code.jquery.com/ui/1.12.1/jquery-ui.min",
      "jqueryui-touch-punch": "../lib/jquery-ui-touch-punch-improved/jquery.ui.touch-punch-improved",
      "Bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min",
      "Marionette": "../lib/backbone.marionette/lib/backbone.marionette.min",
      "Backbone": "../lib/backbone/backbone-min",
      "NestedModel": "../lib/backbone-nested-model/backbone-nested",
      "underscore": "../lib/underscore/underscore-min",
      "Radio": "../lib/backbone.radio/build/backbone.radio.min",
      "Radio.shim": "radio.shim",
      "Stickit": "../lib/backbone.stickit/backbone.stickit",
      "Validation": "../lib/backbone.validation/dist/backbone-validation-amd-min",
      "Growl": "../lib/growl/javascripts/jquery.growl",
      "async": "../lib/requirejs-plugins/src/async"
    },
    map: {
      "*": {
        "backbone": "Backbone",
        "backbone.wreqr": "Radio",
        "backbone.marionette": "Marionette",
        "backbone.radio": "Radio",
        "jquery.ui": "jquery-ui"
      }
    }
  });

  require(['jquery', 'jquery-ui', 'Bootstrap', 'app', 'Radio.shim', 'Stickit', "jqueryui-touch-punch"], function($, jqueryui, Bootstrap, App, RadioShim, Stickit, jqueryuiTouchPunch) {
    window.Lyhtning = new App;
    return Lyhtning.start();
  });

}).call(this);
