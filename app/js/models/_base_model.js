(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(["Backbone", "NestedModel"], function(Backbone, NestedModel) {
    var AppModel;
    return AppModel = (function(superClass) {
      extend(AppModel, superClass);

      function AppModel() {
        return AppModel.__super__.constructor.apply(this, arguments);
      }

      return AppModel;

    })(Backbone.NestedModel);
  });

}).call(this);
