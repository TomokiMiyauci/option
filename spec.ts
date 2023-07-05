// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** The option type. */
export enum OptionType {
  None,
  Some,
}

/** Common type. */
interface Container {
  /** {@linkcode Option} type. */
  get type(): OptionType;
}

/** The {@linkcode None} API. */
export interface None extends Container {
  get type(): OptionType.None;
}

/** The {@linkcode Some} API. */
export interface Some<T> extends Container {
  get type(): OptionType.Some;

  /** Return contained {@linkcode T}. */
  get get(): T;
}

export interface SomeConstructor {
  /** {@linkcode Some} value of type {@linkcode T} . */
  <const T>(value: T): Some<T>;
}

/** No value. */
export const None: None = { type: OptionType.None };

/** {@linkcode Some} constructor.
 *
 * @example
 * ```ts
 * import { Some } from "https://deno.land/x/optio/mod.ts";
 * const some = Some(0);
 * ```
 */
export const Some: SomeConstructor = function Some<T>(value: T): Some<T> {
  return {
    get type(): OptionType.Some {
      return OptionType.Some;
    },
    get get(): T {
      return value;
    },
  };
};

/** Representation of {@linkcode Some} or {@linkcode None}. */
export type Option<T> = Some<T> | None;
