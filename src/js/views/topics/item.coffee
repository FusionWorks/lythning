define [
  "Marionette"
  "templates/topics/item"
  "Radio"
], (
  Marionette
  template
  Radio
) ->

  class TopicView extends Marionette.ItemView
    template: template
    className: "topic-item"

    events:
      "click .btn-answer": "onAnswerClick"

    initialize: ->
      # console.log @model.attributes

    templateHelpers: ->
      id: @model.id
      title: @model.get("title")
      description: @model.get("description")
      answers: @model.get("answers")
      reps: @model.getRepsById()[0]

    onRender: ->
      user = Radio.channel("topics").request("user")
      answer = @model.collection.getTopicAnswersById user.id, @model.id
      @setAnswer answer if answer

    onAnswerClick: (event) ->
      event.preventDefault()
      answerId = $(event.target).attr("data-id")

      setTimeout =>
        @triggerMethod "update:answer", @model.id, answerId
      , 400

      @setAnswer answerId

    setAnswer: (answerId) ->
      switch answerId
        when "1" then @positiveAnswer()
        when "2" then @negativeAnswer()
        when "3" then @neutralAnswer()
      @$("[data-id='#{answerId}']").addClass "active"

    positiveAnswer: ->
      @clearAnswer()
      @$el.addClass "green"

    negativeAnswer: ->
      @clearAnswer()
      @$el.addClass "red"

    neutralAnswer: ->
      @clearAnswer()
      @$el.addClass "grey"

    clearAnswer: ->
      @$(".btn-answer").removeClass "active"
      @$el.removeClass "green red grey"
