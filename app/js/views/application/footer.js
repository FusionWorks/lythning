(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(["Marionette", "templates/application/footer", "Radio"], function(Marionette, template, Radio) {
    var FooterView;
    return FooterView = (function(superClass) {
      extend(FooterView, superClass);

      function FooterView() {
        return FooterView.__super__.constructor.apply(this, arguments);
      }

      FooterView.prototype.template = template;

      FooterView.prototype.tagName = "footer";

      FooterView.prototype.className = "footer";

      return FooterView;

    })(Marionette.ItemView);
  });

}).call(this);
