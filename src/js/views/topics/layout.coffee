define [
  "Marionette"
  "templates/topics/layout"
  "Radio"
], (
  Marionette
  template
  Radio
) ->

  class TopicsLayoutView extends Marionette.LayoutView
    template: template
    className: "topics-wrap"

    INTERESTED_ANSWERS: [1, 2]
    NOT_INTERESTED_ANSWERS: 3

    regions:
      listAll: ".js-list-all"
      listInterested: ".js-list-interested"
      listNotInterested: ".js-list-notinterested"
      listNoAnswer: ".js-list-noanswer"

    childEvents:
      "update:answer": "onAnswerUpdate"

    initialize: ->
      Radio.channel("topics").reply
        "all": @listAll
        "interested": @listInterested
        "not:interested": @listNotInterested
        "not:aswered": @listNoAnswer
        "user": @model

    onAnswerUpdate: (view, topicId, answerId) ->
      @model.updateUserAnswer topicId, answerId

      unansweredModel = @listNoAnswer.currentView.collection.get(topicId)
      @listNoAnswer.currentView.collection.remove(unansweredModel) if unansweredModel

      topicModel = @listAll.currentView.collection.get(topicId)
      topicViewFromAll = @listAll.currentView.children.findByModel topicModel
      topicViewFromAll.setAnswer answerId

      interestedTopicModel = @listInterested.currentView.collection.get(topicId)
      if interestedTopicModel
        if parseInt(answerId) is @NOT_INTERESTED_ANSWERS
          @listInterested.currentView.collection.remove interestedTopicModel
        else
          topicViewFromInterested = @listInterested.currentView.children.findByModel interestedTopicModel
          topicViewFromInterested.setAnswer answerId
      else
        @listInterested.currentView.collection.add topicModel if parseInt(answerId) in @INTERESTED_ANSWERS

      notInterestedTopicModel = @listNotInterested.currentView.collection.get(topicId)
      if notInterestedTopicModel
        if parseInt(answerId) in @INTERESTED_ANSWERS
          @listNotInterested.currentView.collection.remove notInterestedTopicModel
        else
          topicViewFromNotInterested = @listNotInterested.currentView.children.findByModel notInterestedTopicModel
          topicViewFromNotInterested.setAnswer answerId
      else
        @listNotInterested.currentView.collection.add topicModel if parseInt(answerId) is @NOT_INTERESTED_ANSWERS
