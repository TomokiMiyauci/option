// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** The option type. */
export enum OptionType {
  Some = "some",
  None = "none",
}

/** Common type. */
interface Container {
  /** Option type. */
  type: OptionType;
}

/** The {@link None} API. */
export interface None extends Container {
  type: OptionType.None;
}

/** The {@link Some} API. */
export interface Some<T> extends Container {
  type: OptionType.Some;

  /** Return contained {@link T}. */
  get get(): T;
}

export interface SomeConstructor {
  /** {@link Some} value of type {@link T } . */
  of<const T>(value: T): Some<T>;
}

/** No value. */
export const None: None = { type: OptionType.None };

/** {@link Some} constructor. */
export const Some: SomeConstructor = {
  of<T>(value: T): Some<T> {
    return {
      type: OptionType.Some,
      get get(): T {
        return value;
      },
    };
  },
};

/** Representation of {@link Some} or {@link None}. */
export type Option<T> = Some<T> | None;
