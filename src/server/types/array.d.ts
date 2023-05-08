import type { Equal, If } from "./general";
/**
 * ToPartialArray<string | number> // string[] | number[]
 */
export type ToPartialArray<T> = T extends T ? Array<T> : never;
/**
 * ToArray<string | number> // (string | number)[]
 */
export type ToArray<T> = [T] extends [T] ? Array<T> : never;
/**
 * Concat<[1], [2]> // [ 1, 2 ]
 */
export type Concat<T extends unknown[], U extends unknown[]> = [ ...T, ...U ];
/**
 * Push<[1, 2, 3, 4, 5], 6> // [ 1, 2, 3, 4, 5, 6 ]
 * Push<[1, 2, 3, 4, 5], "a"> // [ 1, 2, 3, 4, 5, "a" ]
 */
export type Push<T extends unknown[], U> = [ ...T, U ];
/**
 * Push<[1, 2, 3, 4, 5], 6> // [ 6, 1, 2, 3, 4, 5 ]
 * Push<[1, 2, 3, 4, 5], "a"> // [ "a", 1, 2, 3, 4, 5 ]
 */
export type Unshift<T extends unknown[], U> = [ U, ...T ];
/**
 * Includes<[1, 2, 3, 4, 5], 3> // true
 * Includes<[1, 2, 3, 4, 5], 6> // false
 */
export type Includes<T extends unknown[], U> = T extends [infer P, ...infer R] ? If<Equal<U, P>, true, Includes<R, U>> : false;
/**
 * First<[1, 2, 3, 4, 5]> // 1
 * First<["a", 2, 3, 4, 5]> // "a"
 */
export type First<T extends unknown[]> = T extends [infer P, ...unknown[]] ? P : never;
/**
 * Last<[ 1, 2, 3, 4, "r" ]> // "r"
 * Last<[ 1, 2, 3, 4, "q" ]> // "q"
 */
export type Last<T extends unknown[]> = T extends [...unknown[], infer P ] ? P : never;
/**
 * Length<[ "1", "2", "3", "4", "5"]> // 5
 * Length<[ "1", "2", "3", "4", "5", "a", "b"]> // 7
 */
type Length<T extends unknown[]> = T["length"];
/**
 * ToUnion<[ "1", "2", "3" ]> // "1" | "2" | "3"
 */
export type ToUnion<T> = T extends Array<infer Items> ? Items : never;
/**
 * Pop<[ "1", "2", "3" ]> // [ "1", "2" ]
 */
export type Pop<T extends unknown[]> = T extends [...infer I, infer _] ? I : never;
/**
 * Shift<[ "1", "2", "3" ]> // [ "2", "3" ]
 */
export type Shift<T extends unknown[]> = T extends [infer _, ...infer I] ? I : never;
/**
 * Reverse<[ "1", "2", "3", "4", "5" ]> // [ "5", "4", "3", "2", "1" ]
 */
export type Reverse<T extends unknown[]> = T extends [infer J, ...infer I] ? [ ...Reverse<I>, J ] : T;