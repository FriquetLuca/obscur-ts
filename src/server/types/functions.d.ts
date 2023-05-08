/**
 * For given function type Fn, and any type A, AppendArg will produce a function of type G which will be the same as Fn but with appended argument A as a last one.
 */
export type AppendArg<Fn, A> = Fn extends (...args: infer R) => infer T ? (...args: [...R, A]) => T : never;