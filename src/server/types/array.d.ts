import type { Equal, If, LastInUnion } from "./general";
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
export type Length<T extends unknown[]> = T["length"];
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
/**
 * IndexOf<[1, 2, 3], 2> // 1
 * IndexOf<[2,6, 3,8,4,1,7, 3,9], 3> // 2
 * IndexOf<[0, 0, 0], 2> // -1
 */
export type IndexOf<T extends unknown[], U, Pass extends unknown[] = []> = T extends [infer F, ...infer Rest] ? Equal<F, U> extends true ? Pass['length'] : IndexOf<Rest, U, [...Pass, F]> : -1;
/**
 * Unique<[1, 1, 2, 2, 3, 3]>; // [1, 2, 3]
 * Unique<[1, 2, 3, 4, 4, 5, 6, 7]>; // [1, 2, 3, 4, 5, 6, 7]
 * Unique<[1, "a", 2, "b", 2, "a"]>; // [1, "a", 2, "b"]
 * Unique<[string, number, 1, "a", 1, string, 2, "b", 2, number]>; // [string, number, 1, "a", 2, "b"]
 * Unique<[unknown, unknown, any, any, never, never]>; // [unknown, any, never]
 */
export type Unique<T extends unknown[], R extends unknown[]> = T extends [ infer A, ...infer Rest ] ? Unique<Rest, A extends R[number] ? R : [...R, A]> : R;
/**
 * Fill<[1, 2, 3], 0> // [0, 0, 0]
 */
export type Fill<T extends unknown[], N, Start extends number = 0, End extends number = T['length'], Count extends unknown[] = [], Flag extends boolean = Count['length'] extends Start ? true : false> = 
Count['length'] extends End ? T : T extends [infer R, ...infer U] ? Flag extends false ? [R, ...Fill<U, N, Start, End, [...Count, 0]>] : [N, ...Fill<U, N, Start, End, [...Count, 0], Flag>] : T;
/**
 * Without<[1, 2], 1>; // [2]
 * Without<[1, 2, 4, 1, 5], [1, 2]>; // [4, 5]
 * Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // []
 */
export type Without<T, U> = T extends [infer R, ...infer F] ? R extends U ? Without<F, U> : [R, ...Without<F, U>] : T;
/**
 * Filter<[1, 2, 3, 4, 5, 6], 1 | 3 | 4> // [1, 3, 4]
 */
export type Filter<T extends unknown[], U> = T extends [infer A, ...infer Rest] ? [...(A extends U ? [A] : []), ...Filter<Rest, U>] : [];
/**
 * TupleToObject<typeof ['tesla', 'model 3', 'model X', 'model Y']> // { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
 */
export type TupleToObject<T extends (string|number|symbol)[]> = { [P in T[number]]: P };
/**
 * Slice<[1, 2, 3, 4, 5], 2, 4> // [3, 4]
 */
export type Slice<Arr extends unknown[], Start extends number = 0, End extends number = Arr['length']> = InitialN<Arr, ToPositive<End, Arr>> extends [...InitialN<Arr, ToPositive<Start, Arr>>, ...infer Rest] ? Rest : [];
// if N is negative, convert it to its positive counterpart by the Arr
type ToPositive<N extends number, Arr extends unknown[]> = `${N}` extends `-${infer P extends number}` ? Slice<Arr, P>['length'] : N;
// get the initial N items of Arr
type InitialN<Arr extends unknown[], N extends number, _Acc extends unknown[] = []> =  _Acc['length'] extends N | Arr['length'] ? _Acc : InitialN<Arr, N, [..._Acc, Arr[_Acc['length']]]>;
/**
 * FilterOut<[1, 2, null, 3], null> // [1, 2, 3]
 */
export type FilterOut<T extends unknown[], F> = T extends [infer R, ...infer Rest] ? [R] extends [F] ? FilterOut<Rest, F> : [R, ...FilterOut<Rest, F>] : [];
/**
 * IsTuple<[number]> // true
 * IsTuple<readonly [number]> // true
 * IsTuple<number[]> // false
 */
export type IsTuple<T> = T extends readonly unknown[] ? number extends T['length'] ? false : true : false;
/**
 * UnionToTuple<1> // [1]
 * UnionToTuple<"any" | "a"> // ["any","a"]
 * UnionToTuple<"a" | "any"> // ["a","any"]
 * Equal<UnionToTuple<any | "a">,       UnionToTuple<any>> // true
 * Equal<UnionToTuple<unknown | "a">,   UnionToTuple<unknown>> // true
 * Equal<UnionToTuple<never | "a">,     UnionToTuple<"a">> // true
 * Equal<UnionToTuple<"a" | "a" | "a">, UnionToTuple<"a">> // true
 */
export type UnionToTuple<U, Last = LastInUnion<U>> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, Last>>, Last];
/**
 * TupleToNestedObject<["a"], string> // {a: string}
 * TupleToNestedObject<["a", "b"], number> // {a: {b: number}}
 * TupleToNestedObject<[], boolean> // boolean
 */
export type TupleToNestedObject<T, U> = T extends [infer F,...infer R] ? { [K in F&string]:TupleToNestedObject<R,U> } : U;
/**
 * ReplaceFirst<[ 1, 2, 3, 4 ], 2, 4> // [1, 4, 3, 4]
 * ReplaceFirst<[ "hello", "world", "this", "is", "a", "type" ], "this", "that"> // ["hello", "world", "that", "is", "a", "type"]
 */
export type ReplaceFirst<Tuple extends unknown[], FirstValue, ReplaceInto> = Tuple extends [infer F, ...infer Rest] ? F extends FirstValue ? [ReplaceInto, ...Rest] : [F, ...ReplaceFirst<Rest, FirstValue, ReplaceInto>] : [];
/**
 * ConstructTuple<2> // [unknown, unkonwn]
 */
export type NewTuple<L extends number, U extends unknown[] = []> = U['length'] extends L ? U : NewTuple<L, [...U, unknown]>;