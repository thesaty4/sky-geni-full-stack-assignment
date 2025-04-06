import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "../../../shared/api/api-fetcher";
import { CHART_API_QUERY_KEY } from "./chart-api.const";
import {
  ChartDonutModel,
  ChartStackModel,
  ChartTableModel,
} from "./chart-api.model";
import { DashboardDataResponse } from "./chart-api.type";

/**
 * Fetches chart information from the API.
 *
 * @returns A promise that resolves to the chart data response.
 */
const fetchChartInfo = async (
  queryParams: string
): Promise<DashboardDataResponse> => {
  return apiFetcher(`/customer-type/dashboard${queryParams}`);
};

/**
 * Custom React Query hook to fetch and return chart info.
 *
 * @returns Query result along with a `modelData` instance of `ChartModel`.
 */
export const useChartInfo = (queryParams: string) => {
  const info = useQuery<DashboardDataResponse>({
    queryKey: [CHART_API_QUERY_KEY],
    queryFn: () => fetchChartInfo(queryParams),
  });

  return {
    ...info,
    tableData: new ChartTableModel(info.data?.tableData),
    chartInfo: {
      bar: new ChartStackModel(info.data?.barChart),
      donut: new ChartDonutModel(info.data?.doughnutChart),
    },
  };
};
