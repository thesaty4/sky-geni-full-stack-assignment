import fs from "fs";
import path from "path";

// Read the JSON file
export const teamPath = path.resolve(__dirname, "../data/team.json");
export let team: Team[] = [];

try {
  const rawData = fs.readFileSync(teamPath, "utf-8");
  team = JSON.parse(rawData) as Team[];
} catch (error) {
  console.error("Error reading team.json:", error);
  throw new Error("Failed to load team  data");
}

export interface Team {
  count: number;
  acv: number;
  closed_fiscal_quarter: string;
  Team: string;
}
