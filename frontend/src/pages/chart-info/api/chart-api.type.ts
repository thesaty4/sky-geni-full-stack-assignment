export type CustomerDataType = {
  type: string;
  totalPercentage: number;
  data: {
    count: number;
    acv: number;
  };
};

export type TableAPIInfo = {
  quarter: string;
  subDataInfo: {
    totalInfo: CustomerDataType;
    dataList: CustomerDataType[];
  };
};

export type TableAPIResponse = {
  data: {
    rowTypes: string[];
    total: TableAPIInfo;
    data: TableAPIInfo[];
  };
};
