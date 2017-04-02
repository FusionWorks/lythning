define [
  "models/_base_model"
  "data/representatives"
  "helpers/local_storage"
], (
  AppModel
  REPRESENTATIVES
  LS
) ->

  class UserModel extends AppModel

    getRepresentatives: ->
      local: @getLocal()
      state: @getState()
      national: @getNational()

    getLocal: ->
      REPRESENTATIVES.filter (rep) => rep.zip is @get("zip") and rep.level is "local"

    getState: ->
      REPRESENTATIVES.filter (rep) => rep.state is @get("state") and rep.level is "state"

    getNational: ->
      REPRESENTATIVES.filter (rep) => rep.country is @get("country") and rep.level is "national"

    updateUserAnswer: (topicId, answerId) ->
      userAnswers = LS.get "answers_#{@id}"

      if null isnt userAnswers
        oldAnswer = _.findWhere userAnswers, questionId: topicId
        if oldAnswer
          _.each userAnswers, (item, index) ->
            userAnswers[index].answerId = answerId if item.questionId is topicId
        else
          userAnswers.push {
            questionId: topicId
            answerId: answerId
          }
        LS.set "answers_#{@id}", userAnswers

      else
        answer =[{
          questionId: topicId
          answerId: answerId
        }]
        LS.set "answers_#{@id}", answer
