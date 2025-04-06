import { AccountIndustry, account } from "./accountIndustry.model";
import { ACVRange, acvRange } from "./acvRange.model";
import {
  CustomerType,
  FinalResponse,
  MODULE_NAMES,
  customerTypeData,
} from "./customerType.model";
import { Team, team } from "./team.model";

export type AllFileTypes = AccountIndustry & ACVRange & CustomerType & Team;

export const MODULE_WISE_MAPPER: Record<MODULE_NAMES, ModuleInfoType> = {
  [MODULE_NAMES.ACCOUNT]: {
    type: "Acct_Industry",
    quarter: "closed_fiscal_quarter",
    fileData: account,
  },
  [MODULE_NAMES.CUSTOMER]: {
    type: "Cust_Type",
    quarter: "closed_fiscal_quarter",
    fileData: customerTypeData,
  },
  [MODULE_NAMES.ACV]: {
    type: "ACV_Range",
    quarter: "closed_fiscal_quarter",
    fileData: acvRange,
  },
  [MODULE_NAMES.TEAM]: {
    type: "Team",
    quarter: "closed_fiscal_quarter",
    fileData: team,
  },
};

export type ModuleInfoType = {
  type: keyof AllFileTypes;
  quarter: keyof AllFileTypes;
  fileData: Partial<AllFileTypes>[];
};

export interface DashboardData {
  barChart: Array<{
    quarter: string;
    total: number;
    values: Array<{
      label: string;
      value: number;
      color?: string;
    }>;
  }>;
  doughnutChart: Record<string, number>;
  tableData: FinalResponse;
}
