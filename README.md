# LevelCredit - ReactJS Component

<a href="https://www.npmjs.com/package/@levelcredit/js-react-levelcredit"><img src="https://img.shields.io/npm/v/@levelcredit/js-react-levelcredit" alt="npm version"></a>

This ReactJS component will allow a partner to display the TransUnion Vantage 2.0 Credit Score from LevelCredit with the user's browser while maintaining security and compliance with TransUnion's policies. 
Example of what this will return:

<img src="https://files.readme.io/7c5c66b-ScoreComponent.png" alt="Credit Score Component Example" width="300"/>

* [GitHub Repositories](#github-repositories)
* [Getting Started](#getting-started)
    * [Example](#example)
* [Dependencies](#dependencies)
    * [Dependency when using watch](#dependency-when-using-watch)
* [API](#api)
    * [`<LevelCreditProvider />`](#levelcreditprovider-)
    * [CreditAPI](#credit-api)
        * [Score components](src/CreditAPI/score/README.md)
        * [Insight components](src/CreditAPI/insights/README.md)
    * [ObligationAPI](#obligationapi)
        * [`<TradelineHistory />`](#tradelinehistory-)
        
## GitHub Repositories
* [Component Library](https://github.com/levelcredit/js-react-levelcredit)
* [Sample Project](https://github.com/levelcredit/js-app-component-demo)

## Getting Started

Install as dependency using `npm install` command
```sh
npm install --save @levelcredit/js-react-levelcredit
```

To start using either the components like `<ScoreChart />` or react hook like `useScore()`, you will need to wrap around the part that is being used with a provider (`<LevelCreditProvider />`). The LevelCredit provider will help expose which api endpoint the react library will use. 

### Example
```js
export default function App() {
    const credit_display_token = ...; // Backend to get the display token from CreditAPI

    return (
        <LevelCreditProvider env="production">
            <ScoreDisplay display_token={credit_display_token} />
            <ScoreChart display_token={credit_display_token} />
            <CustomHookComponent />
        </LevelCreditProvider>
    );
}

function CustomHookComponent() {
    const credit_display_token = ...; // Backend to get the display token from CreditAPI
    const [scores] = useScore(credit_display_token);
}
```

## Dependencies
To use this component, there are some required dependencies. The following dependencies are required with their minimum supported versions written next to it:  
`react@16.8.0`, `react-dom@16.8.0`, `recharts@2.0.9`, `moment@2.29.0`

## API

### `<LevelCreditProvider />`
```js
import { LevelCreditProvider } from "@levelcredit/js-react-levelcredit";
```

| Props | Type | Default |
|---|---|---|
| env (REQUIRED) | `"development" \| "staging" \| "production"` | *`NULL`* |
| api_url | `string` | *`NULL`* |
| auth_token | `string` | *`NULL`* |
| auth_type | [`APIAuthType`](https://github.com/levelcredit/js-lib-api/blob/main/src/types.ts#L26) | `none` |

When setting `APIAuthType`, please note that we have 2 ways to authenticate through the header. Setting "header" defaults to using "header-authorization"
```yml
# header-authorization
Authorization: Bearer <access_token>

# header-sid
SID: <jwt>
```

### CreditAPI
* [Score components](src/CreditAPI/score/README.md)
* [Insights components](src/CreditAPI/insights/README.md)

### ObligationAPI

#### `<TradelineHistory />`
```js
import { TradelineHistory } from "@levelcredit/js-react-levelcredit";
```

| Props | Type | Default |
|---|---|---|
| obligation | `"contracts" \| "leases" \| "utilities"` | *`NULL`* |
| obligation_id | `number` | *`NULL`* |
| classes | `JSS Classes` | `{}` |

**JSS Classes**
`TradelineHistory`, `TableHead`, `TableColumnHead`, `TableBody`, `TableColumnYear`, `TableColumn`, `POSITIVE_REPORT`, `POSITIVE_LOOKBACK_REPORT`, `POSITIVE_LOOKBACK_AVAILABLE`, `PENDING_REPORT_HOLD`, `PENDING_REPORT`, `NEGATIVE_LATE_30`, `NEGATIVE_LATE_60`, `NEGATIVE_LATE_90`, `NEGATIVE_LATE_120`, `NEGATIVE_LATE_150`, `NEGATIVE_LATE_180`, `NO_PAYMENT`
