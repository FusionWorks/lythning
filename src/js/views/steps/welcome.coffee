define [
  "Marionette"
  "templates/steps/welcome"
  "Radio"
  "data/voters"
  "helpers/local_storage"
  "async!//maps.googleapis.com/maps/api/js?key=AIzaSyDEJxjhLb0t_acXI8IxQYjmDN9dqqL-v6s&language=en"
], (
  Marionette
  template
  Radio
  VOTERS
  LS
) ->

  class WelcomeUserView extends Marionette.ItemView
    template: template
    className: "welcome-user"

    ui:
      find: ".js-find"
      address: ".js-address"
      name: ".js-name"
      message: ".js-message"

    events:
      "keyup @ui.name": "onInputChange"
      "keyup @ui.address": "onInputChange"
      "click @ui.find": "onFindClick"

    initialize: ->
      @geocoder = new google.maps.Geocoder()

    onRender: ->
      user = LS.get "user"
      if null isnt user
        @ui.name.val user.name
        @ui.address.val @formattedAddress(user)

      @ui.address.autocomplete
        minLength: 5
        position:
          at: "left bottom"
        source: (request, response) =>
          that = @
          @geocoder.geocode "address": request.term, (results, status) ->
            if results.length > 0 and status is "OK"
              source = results.map (result) -> result.formatted_address
              response(source)

    onFindClick: (event) ->
      event.preventDefault()

      return @showMessage("All fields are mandatory") unless @isValidForm()

      address = @ui.address.val()
      name = @ui.name.val()
      people = VOTERS.filter (voter) -> voter.name is name
      return @showMessage("Wrong name") if people?.length is 0

      voter = @getVoterByAddress address, people
      return @showMessage("Wrong address") unless voter

      @ui.find.attr "disabled", true

      LS.set "user", voter
      setTimeout =>
        Radio.channel("app").request("router").navigate "representatives", trigger: true
      , 400

    getVoterByAddress: (address, people) ->
      people.find (voter) =>
        addressLine = @formattedAddress voter
        address is addressLine

    formattedAddress: (obj) ->
      "#{obj.address}, #{obj.city}, #{obj.state} #{obj.zip}, #{obj.country}"

    isValidForm: ->
      valid = true
      for input in [@ui.name, @ui.address]
        if _.isEmpty input.val()
          input.closest(".form-group").addClass("has-error")
          valid = false
      valid

    onInputChange: (event) ->
      @ui.message.html ""
      $(event.target).closest(".form-group").removeClass("has-error")

    showMessage: (message) ->
      @ui.message.html message
      @shakeButton()

    shakeButton: ->
      @ui.find.addClass("has-error")
        .delay(1000)
        .queue =>
          @ui.find.removeClass("has-error").dequeue()
