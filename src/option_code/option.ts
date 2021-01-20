/* Brian and Maryam */
import React from "react";

export enum Options {
  none,
  some,
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
  const Vv: Option<number> = isEven(1);

  if (isSome(Vv)) {
    console.log("Hey Hey Hey... Bingo!", Vv);
  } else {
    console.log("Ooooops!!");
  }
};
