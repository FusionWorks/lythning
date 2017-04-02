define [
  'Backbone'
], (
  Backbone
) ->

  class AppCollection extends Backbone.Collection
    initialize: (models, opts) ->
      @opts = opts