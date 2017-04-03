define [
  "Marionette"
  "Radio"
  "Highcharts"
  "templates/dashboard/index"
  "data/charts_data"
], (
  Marionette
  Radio
  Highcharts
  template
  CHARTS_DATA
) ->

  class DashboardView extends Marionette.ItemView
    className: "dashboard-wrap"
    template: template

    ui:
      chart: ".js-chart"

    initialize: ->
      data = CHARTS_DATA.topIssues
      @categories = data.map (item) -> item.topic
      @series = @calculateSeries data

    calculateSeries: (data) ->
      pros = _.pluck data, "pro"
      cons = _.pluck data, "con"
      [{
        name: "Con"
        data: cons
        color: "#da0028"
      },{
        name: "Pro"
        data: pros
        color: "#44ab06"
      }]

    onShow: ->
      @ui.chart.highcharts
        chart:
          type: "bar"
        title:
          text: "Top Issues"
        xAxis:
          categories: @categories
        yAxis:
          min: 0
          title:
            text: "Total Pros and Cons"
        legend:
          reversed: true
        plotOptions:
          series:
            stacking: "percent"
        series: @series
