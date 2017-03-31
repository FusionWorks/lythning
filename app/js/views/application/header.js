(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(["Marionette", "templates/application/header", "Radio"], function(Marionette, template, Radio) {
    var HeaderView;
    return HeaderView = (function(superClass) {
      extend(HeaderView, superClass);

      function HeaderView() {
        return HeaderView.__super__.constructor.apply(this, arguments);
      }

      HeaderView.prototype.template = template;

      HeaderView.prototype.tagName = "header";

      HeaderView.prototype.className = "main-header";

      return HeaderView;

    })(Marionette.ItemView);
  });

}).call(this);
