[&lt; back](../../../README.md)
# CreditAPI Score feature

`display_token` anywhere in this document will be referring to the CreditAPI display token

* [`useScore()`](#usescoredisplay_token-creditdisplaytoken--scorehook)
* [`<ScoreDisplay />`](#scoredisplay-)
* [`<ScoreChart />`](#scorechart-)

## `useScore(display_token?: CreditDisplayToken):  ScoreHook`
```ts
type CreditDisplayToken = string;

type ScoreHook = [score: ScoreObject | null, fetch: FetchUserScores];
```

On component load, there will be an api call made to get user's scores. However, if there was already another component that previously made api call, it will not need to make new api call.

### Example
```ts
import { useScore } from "@levelcredit/js-react-levelcredit";

function ReactComponent() {
    const display_token = ...;
    const [scores, fetchScores] = useScore(display_token);
}
```

### Types
```ts
type FetchUserScores = (display_token?: CreditDisplayToken) => Promise<null | ScoreObject>;

type ScoreObject = {
    current_score: number;
    change_since_first: number;
    scores: ScoreObjectScores;// { [key: string]: string }
    next_update: string;
    messages: Array<LevelCreditAPIError>; // { code: number; message: string; priority: CreditAPIErrorPriority };
};
```

## `<ScoreDisplay />`
| dataDisplayStyle: `simple` | dataDisplayStyle: `donut` |
|:---:|:---:|
| <img src="https://raw.githubusercontent.com/levelcredit/js-app-component-demo/master/component-screenshots/CreditAPI/ScoreDisplay.1.png" alt="CreditAPI ScoreDisplay Component" height="128"/> | <img src="https://raw.githubusercontent.com/levelcredit/js-app-component-demo/master/component-screenshots/CreditAPI/ScoreDisplay.2.png" alt="CreditAPI ScoreDisplay Component" height="128"/> |


```js
import { ScoreDisplay } from "@levelcredit/js-react-levelcredit";
```

Display user's current score and how much it's changed since last score update.

### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| dataDisplayStyle | `"simple" \| "donut"` | `"simple"` |
| classes | `JSS Classes` | `{}` |

### JSS Classes
dataDisplayStyle `simple`: `SimpleScoreDisplay`, `SimpleScoreData`, `SimpleScoreNumber`, `SimpleScoreText`, `SimpleScoreDifference`, `SimpleScoreProvided`

dataDisplayStyle `donut`: `CircularScoreDisplay`, `CircularScoreInformation`, `CircularScoreDifference`, `CircularScoreNumber`, `CircularScoreText`, `CircularScoreUpdated`, `CircularScoreProvided`, `CircularScoreMinMax`

## `<ScoreChart />`

<img src="https://raw.githubusercontent.com/levelcredit/js-app-component-demo/master/component-screenshots/CreditAPI/ScoreChart.png" alt="CreditAPI ScoreChart Component" height="128"/>

```js
import { ScoreChart } from "@levelcredit/js-react-levelcredit";
```

Creates chart using `recharts` displaying user's credit score history.

### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| dataParseStyle | `"11-months-past" \| "12-scores"` | `"11-months-past"` |
| classes | `JSS Classes` | `{}` |

### JSS Classes
`ScoreChart`, `XAxis`, `YAxis`, `Line`, `TooltipContent`
