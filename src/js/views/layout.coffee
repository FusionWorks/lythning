define [
  "Marionette"
  "Backbone"
  "Radio"
], (
  Marionette
  Backbone
  Radio
) ->

  class LayoutView extends Marionette.LayoutView
    el: "body"
    template: false
    preloaderCounter: 0

    regions:
      header:     ".js-header"
      footer:     ".js-footer"
      container:  ".js-container"

    initialize: ->
      @$el.on "click", "a", @pushStateClick

    onRender: ->
      Radio.channel("layout").reply
        "regions:container": @container
        "regions:header":    @header
        "regions:footer":    @footer

      @setTouch()

    setTouch: ->
      isTouch = typeof window.ontouchstart != 'undefined'

      if isTouch
        @$el.addClass 'touchable'
      else
        @$el.removeClass 'touchable'

    pushStateClick: (event) =>
      href = if $(event.target)[0].tagName is "A"
        $(event.target).attr("href")
      else
        $(event.target).closest("a").attr("href")

      return if $(event.target).attr("rel")
      return unless href
      return event.preventDefault() if href.charAt(0) == "#"

      @redirectUrl href
      false

    redirectUrl: (url, opts={trigger: true})->
      Backbone.history.navigate(url, opts)
