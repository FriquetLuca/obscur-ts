/**
 * AppendArg<(args_0: number) => void, string> // (args_0: number, args_1: string) => void
 */
export type AppendArg<Fn, A> = Fn extends (...args: infer R) => infer T ? (...args: [...R, A]) => T : never;
/**
 * ReturnTypeValue<() => number> // number
 * ReturnTypeValue<() => Promise<number>> // number
 */
export type ReturnTypeValue<Fn> = Fn extends (...args: unknown[]) => Promise<infer T> ? T : Fn extends (...args: unknown[]) => infer T ? T : never;
/**
 * ReturnTypeValue<number> // false
 * ReturnTypeValue<() => number> // false
 * ReturnTypeValue<() => Promise<number>> // true
 */
export type IsPromise<Fn> = Fn extends (...args: unknown[]) => infer T ? T extends Promise<unknown> ? true : false : false;