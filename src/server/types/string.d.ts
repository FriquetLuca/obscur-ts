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