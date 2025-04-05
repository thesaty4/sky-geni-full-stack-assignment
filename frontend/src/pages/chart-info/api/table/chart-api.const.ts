/**
 * Query key for chart API requests
 * @constant {string}
 */
export const CHART_API_QUERY_KEY = "chart-api";

/**
 * Mapping of internal field names to display labels
 * @constant {Record<string, string>}
 */
export const INNER_LABEL_MAP: Record<string, string> = {
  total: "% of Total",
  acv: "ACV",
};

/**
 * Mapping of internal field names to prefix text
 * @constant {Record<string, string>}
 */
export const INNER_CHILD_PREFIX_TEXT_MAP: Record<string, string> = {
  acv: "$",
};

/**
 * Mapping of internal field names to postfix text
 * @constant {Record<string, string>}
 */
export const INNER_CHILD_POSTFIX_TEXT_MAP: Record<string, string> = {
  total: "%",
};

/**
 * Mapping of internal field names to width values
 * @constant {Record<string, string>}
 */
export const INNER_CHILD_WIDTH_MAP: Record<string, string> = {
  total: "100px",
};
