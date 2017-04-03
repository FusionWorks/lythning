define [
  "Marionette"
  "Radio"
  "views/steps/welcome"
  "helpers/local_storage"
  "models/user"
  "views/steps/representatives"
  "collections/topics"
  "views/topics/layout"
  "views/topics/list"
  "views/dashboard/index"
], (
  Marionette
  Radio
  WelcomeUserView
  LS
  UserModel
  RepresentativesView
  TopicsCollection
  TopicsLayoutView
  TopicsList
  DashboardView
) ->

  class Router extends Marionette.AppRouter
    routes:
      "": "index"
      "representatives": "representatives"
      "topics": "topics"
      "dashboard": "dashboard"
      "home": -> @redirectToHome()
      "_=_": "redirectToHome"
      "*All": "notFound"

    initialize: ->
      @routesHit = 0
      Backbone.history.on "route", (=> @routesHit++), @

    index: ->
      view = new WelcomeUserView
      Radio.channel("layout").request("regions:container").show view

    representatives: ->
      user = LS.get "user"
      @redirectToHome() unless user

      model = new UserModel user
      representatives = model.getRepresentatives()

      view = new RepresentativesView
        model: model
        representatives: representatives

      Radio.channel("layout").request("regions:container").show view

    topics: ->
      user = LS.get "user"
      model = new UserModel user
      topics = new TopicsCollection
      topics.setCollectionByReps()

      layout = new TopicsLayoutView
        model: model

      Radio.channel("layout").request("regions:container").show layout

      allTopicsView = new TopicsList collection: topics
      layout.listAll.show allTopicsView

      woAnswersTopics = new TopicsCollection topics.getTopicsWoAnswers(model.id)
      woAnswersTopicsView = new TopicsList collection: woAnswersTopics
      layout.listNoAnswer.show woAnswersTopicsView

      interestedTopics = new TopicsCollection topics.getTopicsByAnswers(model.id, [1,2])
      interestedTopicsView = new TopicsList collection: interestedTopics
      layout.listInterested.show interestedTopicsView

      notInterestedTopics = new TopicsCollection topics.getTopicsByAnswers(model.id, 3)
      notInterestedTopicsView = new TopicsList collection: notInterestedTopics
      layout.listNotInterested.show notInterestedTopicsView

    dashboard: ->
      console.log "dashboard"
      view = new DashboardView
      Radio.channel("layout").request("regions:container").show view

    notFound: ->
      console.log "404"

    redirectToHome: ->
      @navigate "", trigger: true

    redirect404: ->
      @navigate "/page-not-found", trigger: true

    back: ->
      if @routesHit > 1
        @routesHit = @routesHit - 2
        window.history.back()
      else
        if Backbone.history.getFragment() isnt "/"
          @routesHit = 0
        @navigate "",
          trigger: true
          replace: true
