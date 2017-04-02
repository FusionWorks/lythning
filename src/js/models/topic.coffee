define [
  "models/_base_model"
], (
  AppModel
) ->

  class TopicModel extends AppModel

    getRepsById: ->
      reps = []
      for repId in @get("representativeIds")
        rep = @collection.getRepById(repId)
        reps.push rep if rep.length isnt 0
      reps