import { useQuery } from "@tanstack/react-query";
import { apiFetcher } from "../../../../shared/api/api-fetcher";
import { CHART_API_QUERY_KEY } from "./chart-api.const";
import { ChartModel } from "./chart-api.model";
import { TableAPIResponse } from "./chart-api.type";

/**
 * Fetches chart information from the API.
 *
 * @returns A promise that resolves to the chart data response.
 */
const fetchChartInfo = async (): Promise<TableAPIResponse> => {
  return apiFetcher("/customer-type/table-info");
};

/**
 * Custom React Query hook to fetch and return chart info.
 *
 * @returns Query result along with a `modelData` instance of `ChartModel`.
 */
export const useChartInfo = () => {
  const info = useQuery<TableAPIResponse>({
    queryKey: [CHART_API_QUERY_KEY],
    queryFn: fetchChartInfo,
  });

  return { ...info, modelData: new ChartModel(info.data) };
};
