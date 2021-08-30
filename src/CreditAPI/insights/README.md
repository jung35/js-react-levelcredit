[&lt; back](../../../README.md)
# CreditAPI Insights feature

`display_token` anywhere in this document will be referring to the CreditAPI display token

* [`useInsights()`](#useinsightsdisplay_token-creditdisplaytoken-insightshook)
* [`<AccountStatus />`](#accountstatus-)
* [`<AccountSummary />`](#accountsummary-)
* [`<CreditBalance />`](#creditbalance-)
* [`<CreditUtilization />`](#creditutilization-)
* [`<HardInquiry />`](#hardinquiry-)
* [`<LoanType />`](#loantype-)


## `useInsights(display_token?: CreditDisplayToken): InsightsHook`
```ts
type CreditDisplayToken = string;

type InsightsHook = [insights: InsightsObject | null, fetch: FetchUserInsights];
```

On component load, there will be an api call made to get user's insights. However, if there was already another component that previously made api call, it will not need to make new api call.

### Example
```ts
import { useInsights } from "@levelcredit/js-react-levelcredit";

function ReactComponent() {
    const display_token = ...;
    const [insights] = useInsights(display_token);
}
```

### Types
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

## `<AccountStatus />`

<img src="https://raw.githubusercontent.com/levelcredit/js-app-component-demo/master/component-screenshots/CreditAPI/AccountStatus.png" alt="CreditAPI AccountStatus Component" height="64"/>

```js
import { AccountStatus } from "@levelcredit/js-react-levelcredit";
```

### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| classes | `JSS Classes` | `{}` |

### JSS Classes
`AccountStatus`

## `<AccountSummary />`

<img src="https://raw.githubusercontent.com/levelcredit/js-app-component-demo/master/component-screenshots/CreditAPI/AccountSummary.png" alt="CreditAPI AccountSummary Component" height="128"/>

```js
import { AccountSummary } from "@levelcredit/js-react-levelcredit";
```

### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| classes | `JSS Classes` | `{}` |

### JSS Classes
`AccountSummary`, `SummaryItem`, `SummaryValue`, `SummaryLabel`

## `<CreditBalance />`

<img src="https://raw.githubusercontent.com/levelcredit/js-app-component-demo/master/component-screenshots/CreditAPI/CreditBalance.png" alt="CreditAPI CreditBalance Component" height="128"/>

```js
import { CreditBalance } from "@levelcredit/js-react-levelcredit";
```

### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| classes | `JSS Classes` | `{}` |

### JSS Classes
`CreditBalance`, `BalanceList`, `ListItemHeader`, `ListItem`, `ListLabel`, `ListValue`, `BalanceCount`, `CountItem`, `CountLabel`, `CountValue`

## `<CreditUtilization />`

<img src="https://raw.githubusercontent.com/levelcredit/js-app-component-demo/master/component-screenshots/CreditAPI/CreditUtilization.png" alt="CreditAPI CreditUtilization Component" height="128"/>

```js
import { CreditUtilization } from "@levelcredit/js-react-levelcredit";
```

### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| classes | `JSS Classes` | `{}` |

### JSS Classes
`CreditUtilization`, `UtilizationValue`, `UtilizationRating`

## `<HardInquiry />`

<img src="https://raw.githubusercontent.com/levelcredit/js-app-component-demo/master/component-screenshots/CreditAPI/HardInquiry.png" alt="CreditAPI HardInquiry Component" height="128"/>

```js
import { HardInquiry } from "@levelcredit/js-react-levelcredit";
```

### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| classes | `JSS Classes` | `{}` |

### JSS Classes
`HardInquiry`, `HardInquiryValue`, `HardInquiryRating`

## `<LoanType />`

<img src="https://raw.githubusercontent.com/levelcredit/js-app-component-demo/master/component-screenshots/CreditAPI/LoanType.png" alt="CreditAPI LoanType Component" height="128"/>

```js
import { LoanType } from "@levelcredit/js-react-levelcredit";
```

### Props
| Props | Type | Default |
|---|---|---|
| display_token | `CreditDisplayToken (string)` | `""` |
| show_dots_percent | `boolean` | `true` |
| classes | `JSS Classes` | `{}` |

### JSS Classes
`LoanType`, `LoanTypeTypes`, `LoanTypeType`, `LoanTypeDots`, `LoanTypePercents`
