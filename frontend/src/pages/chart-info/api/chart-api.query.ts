import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "../../../shared/api/api-fetcher";
import { CHART_API_QUERY_KEY } from "./chart-api.const";
import { ChartDonutModel, ChartTableModel } from "./chart-api.model";
import { DashboardDataResponse } from "./chart-api.type";

/**
 * Fetches chart information from the API.
 *
 * @returns A promise that resolves to the chart data response.
 */
const fetchChartInfo = async (): Promise<DashboardDataResponse> => {
  return apiFetcher("/customer-type/dashboard");
};

/**
 * Custom React Query hook to fetch and return chart info.
 *
 * @returns Query result along with a `modelData` instance of `ChartModel`.
 */
export const useChartInfo = () => {
  const info = useQuery<DashboardDataResponse>({
    queryKey: [CHART_API_QUERY_KEY],
    queryFn: fetchChartInfo,
  });

  return {
    ...info,
    tableData: new ChartTableModel(info.data?.tableData),
    chartInfo: {
      donut: new ChartDonutModel(info.data?.doughnutChart),
    },
  };
};
