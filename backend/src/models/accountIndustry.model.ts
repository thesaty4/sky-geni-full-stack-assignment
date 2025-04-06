import fs from "fs";
import path from "path";

// Read the JSON file
export const accountIndustry = path.resolve(
  __dirname,
  "../data/account_industry.json"
);
export let account: AccountIndustry[] = [];

try {
  const rawData = fs.readFileSync(accountIndustry, "utf-8");
  account = JSON.parse(rawData) as AccountIndustry[];
} catch (error) {
  console.error("Error reading account_industry.json:", error);
  throw new Error("Failed to account industry  data");
}

export interface AccountIndustry {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  Acct_Industry: string;
  query_key: string;
}
