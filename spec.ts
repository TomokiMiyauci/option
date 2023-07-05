// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** The option type. */
export enum OptionType {
  None,
  Some,
}

/** Common type. */
interface Container {
  /** Option type. */
  get type(): OptionType;
}

/** The {@link None} API. */
export interface None extends Container {
  get type(): OptionType.None;
}

/** The {@link Some} API. */
export interface Some<T> extends Container {
  get type(): OptionType.Some;

  /** Return contained {@link T}. */
  get get(): T;
}

export interface SomeConstructor {
  /** {@link Some} value of type {@link T } . */
  <const T>(value: T): Some<T>;
}

/** No value. */
export const None: None = { type: OptionType.None };

/** {@link Some} constructor.
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

/** Representation of {@link Some} or {@link None}. */
export type Option<T> = Some<T> | None;
