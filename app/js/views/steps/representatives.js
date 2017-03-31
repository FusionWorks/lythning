(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(["Marionette", "templates/steps/representatives", "Radio", "helpers/local_storage"], function(Marionette, template, Radio, LS) {
    var RepresentativesView;
    return RepresentativesView = (function(superClass) {
      extend(RepresentativesView, superClass);

      function RepresentativesView() {
        return RepresentativesView.__super__.constructor.apply(this, arguments);
      }

      RepresentativesView.prototype.template = template;

      RepresentativesView.prototype.className = "representatives";

      RepresentativesView.prototype.ui = {
        next: ".js-next",
        checkbox: "input[type='checkbox']",
        message: ".js-message"
      };

      RepresentativesView.prototype.events = {
        "click @ui.next": "onNextClick",
        "click @ui.checkbox": "onCheckboxClick"
      };

      RepresentativesView.prototype.templateHelpers = function() {
        return {
          local: this.getOption("representatives").local,
          state: this.getOption("representatives").state,
          national: this.getOption("representatives").national
        };
      };

      RepresentativesView.prototype.onRender = function() {
        var checked;
        checked = LS.get("selected");
        if (null !== checked) {
          return this.checkRepresentatives(checked);
        }
      };

      RepresentativesView.prototype.onNextClick = function(event) {
        var checked;
        event.preventDefault();
        checked = this.getCheckedRepresentatives();
        if (checked.length === 0) {
          return this.showMessage("Select at least one person");
        }
        this.ui.next.attr("disabled", true);
        LS.set("selected", checked);
        return setTimeout((function(_this) {
          return function() {
            return Radio.channel("app").request("router").navigate("topics", {
              trigger: true
            });
          };
        })(this), 400);
      };

      RepresentativesView.prototype.onCheckboxClick = function(event) {
        return this.ui.message.html("");
      };

      RepresentativesView.prototype.getCheckedRepresentatives = function() {
        var checked, checkedReps, i, id, len, rep, reps;
        checked = this.ui.checkbox.filter(":checked").map((function(_this) {
          return function(index, checkbox) {
            return _this.$(checkbox).attr("data-id");
          };
        })(this));
        reps = this.getOption("representatives");
        reps = _.union(reps.local, reps.state, reps.national);
        checkedReps = [];
        for (i = 0, len = checked.length; i < len; i++) {
          id = checked[i];
          rep = _.findWhere(reps, {
            id: parseInt(id)
          });
          checkedReps.push(rep);
        }
        return checkedReps;
      };

      RepresentativesView.prototype.showMessage = function(message) {
        this.ui.message.html(message);
        return this.shakeButton();
      };

      RepresentativesView.prototype.shakeButton = function() {
        return this.ui.next.addClass("has-error").delay(1000).queue((function(_this) {
          return function() {
            return _this.ui.next.removeClass("has-error").dequeue();
          };
        })(this));
      };

      RepresentativesView.prototype.checkRepresentatives = function(checked) {
        checked = checked.map(function(item) {
          return item.id;
        });
        return this.ui.checkbox.each((function(_this) {
          return function(index, checkbox) {
            var ref;
            if (ref = parseInt(_this.$(checkbox).attr("data-id")), indexOf.call(checked, ref) >= 0) {
              return _this.$(checkbox).attr("checked", true);
            }
          };
        })(this));
      };

      return RepresentativesView;

    })(Marionette.ItemView);
  });

}).call(this);
