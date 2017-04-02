define [
  "Marionette"
  "templates/topics/empty"
  "Radio"
], (
  Marionette
  template
  Radio
) ->

  class EmptyTopicsView extends Marionette.ItemView
    template: template
    className: "empty-topics-wrap"
