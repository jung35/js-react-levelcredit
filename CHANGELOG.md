# Changelog

## v2.1.0
* Hooks reworked to contain api response data and state of api call
* New Tradeline history component for ObligationAPI
* Introduction of new api library: [@levelcredit/js-lib-api](https://github.com/levelcredit/js-lib-api)

## v2.0.0

Major version update because there are breaking changes with no backwards compatibility.

* Added new component to show single credit score: `<ScoreDisplay />`
* Removed required dependency for `react-jss`
* Added new hook for insights feature: `useInsights()`
* Added new components for insights feature
  * `<AccountSummary />`
  * `<CreditBalance />`
  * `<CreditUtilization />`
  * `<HardInquiry />`
  * `<LoanType />`
  * `<AccountStatus />`

### BREAKING
* Renamed `<ScoreAPIChart />` to `<ScoreChart />`
* Renamed `useScoreAPI()` to `useScore()`
* Changed how styles are applied to components (i.e. `<ScoreChart />`)
  * Checkout the [demo](https://github.com/levelcredit/js-app-component-demo/blob/master/src/CreditAPI/score/ChartDemo.js) to see an example
