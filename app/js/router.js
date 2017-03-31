(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(["Marionette", "Radio", "views/steps/welcome", "helpers/local_storage", "models/user", "views/steps/representatives"], function(Marionette, Radio, WelcomeUserView, LS, UserModel, RepresentativesView) {
    var Router;
    return Router = (function(superClass) {
      extend(Router, superClass);

      function Router() {
        return Router.__super__.constructor.apply(this, arguments);
      }

      Router.prototype.routes = {
        "": "index",
        "representatives": "representatives",
        "topics": "topics",
        "home": function() {
          return this.redirectToHome();
        },
        "_=_": "redirectToHome",
        "*All": "notFound"
      };

      Router.prototype.initialize = function() {
        this.routesHit = 0;
        return Backbone.history.on("route", ((function(_this) {
          return function() {
            return _this.routesHit++;
          };
        })(this)), this);
      };

      Router.prototype.index = function() {
        var view;
        view = new WelcomeUserView;
        return Radio.channel("layout").request("regions:container").show(view);
      };

      Router.prototype.representatives = function() {
        var model, representatives, user, view;
        user = LS.get("user");
        if (!user) {
          this.redirectToHome();
        }
        model = new UserModel(user);
        representatives = model.getRepresentatives();
        view = new RepresentativesView({
          model: model,
          representatives: representatives
        });
        return Radio.channel("layout").request("regions:container").show(view);
      };

      Router.prototype.topics = function() {
        return console.log("TOPICS");
      };

      Router.prototype.notFound = function() {
        return console.log("404");
      };

      Router.prototype.redirectToHome = function() {
        return this.navigate("", {
          trigger: true
        });
      };

      Router.prototype.redirect404 = function() {
        return this.navigate("/page-not-found", {
          trigger: true
        });
      };

      Router.prototype.back = function() {
        if (this.routesHit > 1) {
          this.routesHit = this.routesHit - 2;
          return window.history.back();
        } else {
          if (Backbone.history.getFragment() !== "/") {
            this.routesHit = 0;
          }
          return this.navigate("", {
            trigger: true,
            replace: true
          });
        }
      };

      return Router;

    })(Marionette.AppRouter);
  });

}).call(this);
