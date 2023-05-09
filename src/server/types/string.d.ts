import { type } from "os";
import { Merge } from "./general";

/**
 * A type representing a whitespace.
 */
export type Whitespace = " " | "\n\r" | "\n" | "\t";
/**
 * TrimLeft takes an exact string type and returns a new string with the whitespace beginning removed.
 */
export type TrimLeft<S extends string> = S extends `${Whitespace}${infer Rest}` ? TrimLeft<Rest> : S;
/**
 * TrimRight takes an exact string type and returns a new string with the whitespace ending removed.
 */
export type TrimRight<S extends string> = S extends `${infer Rest}${Whitespace}` ? TrimRight<Rest> : S;
/**
 * TrimRight takes an exact string type and returns a new string with the whitespace beginning and ending removed.
 */
export type Trim<S extends string> = S extends `${Whitespace}${infer T}`|`${infer T}${Whitespace}` ? Trim<T> : S;
/**
 * Replace<S, From, To> replace the string From with To once in the given string S.
 */
export type Replace<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer A}${From}${infer B}` ? `${A}${To}${B}` : S;
/**
 * ReplaceAll<S, From, To> replace the string From with To for every occurence in the given string S.
 */
export type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer R1}${From}${infer R2}` ? `${R1}${To}${ReplaceAll<R2, From, To>}` : S;
/**
 * Compute the length of a string literal.
 */
export type StringLength<S extends string, T extends string[] = []> = S extends `${infer F}${infer R}` ? StringLength<R, [...T, F]> : T['length'];
/**
 * Join<["a", "p", "p", "l", "e"], "-"> // "a-p-p-l-e"
 * Join<["Hello", "World"], " "> // "Hello World"
 * Join<["2", "2", "2"], 1> // "21212"
 * Join<["o"], "u"> // "o"
 */
export type Join<T extends unknown[], U extends string | number> = T extends [infer F, ...infer R] ? R['length'] extends 0 ? `${F & string}` : `${F & string}${U}${Join<R, U>}` : never;
/**
 * LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
 * LastIndexOf<[0, 0, 0], 2> // -1
 */
type LastIndexOf<T extends unknown[], U> = T extends [...infer I,infer L]? L extends U?I['length']: LastIndexOf<I,U> : -1;
/**
 * SnakeCase<"hello">; // => "hello"
 * SnakeCase<"userName">; // => "user_name"
 * SnakeCase<"getElementById">; // => "get_element_by_id"
 */
export type SnakeCase<T> = T extends `${infer F}${infer R}` ? IsUpperCase<F> extends true ? `_${Lowercase<F>}${SnakeCase<R>}` : `${F}${SnakeCase<R>}` : '';
/**
 * IsUpperCase<"Test"> // true
 * IsUpperCase<"test"> // false
 */
export type IsUpperCase<T extends string> = Lowercase<T> extends T ? false : true;
/**
 * IsLowerCase<"Test"> // false
 * IsLowerCase<"test"> // true
 */
export type IsLowerCase<T extends string> = Lowercase<T> extends T ? true : false;
/**
 * CapitalizeWords<"hello world, my friends"> // "Hello World, My Friends"
 */
export type CapitalizeWords<S extends string> = Capitalize<CapitalizeRest<S>>;
type CapitalizeRest<S extends string> = S extends `${infer F}${infer R}` ? `${F}${CapitalizeRest<Uppercase<F> extends Lowercase<F> ? Capitalize<R> : R>}` : S;
/**
 * CamelCase<"hello_world_with_types"> // "helloWorldWithTypes"
 * CamelCase<"HELLO_WORLD_WITH_TYPES"> // "helloWorldWithTypes"
 */
export type CamelCase<S extends string> = S extends Lowercase<S> ? S extends `${infer F}_${infer RF}${infer R}` ? `${F}${Uppercase<RF>}${CamelCase<R>}` : S : CamelCase<Lowercase<S>>;
/**
 * Split<'Hi! How are you?', ' '>  // ['Hi!', 'How', 'are', 'you?']
 */
export type Split<S extends string, T extends string> = string extends S ? string[] : S extends `${infer A}${T}${infer B}` ? [A, ...(B extends "" ? [] : Split<B, T>)] : T extends "" ? [] : [S];
/**
 * SnakeToCamel<"some_prop", true> // "SomeProp"
 * SnakeToCamel<"some_prop", false> // "someProp"
 */
export type SnakeToCamel<S extends string, Cap extends boolean = false> = S extends `${infer Head}_${infer Tail}` ? `${Cap extends true ? Capitalize<Head> : Head}${SnakeToCamel<Tail, true>}` : Cap extends true ? Capitalize<S> : S;
/**
 * ParseToNumber<"1"> // 1
 * ParseToNumber<"25"> // 25
 */
export type ParseToNumber<S extends string, T extends unknown[] = []> = S extends `${T["length"]}` ? T["length"] : ParseToNumber<S, [...T, unknown]>;
/**
 * Combination<["foo", "bar", "baz"]> // "foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"
 */
export type KeysCombination<T extends string[], All = T[number], Item = All> = Item extends string ? Item | `${Item} ${KeysCombination<[], Exclude<All, Item>>}` : never;
/**
 * StartsWith<"abc", "ac"> // false
 * StartsWith<"abc", "ab"> // true
 * StartsWith<"abc", "abcd"> // false
 */
export type StartsWith<T, U extends string> = T extends `${U}${infer _}` ? true : false;
/**
 * EndsWith<"abc", "bc"> // true
 * EndsWith<"abc", "abc"> // true
 * EndsWith<"abc", "d"> // false
 */
export type EndsWith<T, U extends string> = T extends `${infer _}${U}` ? true : false;
/**
 * KebabCase<"FooBarBaz"> // "foo-bar-baz"
 * KebabCase<"do-nothing"> // "do-nothing"
 */
export type KebabCase<S extends string> = S extends `${infer S1}${infer S2}` ? S2 extends Uncapitalize<S2>? `${Uncapitalize<S1>}${KebabCase<S2>}` : `${Uncapitalize<S1>}-${KebabCase<S2>}` : S;