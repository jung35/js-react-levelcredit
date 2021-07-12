export type CreditDisplayToken = string;
export type CreditAPIError = { code: number; message: string; priority: CreditAPIErrorPriority };
type CreditAPIErrorPriority = "high" | "medium" | "low";
