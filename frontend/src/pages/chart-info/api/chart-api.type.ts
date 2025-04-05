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
  rowTypes: string[];
  total: TableAPIInfo;
  data: TableAPIInfo[];
};

export interface DashboardDataResponse {
  barChart: Array<{
    quarter: string;
    total: number;
    values: Array<{
      label: string;
      value: number;
      color: string;
    }>;
  }>;
  doughnutChart: {
    existing: number;
    new: number;
    total: number;
  };
  tableData: TableAPIResponse;
}
