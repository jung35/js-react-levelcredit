[&lt; back](https://github.com/levelcredit/js-react-levelcredit)
# API -- CreditAPI Score feature

`display_token` anywhere in this document will be referring to the CreditAPI display token

---

### `useScore()`
#### Returns

* `FetchUserScores`: A promise function ready to be used to return scores object with a valid display token created for scores feature.

#### Example
```ts
import { useScore } from "@levelcredit/js-react-levelcredit";

function ReactComponent() {
    const fetchScores: FetchUserScores = useScore();
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
type FetchUserScores = (credit_display_token: CreditDisplayToken) => Promise<ScoresObj>;

type ScoresObj = {
  current_score: number;
  change_since_first: number;
  scores: ScoresObjScores; // { [key: string]: string }
  next_update: string;
  messages: Array<CreditAPIError>; // { code: number; message: string; priority: CreditAPIErrorPriority };
};
```

---

### `<ScoreDisplay />`

```js
import { ScoreDisplay } from "@levelcredit/js-react-levelcredit";
```

Display user's current score and how much it's changed since last score update.

#### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
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
| display_token | `CreditDisplayToken (string)` | `""` |
| dataParseStyle | `"11-months-past" \| "12-scores"` | `"11-months-past"` |
| classes | `JSS Classes` | `{}` |

#### JSS Classes
`ScoreChart`, `XAxis`, `YAxis`, `Line`, `TooltipContent`

