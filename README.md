# LevelCredit React Component Library

## Repositories
* [Component Library (links to GitHub)](https://github.com/levelcredit/js-react-levelcredit)
* [Sample Project (links to GitHub)](https://github.com/levelcredit/js-app-component-demo)

## Getting Started

Add Github package registry to the project with `@levelcredit` scope in the `.npmrc`. [[Github guide](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#installing-a-package)]
```sh
# .npmrc
registry=https://registry.npmjs.org/ # default npm registry
@levelcredit:registry=https://npm.pkg.github.com
```

Then install as dependency using `npm install` command
```sh
npm install --save @levelcredit/js-react-levelcredit
```

To start using either the components like `<ScoreAPIChart />` or react hook like `useScoreAPI()`, you will need to wrap around the part that is being used with a provider (`<LevelCreditProvider />`). The LevelCredit provider will help expose which api endpoint the react library will use. 

### Example
```js
export default function App() {
    const credit_display_token = ...; // Backend to get the display token for Score API

    return (
        <LevelCreditProvider env="production">
            <ScoreAPIChart display_token={credit_display_token} />
            <CustomHookComponent />
        </LevelCreditProvider>
    );
}

function CustomHookComponent() {
    const credit_display_token = ...; // Backend to get the display token for Score API
    const fetchScores = useScoreAPI();

    React.useEffect(function() {
        (async function () {
            const scores = await fetchScores(credit_display_token);
            // ...
        }())
    },[])
}
```

## Dependencies
`react@^16.8.0`, `react-dom@^16.8.0`, `recharts@^2.0.9`, `moment@^2.29.0`, `react-jss@^8.6.1`

### Dependency when using watch
This is to lessen build time during development

Above dependencies, `whatwg-fetch@^3.6.2`

---
## API

### `<LevelCreditProvider />`
```js
import { LevelCreditProvider } from "@levelcredit/js-react-levelcredit";
```

| Props | Type | Default |
|---|---|---|
| env | `"development" \| "sandbox" \| "production"` | *`NULL`* |
| api_url | `string` | *`NULL`* |

### `<ScoreAPIChart />`

```js
import { ScoreAPIChart } from "@levelcredit/js-react-levelcredit";
```

| Props | Type | Default |
|---|---|---|
| dataParseStyle | `"11-months-past" \| "12-scores"` | `"11-months-past"` |
| XAxisStyles | `Jss.Styles` | `{}` |
| YAxisStyles | `Jss.Styles` | `{}` |
| LineStyles | `Jss.Styles` | `{}` |
| TooltipContentStyles | `Jss.Styles` | `{}` |


### `useScoreAPI()`

```ts
import { useScoreAPI } from "@levelcredit/js-react-levelcredit";

const fetchScores: ScoreAPIFetchScores = useScoreAPI();
```

#### Types
```ts
declare type ScoreAPIFetchScores = (score_display_token: string) => Promise<ScoreAPIScores>;

export declare type ScoreAPIScores = {
    current_score: number;
    change_since_first: number;
    scores: ScoreAPIScoresScores;
    next_update: string;
    messages: Array<ScoreAPIScoresError>;
};
```
