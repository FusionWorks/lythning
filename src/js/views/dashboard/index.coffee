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
      chartTop: ".js-chart-top"
      chartPolarized: ".js-chart-polarized"

    initialize: ->
      data = CHARTS_DATA.topIssues
      polarizerdProData = _.sortBy data, (item) ->
        sum = item.pro + item.con
        Math.floor(sum / item.pro * 100)

      @topIssues = @prepareData data
      @polarizedPro = @prepareData polarizerdProData

    prepareData: (data) ->
      categories = data.map (item) -> item.topic
      series = @calculateSeries data
      [categories, series]

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
      @ui.chartTop.highcharts
        chart:
          type: "bar"
        title:
          text: "Top Issues"
        xAxis:
          categories: @topIssues[0]
        yAxis:
          min: 0
          title:
            text: "Total Pros and Cons"
        legend:
          reversed: true
        plotOptions:
          series:
            stacking: "percent"
        series: @topIssues[1]

      @ui.chartPolarized.highcharts
        chart:
          type: "bar"
        title:
          text: "Most polarized issues"
        xAxis:
          categories: @polarizedPro[0]
        yAxis:
          min: 0
          title:
            text: "Total Pros and Cons"
        legend:
          reversed: true
        plotOptions:
          series:
            stacking: "percent"
        series: @polarizedPro[1]
