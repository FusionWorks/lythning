define [
  "Marionette"
  "templates/steps/representatives"
  "Radio"
  "helpers/local_storage"
], (
  Marionette
  template
  Radio
  LS
) ->

  class RepresentativesView extends Marionette.ItemView
    template: template
    className: "representatives"

    ui:
      next: ".js-next"
      checkbox: "input[type='checkbox']"
      message: ".js-message"

    events:
      "click @ui.next": "onNextClick"
      "click @ui.checkbox": "onCheckboxClick"

    templateHelpers: ->
      local: @getOption("representatives").local
      state: @getOption("representatives").state
      national: @getOption("representatives").national

    onRender: ->
      checked = LS.get "selected"
      if null isnt checked
        @checkRepresentatives checked

    onNextClick: (event) ->
      event.preventDefault()
      checked = @getCheckedRepresentatives()
      return @showMessage("Select at least one person") if checked.length is 0

      @ui.next.attr "disabled", true
      LS.set "selected", checked
      setTimeout =>
        Radio.channel("app").request("router").navigate "topics", trigger: true
      , 400

    onCheckboxClick: (event) ->
      @ui.message.html ""

    getCheckedRepresentatives: ->
      checked = @ui.checkbox.filter(":checked").map (index, checkbox) =>
        @$(checkbox).attr("data-id")

      reps = @getOption("representatives")
      reps = _.union reps.local, reps.state, reps.national

      checkedReps = []
      for id in checked
        rep = _.findWhere reps, id: parseInt(id)
        checkedReps.push rep

      checkedReps

    showMessage: (message) ->
      @ui.message.html message
      @shakeButton()

    shakeButton: ->
      @ui.next.addClass("has-error")
        .delay(1000)
        .queue =>
          @ui.next.removeClass("has-error").dequeue()

    checkRepresentatives: (checked) ->
      checked = checked.map (item) -> item.id
      @ui.checkbox.each (index, checkbox) =>
        @$(checkbox).attr("checked", true) if parseInt(@$(checkbox).attr("data-id")) in checked
