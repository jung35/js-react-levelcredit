[&lt; back](../../../README.md)
# CreditAPI Insights feature

`display_token` anywhere in this document will be referring to the CreditAPI display token

---

### `useInsights(display_token?: CreditDisplayToken): InsightsHook`
```ts
type CreditDisplayToken = string;

type InsightsHook = [insights: InsightsObject | null, fetch: FetchUserInsights];
```

On component load, there will be an api call made to get user's insights. However, if there was already another component that previously made api call, it will not need to make new api call.

#### Example
```ts
import { useInsights } from "@levelcredit/js-react-levelcredit";

function ReactComponent() {
    const display_token = ...;
    const [insights] = useInsights(display_token);
}
```

#### Types
```ts
type FetchUserInsights = (display_token?: CreditDisplayToken) => Promise<null | InsightsObject>;

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
  messages: Array<LevelCreditAPIError>; // { code: number; message: string; priority: CreditAPIErrorPriority };
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
