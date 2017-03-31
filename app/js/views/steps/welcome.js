(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  define(["Marionette", "templates/steps/welcome", "Radio", "data/voters", "helpers/local_storage", "async!//maps.googleapis.com/maps/api/js?key=AIzaSyDEJxjhLb0t_acXI8IxQYjmDN9dqqL-v6s&language=en"], function(Marionette, template, Radio, VOTERS, LS) {
    var WelcomeUserView;
    return WelcomeUserView = (function(superClass) {
      extend(WelcomeUserView, superClass);

      function WelcomeUserView() {
        return WelcomeUserView.__super__.constructor.apply(this, arguments);
      }

      WelcomeUserView.prototype.template = template;

      WelcomeUserView.prototype.className = "welcome-user";

      WelcomeUserView.prototype.ui = {
        find: ".js-find",
        address: ".js-address",
        name: ".js-name",
        message: ".js-message"
      };

      WelcomeUserView.prototype.events = {
        "keyup @ui.name": "onInputChange",
        "keyup @ui.address": "onInputChange",
        "click @ui.find": "onFindClick"
      };

      WelcomeUserView.prototype.initialize = function() {
        return this.geocoder = new google.maps.Geocoder();
      };

      WelcomeUserView.prototype.onRender = function() {
        var user;
        user = LS.get("user");
        if (null !== user) {
          this.ui.name.val(user.name);
          this.ui.address.val(this.formattedAddress(user));
        }
        return this.ui.address.autocomplete({
          minLength: 5,
          position: {
            at: "left bottom"
          },
          source: (function(_this) {
            return function(request, response) {
              var that;
              that = _this;
              return _this.geocoder.geocode({
                "address": request.term
              }, function(results, status) {
                var source;
                if (results.length > 0 && status === "OK") {
                  source = results.map(function(result) {
                    return result.formatted_address;
                  });
                  return response(source);
                }
              });
            };
          })(this)
        });
      };

      WelcomeUserView.prototype.onFindClick = function(event) {
        var address, name, people, voter;
        event.preventDefault();
        if (!this.isValidForm()) {
          return this.showMessage("All fields are mandatory");
        }
        address = this.ui.address.val();
        name = this.ui.name.val();
        people = VOTERS.filter(function(voter) {
          return voter.name === name;
        });
        if ((people != null ? people.length : void 0) === 0) {
          return this.showMessage("Wrong name");
        }
        voter = this.getVoterByAddress(address, people);
        if (!voter) {
          return this.showMessage("Wrong address");
        }
        this.ui.find.attr("disabled", true);
        LS.set("user", voter);
        return setTimeout((function(_this) {
          return function() {
            return Radio.channel("app").request("router").navigate("representatives", {
              trigger: true
            });
          };
        })(this), 400);
      };

      WelcomeUserView.prototype.getVoterByAddress = function(address, people) {
        return people.find((function(_this) {
          return function(voter) {
            var addressLine;
            addressLine = _this.formattedAddress(voter);
            return address === addressLine;
          };
        })(this));
      };

      WelcomeUserView.prototype.formattedAddress = function(obj) {
        return obj.address + ", " + obj.city + ", " + obj.state + " " + obj.zip + ", " + obj.country;
      };

      WelcomeUserView.prototype.isValidForm = function() {
        var i, input, len, ref, valid;
        valid = true;
        ref = [this.ui.name, this.ui.address];
        for (i = 0, len = ref.length; i < len; i++) {
          input = ref[i];
          if (_.isEmpty(input.val())) {
            input.closest(".form-group").addClass("has-error");
            valid = false;
          }
        }
        return valid;
      };

      WelcomeUserView.prototype.onInputChange = function(event) {
        this.ui.message.html("");
        return $(event.target).closest(".form-group").removeClass("has-error");
      };

      WelcomeUserView.prototype.showMessage = function(message) {
        this.ui.message.html(message);
        return this.shakeButton();
      };

      WelcomeUserView.prototype.shakeButton = function() {
        return this.ui.find.addClass("has-error").delay(1000).queue((function(_this) {
          return function() {
            return _this.ui.find.removeClass("has-error").dequeue();
          };
        })(this));
      };

      return WelcomeUserView;

    })(Marionette.ItemView);
  });

}).call(this);
