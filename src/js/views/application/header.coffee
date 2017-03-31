define [
  "Marionette"
  "templates/application/header"
  "Radio"
], (
  Marionette
  template
  Radio
) ->

  class HeaderView extends Marionette.ItemView
    template: template
    tagName: "header"
    className: "main-header"
