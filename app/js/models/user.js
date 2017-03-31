(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(["models/_base_model", "data/representatives"], function(AppModel, REPRESENTATIVES) {
    var UserModel;
    return UserModel = (function(superClass) {
      extend(UserModel, superClass);

      function UserModel() {
        return UserModel.__super__.constructor.apply(this, arguments);
      }

      UserModel.prototype.getRepresentatives = function() {
        return {
          local: this.getLocal(),
          state: this.getState(),
          national: this.getNational()
        };
      };

      UserModel.prototype.getLocal = function() {
        return REPRESENTATIVES.filter((function(_this) {
          return function(rep) {
            return rep.zip === _this.get("zip") && rep.level === "local";
          };
        })(this));
      };

      UserModel.prototype.getState = function() {
        return REPRESENTATIVES.filter((function(_this) {
          return function(rep) {
            return rep.state === _this.get("state") && rep.level === "state";
          };
        })(this));
      };

      UserModel.prototype.getNational = function() {
        return REPRESENTATIVES.filter((function(_this) {
          return function(rep) {
            return rep.country === _this.get("country") && rep.level === "national";
          };
        })(this));
      };

      return UserModel;

    })(AppModel);
  });

}).call(this);
