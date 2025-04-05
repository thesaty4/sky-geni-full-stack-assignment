import { Path, PathValue } from "../types/common.type";
import { ForceAny } from "../types/util.type";

/**
 * @param data - The data object from which to extract the value.
 * @param key - The key to extract from the data object.
 * @returns - The value of the key in the data object.
 * @example - Please see the example below.
 * const info = {
 *  id: 1,
 *  name: 'Satya Mishra',
 *  address: {
 *   city: 'Noida',
 *   street: 'India gate',
 *  },
 * }
 * const p = get(d, 'address.city') // Noida
 */
export const get = <
  DType extends Record<string, ForceAny>,
  K extends Path<DType> = Path<DType>
>(
  data: DType,
  key: K
) =>
  key.split(".").reduce((obj, prop) => obj?.[prop], data) as PathValue<
    DType,
    K
  >;

/**
 *
 * @param input - The input string to be converted to title case.
 * @returns  - The input string converted to title case.
 */
export function toTitleCase(input: string): string {
  return input
    .split(" ")
    .map((word) =>
      word.length > 0 ? word[0].toUpperCase() + word.slice(1).toLowerCase() : ""
    )
    .join(" ");
}

/**
 * Formats a number with appropriate metric postfix (K, M, B, etc.)
 * @param num - The number to format
 * @param decimals - Number of decimal places to show (default: 1)
 * @returns Formatted string with metric postfix
 */
export const formatNumberWithPostfix = (
  num: number,
  decimals: number = 1
): string => {
  if (isNaN(num)) return "NaN";
  if (num === 0) return "0";

  const absNum = Math.abs(num);
  const sign = num < 0 ? "-" : "";

  const metricPrefixes = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
  ];

  // Find the first prefix where the number is larger than the prefix value
  const prefix = metricPrefixes.find((prefix) => absNum >= prefix.value);

  if (prefix) {
    // Format the number with the appropriate postfix
    const formattedNum = (absNum / prefix.value).toFixed(decimals);
    // Remove trailing .0 if decimals is 0
    return `${sign}${decimals > 0 ? formattedNum : formattedNum.split(".")[0]}${
      prefix.symbol
    }`;
  }

  // For numbers less than 1000, return as is
  return `${sign}${absNum}`;
};
