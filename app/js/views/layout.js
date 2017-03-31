(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(["Marionette", "Backbone", "Radio"], function(Marionette, Backbone, Radio) {
    var LayoutView;
    return LayoutView = (function(superClass) {
      extend(LayoutView, superClass);

      function LayoutView() {
        this.pushStateClick = bind(this.pushStateClick, this);
        return LayoutView.__super__.constructor.apply(this, arguments);
      }

      LayoutView.prototype.el = "body";

      LayoutView.prototype.template = false;

      LayoutView.prototype.preloaderCounter = 0;

      LayoutView.prototype.regions = {
        header: ".js-header",
        footer: ".js-footer",
        container: ".js-container"
      };

      LayoutView.prototype.initialize = function() {
        return this.$el.on("click", "a", this.pushStateClick);
      };

      LayoutView.prototype.onRender = function() {
        Radio.channel("layout").reply({
          "regions:container": this.container,
          "regions:header": this.header,
          "regions:footer": this.footer
        });
        return this.setTouch();
      };

      LayoutView.prototype.setTouch = function() {
        var isTouch;
        isTouch = typeof window.ontouchstart !== 'undefined';
        if (isTouch) {
          return this.$el.addClass('touchable');
        } else {
          return this.$el.removeClass('touchable');
        }
      };

      LayoutView.prototype.pushStateClick = function(event) {
        var href;
        href = $(event.target)[0].tagName === "A" ? $(event.target).attr("href") : $(event.target).closest("a").attr("href");
        if ($(event.target).attr("rel")) {
          return;
        }
        if (!href) {
          return;
        }
        if (href.charAt(0) === "#") {
          return event.preventDefault();
        }
        this.redirectUrl(href);
        return false;
      };

      LayoutView.prototype.redirectUrl = function(url, opts) {
        if (opts == null) {
          opts = {
            trigger: true
          };
        }
        return Backbone.history.navigate(url, opts);
      };

      return LayoutView;

    })(Marionette.LayoutView);
  });

}).call(this);
