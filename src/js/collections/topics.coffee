define [
  "collections/_base_collection"
  "models/topic"
  "data/questions"
  "helpers/local_storage"
], (
  AppCollection
  TopicModel
  QUESTIONS
  LS
) ->

  class TopicsCollection extends AppCollection
    model: TopicModel

    setCollectionByReps: ->
      reps = @getReps().map (rep) -> rep.id
      topics = QUESTIONS.filter (question) ->
        filtered = _.intersection question.representativeIds, reps
        !_.isEmpty filtered

      @add topics

    getReps: ->
      LS.get "selected"

    getRepById: (id) ->
      @getReps().filter (rep) ->
        rep.id is id

    getAnswersByUserId: (userId) ->
      LS.get "answers_#{userId}"

    getTopicsWoAnswers: (userId) ->
      userAnswers = @getAnswersByUserId userId
      if null isnt userAnswers
        userAnswersIds = userAnswers.map (answer) -> parseInt answer.questionId
        filtered = @filter (model) -> model.id not in userAnswersIds
        filtered
      else
        @models

    getTopicAnswersById: (userId, topicId) ->
      userAnswers = @getAnswersByUserId userId
      if null isnt userAnswers
        _.findWhere(userAnswers, questionId: topicId)?.answerId

    getTopicsByAnswers: (userId, answers) ->
      answers = if Array.isArray(answers) then answers else [answers]
      userAnswers = @getAnswersByUserId userId
      if null isnt userAnswers
        userSelectedAnswers = _.filter userAnswers, (answer) -> parseInt(answer.answerId) in answers
        userSelectedAnswersId = userSelectedAnswers.map (answer) -> parseInt answer.questionId
        filtered = @filter (model) -> model.id in userSelectedAnswersId
      else
        []
