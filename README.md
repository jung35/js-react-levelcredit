# LevelCredit - ReactJS Component
This ReactJS component will allow a partner to display the TransUnion Vantage 2.0 Credit Score from LevelCredit with the user's browser while maintaining security and compliance with TransUnion's policies. 
Example of what this will return:

<img src="https://files.readme.io/7c5c66b-ScoreComponent.png" alt="Credit Score Component Example" width="300"/>

## GitHub Repositories
* [Component Library](https://github.com/levelcredit/js-react-levelcredit)
* [Sample Project](https://github.com/levelcredit/js-app-component-demo)

## Getting Started

Install as dependency using `npm install` command
```sh
npm install --save @levelcredit/js-react-levelcredit
```

To start using either the components like `<ScoreChart />` or react hook like `useScores()`, you will need to wrap around the part that is being used with a provider (`<LevelCreditProvider />`). The LevelCredit provider will help expose which api endpoint the react library will use. 

### Example
```js
export default function App() {
    const insight_display_token = ...; // Backend to get the display token from Credit API for Insights feature
    const score_display_token = ...; // Backend to get the display token from Credit API for Score feature

    return (
        <LevelCreditProvider env="production">
            <ScoreDisplay display_token={score_display_token} />
            <ScoreChart display_token={score_display_token} />
            <CustomHookComponent />
        </LevelCreditProvider>
    );
}

function CustomHookComponent() {
    const score_display_token = ...; // Backend to get the display token from Credit API for Score feature
    const fetchScores = useScoreAPI();

    React.useEffect(function() {
        (async function () {
            const scores = await fetchScores(score_display_token);
            // ...
        }())
    },[])
}
```

## Dependencies
`react@^16.8.0`, `react-dom@^16.8.0`, `recharts@^2.0.9`, `moment@^2.29.0`

### Dependency when using watch
This is to lessen build time during development

Above dependencies, `react-jss@^8.6.1`, `whatwg-fetch@^3.6.2`

## API

### `<LevelCreditProvider />`
```js
import { LevelCreditProvider } from "@levelcredit/js-react-levelcredit";
```

| Props | Type | Default |
|---|---|---|
| env | `"development" \| "sandbox" \| "production"` | *`NULL`* |
| api_url | `string` | *`NULL`* |

### [CreditAPI score components](https://github.com/levelcredit/js-react-levelcredit/src/CreditAPI/score/README.md)
### [CreditAPI insight components](https://github.com/levelcredit/js-react-levelcredit/src/CreditAPI/insights/README.md)
