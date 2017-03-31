(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(["Marionette", "Backbone", "Validation", "Radio", "router", "views/layout", "views/application/header", "views/application/footer"], function(Marionette, Backbone, Validation, Radio, Router, LayoutView, HeaderView, FooterView) {
    var App;
    _.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
    Marionette.Renderer.render = function(template, data) {
      if (_.isFunction(template)) {
        return template(data);
      } else if (template !== false) {
        throw new Error("[Marionette Renderer]: Invalid template method");
      }
    };
    return App = (function(superClass) {
      extend(App, superClass);

      function App() {
        return App.__super__.constructor.apply(this, arguments);
      }

      App.prototype.onStart = function() {
        this.router = new Router;
        Radio.channel("app").reply({
          router: this.router
        });
        this.render();
        return Backbone.history.start({
          pushState: true
        });
      };

      App.prototype.render = function() {
        this.layout = new LayoutView;
        this.layout.render();
        this.layout.header.show(new HeaderView);
        return this.layout.footer.show(new FooterView);
      };

      return App;

    })(Marionette.Application);
  });

}).call(this);
