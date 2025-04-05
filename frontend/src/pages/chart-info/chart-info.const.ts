import { MODULE_NAMES } from "../../shared/constant/common.const";

export const MODULE_WISE_MAPPER = {
  [MODULE_NAMES.ACCOUNT]: {
    header: "Won ACV mix by Account Industry",
  },
  [MODULE_NAMES.CUSTOMER]: {
    header: "Won ACV mix by Customer Type",
  },
  [MODULE_NAMES.ACV]: {
    header: "Won ACV mix by ACV Range",
  },
  [MODULE_NAMES.TEAM]: {
    header: "Won ACV mix by Team",
  },
};

export type ModuleInfoType = {
  header: string;
};
