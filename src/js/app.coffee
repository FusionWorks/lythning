define [
  "Marionette"
  "Backbone"
  "Validation"
  "Radio"
  "router"
  "views/layout"
  "views/application/header"
  "views/application/footer"
], (
  Marionette
  Backbone
  Validation
  Radio
  Router
  LayoutView
  HeaderView
  FooterView
) ->

  _.extend Backbone.Model.prototype, Backbone.Validation.mixin

  Marionette.Renderer.render = (template, data) ->
    if _.isFunction template
      template data
    else if template isnt false
      throw new Error "[Marionette Renderer]: Invalid template method"

  class App extends Marionette.Application

    onStart: ->
      @router = new Router
      Radio.channel("app").reply
        router: @router
      @render()
      Backbone.history.start pushState: true

    render: ->
      @layout = new LayoutView
      @layout.render()

      @layout.header.show new HeaderView
      @layout.footer.show new FooterView
