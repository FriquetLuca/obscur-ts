import { SnakeToCamel } from "./string";
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
 * IsNever<never> // true
 * IsNever<unknown> // false
 */
export type IsNever<T> = [T] extends [never] ? true : false;
/**
 * IsAny<any> // false
 * IsAny<unknown> // true
 */
export type NotAny<T> = true extends IsAny<T> ? false : true;
/**
 * NotNever<never> // false
 * NotNever<unknown> // true
 */
export type NotNever<T> = [T] extends [never] ? true : false;
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
export type ToPrimitive<T> = T extends object ? (T extends (...args: never[]) => unknown ? Function : { [Key in keyof T]: ToPrimitive<T[Key]> }) : (T extends { valueOf: () => infer P } ? P : T);
/**
 * PickOptional<{ name: string; age: number; address: string; }, "name" | "age"> // { name?:string; age?:number; address:string }
 */
export type PickOptional<T, U extends keyof T> = Omit<Partial<Pick<T, U & keyof T>> & Omit<T, U & keyof T>, never>;
/**
 * AppendField<{ id: '1' }, 'value', 4> // { value: 4; id: "1"; }
 */
export type AppendField<T, U extends string|number|symbol, V> = { [K in keyof T | U]: K extends keyof T ? T[K] : V; };
/**
 * From T, pick a set of properties whose type are assignable to U.
 */
export type PickType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] };
/**
 * UnionToIntersection<{ a: "x" } | { b : "y"}> // { a: "x" } & { b : "y"}
 */
export type UnionToIntersection<U> = (U extends U ? (arg: U) => void : never) extends (arg: infer T) => void ? T : never;
/**
 * OmitTypes<{ name: string; count: number; isReadonly: boolean; isEnable: boolean; }, boolean> // { name: string; count: number }
 */
export type OmitTypes<T, U> = { [P in keyof T as T[P] extends U ? never : P]: T[P] };
/**
 * ObjectEntries<{ name: string; age: number; locations: string[] | null; }> // ["name", string] | ["age", number] | ["locations", string[] | null];
 */
export type ObjectEntries<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T];
/**
 * NotUndefined<number | string | null | undefined> // number | string | null
 */
export type NotUndefined<T> = [T] extends [undefined] ? T : Exclude<T, undefined>;
/**
 * Defined<number | string | null | undefined> // number | string
 */
export type Defined<T> = [T] extends [undefined] ? T : [T] extends [null] ? T : Exclude<T, undefined | null>;
/**
 * Merge the intersection in an object.
 */
export type MergeInsertions<T> = T extends object ? { [K in keyof T]: T[K] } : T;
/**
 * MapTypes<{iWillBeANumberOneDay: string}, { from: string; to: number; }> // { iWillBeANumberOneDay: number; }
 * MapTypes<{iWillBeNumberOrDate: string}, { mapFrom: string; mapTo: Date;} | { mapFrom: string; mapTo: number;}> // { iWillBeNumberOrDate: number | Date; }
 */
export type MapTypes<T, R extends { from: unknown; to: unknown }> = { [K in keyof T]: T[K] extends R['from'] ? R extends { from: T[K] } ? R['to'] : never : T[K] };
/**
 * RemapTypes<{iWillBeANumberOneDay: string}, string, number> // { iWillBeANumberOneDay: number; }
 */
export type RemapTypes<T, From, To> = { [K in keyof T]: T[K] extends From ? To : T[K] };
/**
 * 
  type X = {
    readonly a: () => 1
    readonly b: string
    readonly c: {
      readonly d: boolean
      readonly e: {
        readonly g: {
          readonly h: {
            readonly i: true
            readonly j: "s"
          }
          readonly k: "hello"
        }
      }
    }
  };
  type Expected = {
    a: () => 1
    b: string
    c: {
      d: boolean
      e: {
        g: {
          h: {
            i: true
            j: "s"
          }
          k: "hello"
        }
      }
    }
  }
 * DeepMutable<X> // same as `Expected`
 */
export type DeepMutable<T extends object> = T extends (...args: unknown[]) => unknown ? T : { -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K] };
/**
 * PickMutableKeys<{ readonly foo: string; bar: number }> // "bar"
 */
export type PickMutableKeys<T> = keyof { [Key in keyof T as Equal<Pick<T, Key>, Readonly<Pick<T, Key>>> extends true ? never : Key ]: unknown };
/**
 * GetPaths<{ name: string; age: number }> // "name" | "age"
 * GetPaths<{ refCount: number; person: { name: string; age: number }; }> // "refCount" | "person" | "person.name" | "person.age"
 * GetPaths<{ books: [{ name: string; price: number }] }> // expected to be the superset of "books" | "books.0" | "books[0]" | "books.[0]" | "books.0.name" | "books.0.price" | "books.length" | "books.find"
 */
export type GetPaths<T extends unknown, K extends keyof T = keyof T> = T extends | Record<any, unknown> | unknown[] ? K extends keyof T & (string | number) ? `${T extends unknown[] ? `[${K}]` | K : K}${ | '' | `${T[K] extends unknown[] ? '' | '.' : '.'}${GetPaths<T[K]>}`}` : never : never;
/**
 * Intersection<[[1, 2], [2, 3], [2, 2]]> // 2
 * Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]> // 2 | 3
 * Intersection<[[1, 2], [3, 4], [5, 6]]> // never
 * Intersection<[[1, 2, 3], [2, 3, 4], 3]> // 3
 * Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]> // 2 | 3
 * Intersection<[[1, 2, 3], 2, 3]> // never
 */
export type Intersection<T> = T extends [infer First, ...infer Rest] ? ((First extends unknown[] ? First[number] : First) & Intersection<Rest>) : unknown;
type TypeGet<T, Paths> = Paths extends `${infer A}.${infer B}` ? A extends keyof T ? { [K in A]: TypeGet<T[A], B> } : never : Paths extends keyof T ? { [K in Paths]: T[Paths] } : never;
/**
  type obj = {
    name: "hoge", 
    age: 20,
    friend: {
      name: "fuga",
      age: 30,
      family: {
        name: "baz",  
        age: 1 
      }
    }
  }
  DeepPick<obj, "name"> // { name : "hoge" }
  DeepPick<obj, "name" | "friend.name">  // { name : "hoge" } & { friend: { name: "fuga" }}
  DeepPick<obj, "name" | "friend.name" |  "friend.family.name">  // { name : "hoge" } &  { friend: { name: "fuga" }} & { friend: { family: { name: "baz" }}}
 */
export type DeepPick<T, PathUnion extends string> = UnionToIntersection<PathUnion extends infer Keys ? TypeGet<T, Keys> : never>;
/**
 * Camelize<{ some_prop: string, prop: { another_prop: string }, array: [{ snake_case: string }] }> // { someProp: string, prop: { anotherProp: string }, array: [{ snakeCase: string }] }
 */
export type Camelize<T> = {
  default: { [K in keyof T as Camelize<K>]: Camelize<T[K]> },
  array: T extends [infer Head, ...(infer Tail)] ? [Camelize<Head>, ...Camelize<Tail>] : [],
  string: SnakeToCamel<T & string>
  terminal: T,
}[ T extends any[] ? 'array' : T extends DefinedDataType ? 'terminal' : T extends string ? 'string' : 'default' ];
/**
 * A type that is a defined value.
 */
export type DefinedDataType = number | boolean | symbol | bigint | Function;
/**
 * IsKeyRequired<{ a: number, b?: string }, "a"> // true
 * IsKeyRequired<{ a: number, b?: string }, "b"> // false
 * IsKeyRequired<{ a: number, b?: string }, "a" | "b"> // false
 */
export type IsKeyRequired<T, K extends keyof T> = T[K] extends NonNullable<T[K]> ? true : false;
/**
  type Data = {
    foo: {
      bar: {
        value: "foobar",
        count: 6,
      },
      included: true,
    },
    hello: "world"
  };
  Get<Data, "hello"> // "world"
  Get<Data, "foo.bar.count"> // 6
  Get<Data, "foo.bar"> // { value: "foobar", count: 6 }
 */
export type Get<T, K> = K extends `${infer A}.${infer B}` ? A extends keyof T ? Get<T[A], B> : never : K extends keyof T ? T[K] : never;
/**
 * GetRequired<{ foo: number, bar?: string }> // { foo: number }
 */
export type GetRequired<T> = { [P in keyof T as T[P] extends Required<T>[P] ? P : never]: T[P] };
/**
 * GetOptional<{ foo: number, bar?: string }> // { bar?: string }
 */
export type GetOptional<T, U extends Required<T> = Required<T>, K extends keyof T = keyof T> = Pick<T, K extends keyof T ? (T[K] extends U[K] ? never : K) : never>;
/**
 * GetRequiredKeys<{ foo: number; bar?: string }> // "foo"
 */
export type GetRequiredKeys<T , K = keyof T> = K extends keyof T ? T extends Required<Pick<T,K>> ? K : never : never;
/**
 * GetRequiredKeys<{ foo: number; bar?: string }> // "bar"
 */
export type GetOptionalKeys<T> = { [P in keyof T]-?: {} extends Pick<T,P> ? P : never}[keyof T];
/**
 * IsUnion<string>  // false
 * IsUnion<string|number>  // true
 * IsUnion<[string|number]>  // false
 */
export type IsUnion<T, B = T> = T extends B ? [B] extends [T] ? false : true : never;
/**
 * RemoveIndexSignature<{ [key: string]: any; foo(): void; }> // { foo(): void }
 */
export type RemoveIndexSignature<T> = { [Key in keyof T as Key extends `${infer ConcreteKey}` ? ConcreteKey : never ]: T[Key] };
/**
 * Merge<{ name: string; age: string }, { age: number; sex: string }> // {name: string, age: number, sex: string}
 */
export type Merge<F, S> = { [K in keyof F | keyof S]: K extends keyof S ? S[K] : K extends keyof F ? F[K] : never; };
/**
 * Mutable<{ readonly title: string; readonly description: string; readonly completed: boolean}> // { title: string; description: string; completed: boolean; }
 */
export type Mutable<T> = { -readonly [K in keyof T]:T[K] };
/**
 * RequiredByKeys<{  name?: string; age?: number; address?: string }, "name"> // { name: string; age?: number; address?: string }
 */
export type RequiredByKeys<T , K = keyof T> = Omit<T & Required<Pick<T,K & keyof T>>, never>;
/**
 * Assign<{ a: "a" }, { b: "b" }> // { a: "a",  b: "b" }
 * Assign<{ a: "a", d: { hi: "hi" } }, { a: "a1", b: "b" }, { b: "b2", c: "c" }> // { a: "a1", b: "b2", c: "c", d: { hi: "hi" } }
 */
export type Assign<T extends Record<string, unknown>, U extends unknown[]> = U extends [infer F,...infer L] ? F extends Record<string,unknown> ?  Assign<Omit<T, keyof F> & F, L> : Assign<T,L> : MergeInsertions<T>;
/**
 * LastInUnion<1 | 2> // 2
 */
export type LastInUnion<U> = UnionToIntersection<U extends unknown ? (x: U) => 0 : never> extends (x: infer L) => 0 ? L : never;
/**
  declare const example: {
    foo: {
        bar: {
            a: string;
        };
        baz: {
            b: number
            c: number
        }
    };
  }
// Possible solutions: 
// []
// ['foo']
// ['foo', 'bar']
// ['foo', 'bar', 'a']
// ['foo', 'baz']
// ['foo', 'baz', 'b']
// ['foo', 'baz', 'c']
 */
export type TreePathArray<T> = T extends object ? { [P in keyof T]: [P, ...TreePathArray<T[P]>] | [P]; }[keyof T] | [] : never;
/**
 * CapitalizeNestObjectKeys<{ foo: { bar: { a: string; }; baz: { b: number; c: number } }> // { Foo: { Bar: { A: string; }; Baz: { B: number; C: number; }; }; }
 */
export type CapitalizeObjectKeysNested<T> = T extends unknown[] ? { [K in keyof T]: CapitalizeObjectKeysNested<T[K]>; } : T extends Record<keyof unknown, unknown> ? { [K in keyof T as Capitalize<K & string>]: CapitalizeObjectKeysNested<T[K]>; } : T;