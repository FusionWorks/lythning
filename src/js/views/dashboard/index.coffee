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
      chartTime: ".js-chart-time"

    initialize: ->
      data = CHARTS_DATA.topIssues
      polarizerdProData = _.sortBy(data, (item) ->
        sum = item.pro + item.con
        pro = Math.floor(sum / item.pro * 100)
        con = Math.floor(sum / item.con * 100)
        if pro >= con then pro else con
      ).reverse()

      @topIssues = @prepareData data
      @polarizedPro = @prepareData polarizerdProData
      @timeData = @prepareTimeData CHARTS_DATA.timeChart

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

    prepareTimeData: (data) ->
      series = []
      for item in data
        seria =
          name: item.topic
          data: @calculatePercent item.pro, item.con
        series.push seria
      series

    calculatePercent: (pro, con) ->
      pro.map (p, index) ->
        onePercent = Math.floor((p + con[index]) / 100)
        Math.floor(p / onePercent)

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

      @ui.chartTime.highcharts
        chart:
          type: "line"
        title:
          text: "Pros for the last year, %"
        xAxis:
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        yAxis:
          title:
            text: "%"
        plotOptions:
          line:
            dataLabels:
              enabled: false
            enableMouseTracking: true
        series: @timeData

