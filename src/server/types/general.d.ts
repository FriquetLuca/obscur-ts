/**
 * Extends<"hello", string> // true
 * Extends<"hello", number> // false
 */
export type Extends<T, U> = T extends U ? true : false;
/**
 * LookUp<"hello", string> // string
 * LookUp<"hello", number> // never
 * interface Cat {
 * type: "cat"
 * breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal"
 * }
 * 
 * interface Dog {
 * type: "dog"
 * breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer"
 * color: "brown" | "white" | "black"
 * }
 * 
 * type MyDogType = LookUp<Cat | Dog, { type: "dog" }> // expected to be `Dog`
 */
export type LookUp<T, U> = T extends U ? T : never;
/**
 * If<true, "a", "b">  // "a"
 * If<false, "a", "b">  // "b"
 */
export type If<C extends boolean, T, F> = C extends true ? T : F;
/**
 * IfEqual<number, number, "a", "b">  // "a"
 * IfEqual<number, string, "a", "b">  // "b"
 */
export type IfEqual<A, B, T, F> = Equal<A, B> extends true ? T : F;
/**
 * IfNotEqual<number, number, "a", "b">  // "b"
 * IfNotEqual<number, string, "a", "b">  // "a"
 */
export type IfNotEqual<A, B, T, F> = Equal<A, B> extends false ? T : F;
/**
 * IsAny<any> // true
 * IsAny<unknown> // false
 */
export type IsAny<T> = 0 extends (1 & T) ? true : false;
/**
 * IsAny<any> // false
 * IsAny<unknown> // true
 */
export type NotAny<T> = true extends IsAny<T> ? false : true;
/**
 * Equal<number, string> // false
 * Equal<number, number> // true
 */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
/**
 * Equal<number, string> // true
 * Equal<number, number> // false
 */
export type Different<X, Y> = true extends Equal<X, Y> ? false : true;
/**
 * A generic PickReadonly which takes two type argument T and K.
 * K specify the set of properties of T that should set to Readonly. When K is not provided, it should make all properties readonly just like the normal Readonly<T>.
 */
export type PickReadonly<T, K extends keyof T = keyof T> = { readonly [k in K]: T[k]} & { [k in Exclude<keyof T, K>]: T[k] };
/**
 * A generic DeepReadonly which make every parameter of an object - and its sub-objects recursively - readonly.
 */
export type DeepReadonly<T> = keyof T extends never ? T : { readonly [k in keyof T]: DeepReadonly<T[k]> };
/**
 * Convert a property of type literal (label type) to a primitive type.
 */
export type Primitive<T> = T extends object ? (T extends (...args: never[]) => unknown ? Function : { [Key in keyof T]: Primitive<T[Key]> }) : (T extends { valueOf: () => infer P } ? P : T);
/**
 * interface User {
 * name: string
 * age: number
 * address: string
 * }
 * PickOptional<User, "name" | "age"> // { name?:string; age?:number; address:string }
 */
export type PickOptional<T, U extends keyof T> = Omit<Partial<Pick<T, U & keyof T>> & Omit<T, U & keyof T>, never>;
/**
 * AppendField<{ id: '1' }, 'value', 4> // { value: 4; id: "1"; }
 */
export type AppendField<T, U extends string|number|symbol, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
};
/**
 * From T, pick a set of properties whose type are assignable to U.
 */
export type PickType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] };
/**
 * UnionToIntersection<{ a: "x" } | { b : "y"}> // { a: "x" } & { b : "y"}
 */
export type UnionToIntersection<U> = (U extends U ? (arg: U) => void : never) extends (arg: infer T) => void ? T : never;
/**
 * Merge the intersection in an object.
 */
export type MergeInsertions<T> = T extends object ? { [K in keyof T]: T[K] } : T;