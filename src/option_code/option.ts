/* Brian and Maryam */
import React from "react";

export enum Options {
  none = "none",
  some = "some",
}

export interface None {
  side: Options.none;
}

export interface Some<T> {
  side: Options.some;
  value: T;
}

export type Option<A> = None | Some<A>;

export const isSome = <T>(val: any): val is Some<T> => {
  return (val as Some<T>).side === Options.some;
};

export const isNone = <T>(val: any): val is None => {
  return (val as None).side === Options.none;
};

export const some = <T>(val: T): Some<T> => {
  return { side: Options.some, value: val };
};

export const none = (): None => {
  return { side: Options.none };
};

const isEven = (p: number): Option<number> => {
  if (p % 2 === 0) {
    return some(p);
  } else {
    return none();
  }
};

export const TestFunc = () => {
  const Vv: Option<number> = isEven(2);

  if (isSome(Vv)) {
    console.log("Hey Hey Hey... Bingo!", Vv);
  } else {
    console.log("Ooooops!!");
  }
};

/* Map function */

// export declare const map: <A, B>(
//   f: (a: A) => B
// ) => (fa: Option<A>) => Option<B>;

export const mapT: <A, B>(f: (a: A) => B, fa: Option<A>) => Option<B> = (
  f,
  fa
) => (isNone(fa) ? none() : some(f(fa.value)));

const calc = (n: number): number => {
  return n * 2;
};

const Tt: Option<number> = isEven(2);

const P = mapT(calc, isEven(2));

console.log(P);

/* Fold function */

export function foldF<A, B>(
  onNone: () => B,
  onSome: (a: A) => B
): (ma: Option<A>) => B {
  return (ma) => (isNone(ma) ? onNone() : onSome(ma.value));
}

const f: () => string = () => "a none";

const D = foldF(f, (a) => `a some containing ${a}`);
// const G = foldF(f, (a) => `a some containing ${a}`);

console.log(D(isEven(2)));
console.log(D(isEven(1)));

/* Filter function */

/* export const filterMap: <A, B>(
  f: (a: A) => Option<B>,
  fa: (p: Option<A>) => Option<B>
) => Option<B> = (f, fa) => (isNone(fa) ? none() : f(fa)); */

export const filterMapM: <A, B>(
  f: (a: A) => Option<B>,
  fa: Option<A>
) => Option<B> = (f, fa) => (isNone(fa) ? none() : f(fa.value));

const E = filterMapM(() => isEven(1), some(2));

console.log(E);
