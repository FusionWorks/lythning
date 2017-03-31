define [
  "Marionette"
  "Radio"
  "views/steps/welcome"
  "helpers/local_storage"
  "models/user"
  "views/steps/representatives"
], (
  Marionette
  Radio
  WelcomeUserView
  LS
  UserModel
  RepresentativesView
) ->

  class Router extends Marionette.AppRouter
    routes:
      "": "index"
      "representatives": "representatives"
      "topics": "topics"
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
      console.log "TOPICS"

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
