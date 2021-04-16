# Levelcredit React Component Library

## Dependencies

* `react@^16.8.0`
* `react-dom@^16.8.0`
* `recharts@^2.0.9` -- TODO: making it optional
* `moment@^2.29.0`
* `react-jss@^10.6.0`

### Dependency when using watch
This is to lessen build time during development

* Above dependencies
* `whatwg-fetch@^3.6.2`

## API

### `<LevelCreditProvider />`
```js
import { LevelCreditProvider } from "@levelcredit/js-react-levelcredit";
```

| Props | Type | Default |
|---|---|---|
| env | `"development" \| "sandbox" \| "production"` | *`NULL`* |
| api_url | `string` | *`NULL`* |

### `<ScoreAPICharts />`

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
