define [
  "Marionette"
  "templates/application/footer"
  "Radio"
], (
  Marionette
  template
  Radio
) ->

  class FooterView extends Marionette.ItemView
    template: template
    tagName: "footer"
    className: "footer"
