[&lt; back](https://github.com/levelcredit/js-react-levelcredit)
# API -- CreditAPI Insights feature

`display_token` anywhere in this document will be referring to the CreditAPI display token

---

### `useInsights()`
#### Returns

* `FetchUserScores`: A promise function ready to be used to return scores object with a valid display token created for scores feature.

#### Example
```ts
import { useInsights } from "@levelcredit/js-react-levelcredit";

function ReactComponent() {
    const { insights, pending, loading, fetch }: InsightsHook = useInsights();
    const display_token = ...;
    const fetch_insights = pending && !loading;

    useEffect(
        function () {
            if (fetch_insights) {
                fetch(display_token);
            }
        },
        [fetch, display_token, fetch_insights]
    );
}
```

#### Types
```ts
type InsightsHook = {
  insights: InsightsObject | null;
  pending: boolean;
  loading: boolean;
  fetch: FetchUserInsights;
};

type FetchUserInsights = (credit_display_token: CreditDisplayToken) => Promise<InsightsObject>;

type InsightsObject = {
  account_balances: InsightsAccountBalance; // { revolving: number; mortgage: number; installment: number; open_collection: number }
  total_monthly_payments: number;
  total_accounts: InsightsTotalAccount; // { total: number; open: number; closed: number; derogatory: number; open_collection: number }
  total_public_records: number;
  utilization: number;
  total_inquiries: number;
  oldest_tradeline_years: number;
  bureau: string;
  next_update: string;
  messages: Array<CreditAPIError>; // { code: number; message: string; priority: CreditAPIErrorPriority };
};
```

---

### `<AccountStatus />`

```js
import { AccountStatus } from "@levelcredit/js-react-levelcredit";
```

#### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| classes | `JSS Classes` | `{}` |

#### JSS Classes
`AccountStatus`

---

### `<AccountSummary />`

```js
import { AccountSummary } from "@levelcredit/js-react-levelcredit";
```

#### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| classes | `JSS Classes` | `{}` |

#### JSS Classes
`AccountSummary`, `SummaryItem`, `SummaryValue`, `SummaryLabel`

---

### `<CreditBalance />`

```js
import { CreditBalance } from "@levelcredit/js-react-levelcredit";
```

#### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| classes | `JSS Classes` | `{}` |

#### JSS Classes
`CreditBalance`, `BalanceList`, `ListItemHeader`, `ListItem`, `ListLabel`, `ListValue`, `BalanceCount`, `CountItem`, `CountLabel`, `CountValue`

---

### `<CreditUtilization />`

```js
import { CreditUtilization } from "@levelcredit/js-react-levelcredit";
```

#### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| classes | `JSS Classes` | `{}` |

#### JSS Classes
`CreditUtilization`, `UtilizationValue`, `UtilizationRating`

---

### `<HardInquiry />`

```js
import { HardInquiry } from "@levelcredit/js-react-levelcredit";
```

#### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| classes | `JSS Classes` | `{}` |

#### JSS Classes
`HardInquiry`, `HardInquiryValue`, `HardInquiryRating`

---

### `<LoanType />`

```js
import { LoanType } from "@levelcredit/js-react-levelcredit";
```

#### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| show_dots_percent | `boolean` | `true` |
| classes | `JSS Classes` | `{}` |

#### JSS Classes
`LoanType`, `LoanTypeTypes`, `LoanTypeType`, `LoanTypeDots`, `LoanTypePercents`
