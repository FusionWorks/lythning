define [
  "Marionette"
  "Radio"
  "views/topics/item"
  "views/topics/empty"
], (
  Marionette
  Radio
  TopicView
  EmptyTopicsView
) ->

  class TopicsListView extends Marionette.CollectionView
    className: "topics-list-wrap"
    emptyView: EmptyTopicsView
    childView: TopicView