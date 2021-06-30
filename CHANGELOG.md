# Changelog

## v2.0.0

Major version update because there are breaking changes with no backwards compatibility.

* Added new component to show single credit score: `<ScoreDisplay />`
* Removed required dependency for `react-jss`

### BREAKING
* Renamed `ScoreAPIChart` to `ScoreChart`
* Renamed `useScoreAPI` to `useScores`
* Changed how styles are applied to components (i.e. `<ScoreAPIChart />`)
  * Checkout the [demo](https://github.com/levelcredit/js-app-component-demo/blob/master/src/ScoreAPI/ChartDemo.js) to see an example
