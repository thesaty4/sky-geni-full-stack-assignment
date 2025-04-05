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
