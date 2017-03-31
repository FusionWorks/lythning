define [
  "models/_base_model"
  "data/representatives"
], (
  AppModel
  REPRESENTATIVES
) ->

  class UserModel extends AppModel

    getRepresentatives: ->
      local: @getLocal()
      state: @getState()
      national: @getNational()

    getLocal: ->
      REPRESENTATIVES.filter (rep) => rep.zip is @get("zip") and rep.level is "local"

    getState: ->
      REPRESENTATIVES.filter (rep) => rep.state is @get("state") and rep.level is "state"

    getNational: ->
      REPRESENTATIVES.filter (rep) => rep.country is @get("country") and rep.level is "national"