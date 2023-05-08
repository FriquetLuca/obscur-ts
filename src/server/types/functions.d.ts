/**
 * For given function type Fn, and any type A, AppendArg will produce a function of type G which will be the same as Fn but with appended argument A as a last one.
 */
export type AppendArg<Fn, A> = Fn extends (...args: infer R) => infer T ? (...args: [...R, A]) => T : never;
/**
 * Get the return type of a function or a promise (if it's a promise, it omit the promise unlike ReturnType).
 */
export type ReturnTypeValue<Fn> = Fn extends (...args: unknown[]) => Promise<infer T> ? T : Fn extends (...args: unknown[]) => infer T ? T : never;
/**
 * Return true if the function return a promise, otherwise false. If the type is not a function, it returns never.
 */
export type IsPromise<Fn> = Fn extends (...args: unknown[]) => infer T ? T extends Promise<unknown> ? true : false : never;