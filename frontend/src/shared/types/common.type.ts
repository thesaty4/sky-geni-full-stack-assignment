import { ForceAny } from "./util.type";

/**
 * @type Path - Get the value of the key in an nested object
 * @example - Please see the example below.
 * const info = {
 *  id: 1,
 *  name: 'Satya Mishra',
 *  address: {
 *   city: 'Noida',
 *   street: 'India gate',
 *  },
 * }
 * type InfoType = Path<typeof info, 'address.city'> // Noida
 * type InfoType = Path<typeof info, 'address'> // { city: 'Noida', street: 'India gate' }
 * type InfoType = Path<typeof info, 'id'> // 1
 */
export type Path<T, Key extends keyof T = keyof T> = Key extends string
  ? T[Key] extends Record<string, ForceAny>
    ?
        | `${Key}` // Include the current key
        | `${Key}.${Path<Required<T[Key]>>}` // Recurse for nested keys
    : `${Key}` // Include only the current key if it's not an object
  : never;

/**
 * @type PathValue - Get the value type of the key in an nested object
 * @example - Please see the example below.
 * const info = {
 *  id: 1,
 *  name: 'Satya Mishra',
 *  address: {
 *   city: 'Noida',
 *   street: 'India gate',
 *  },
 * }
 * type InfoType = PathValue<typeof info, 'address.city'> // string
 * type InfoType = PathValue<typeof info, 'address'> // { city: string, street: string }
 * type InfoType = PathValue<typeof info, 'id'> // number
 */
export type PathValue<
  T,
  P extends Path<T>
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends Path<T[K]>
      ? Required<PathValue<T[K], Rest>>
      : never
    : never
  : P extends keyof T
  ? T[P]
  : never;
