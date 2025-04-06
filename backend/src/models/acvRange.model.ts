import fs from "fs";
import path from "path";

// Read the JSON file
export const acvRangePath = path.resolve(__dirname, "../data/acv_range.json");
export let acvRange: ACVRange[] = [];

try {
  const rawData = fs.readFileSync(acvRangePath, "utf-8");
  acvRange = JSON.parse(rawData) as ACVRange[];
} catch (error) {
  console.error("Error reading acv_range.json:", error);
  throw new Error("Failed to load acv range data");
}

export interface ACVRange {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  ACV_Range: string;
}
