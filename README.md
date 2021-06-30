# LevelCredit - ReactJS Component
This ReactJS component will allow a partner to display the TransUnion Vantage 2.0 Credit Score from LevelCredit with the user's browser while maintaining security and compliance with TransUnion's policies. 
Example of what this will return:

<img src="https://files.readme.io/7c5c66b-ScoreComponent.png" alt="Credit Score Component Example" width="300"/>

## GitHub Repositories
* [Component Library](https://github.com/levelcredit/js-react-levelcredit)
* [Sample Project](https://github.com/levelcredit/js-app-component-demo)

## Getting Started

Add Github package registry to the project with `@levelcredit` scope in the `.npmrc` [[Github guide](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#installing-a-package)]
```sh
# .npmrc
registry=https://registry.npmjs.org/ # default npm registry
@levelcredit:registry=https://npm.pkg.github.com
```

Then install as dependency using `npm install` command
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
---
### `<ScoreDisplay />`

```js
import { ScoreDisplay } from "@levelcredit/js-react-levelcredit";
```

Display user's current score and how much it's changed since last score update.

#### Props
| Props | Type | Default |
|---|---|---|
| display_token | `ScoreDisplayToken (string)` | `""` |
| dataDisplayStyle | `"simple" \| "donut"` | `"simple"` |
| classes | `JSS Classes` | `{}` |

#### JSS Classes
dataDisplayStyle `simple`: `SimpleScoreDisplay`, `SimpleScoreData`, `SimpleScoreNumber`, `SimpleScoreText`, `SimpleScoreDifference`, `SimpleScoreProvided`

dataDisplayStyle `donut`: `CircularScoreDisplay`, `CircularScoreInformation`, `CircularScoreDifference`, `CircularScoreNumber`, `CircularScoreText`, `CircularScoreUpdated`, `CircularScoreProvided`, `CircularScoreMinMax`

---
### `<ScoreChart />`

```js
import { ScoreChart } from "@levelcredit/js-react-levelcredit";
```

Creates chart using `recharts` displaying user's credit score history.

#### Props
| Props | Type | Default |
|---|---|---|
| display_token | `ScoreDisplayToken (string)` | `""` |
| dataParseStyle | `"11-months-past" \| "12-scores"` | `"11-months-past"` |
| classes | `JSS Classes` | `{}` |

#### JSS Classes
`XAxisStyles`, `YAxisStyles`, `LineStyles`, `TooltipContentStyles`

---
### `useScores()`
#### Returns

* `FetchUserScores`: A promise function ready to be used to return scores object with a valid display token created for scores feature.

#### Example
```ts
import { useScores } from "@levelcredit/js-react-levelcredit";

function ReactComponent() {
    const fetchScores: FetchUserScores = useScores();
    const display_token = ...;
    const [scores, setScores] = useState<ScoresObj | null>(null);

    useEffect(
        function () {
            (async function () {
                const scores = await fetchScores(display_token);

                setScores(scores);
            })();
        },
        [fetchScores, display_token]
    );
}
```

#### Types
```ts
type FetchUserScores = (score_display_token: ScoreDisplayToken) => Promise<ScoresObj>;

type ScoresObj = {
  current_score: number;
  change_since_first: number;
  scores: ScoresObjScores; // { [key: string]: string }
  next_update: string;
  messages: Array<ScoresObjError>; // { code: number; message: string; priority: ScoresObjErrorPriority };
};
```
