# Changelog

## v2.1.0-alpha.2
Hooks reworked to contain api response data and state of api call

## v2.1.0-alpha.1
New Tradeline history component for ObligationAPI

## v2.1.0-alpha.0
Introduction of new api library. Temporary private

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
