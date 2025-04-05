/* eslint-disable @typescript-eslint/no-explicit-any */
export type ForceAny = any;

export type ExtendedString<T> = T | (string & NonNullable<unknown>);
