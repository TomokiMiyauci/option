// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNone, isSome } from "./query.ts";
import { None, type Option, Some } from "../spec.ts";

/** Maps an {@linkcode Option<T>} to {@linkcode Option<U>} by applying a function to a contained value(if {@linkcode Some}) or returns {@linkcode None}(if {@linkcode None}).
 *
 * @example
 * ```ts
 * import { map, Option, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const option: Option<string> = Some("Hello, World!");
 * const optionLen = map(option, (v) => v.length);
 *
 * assertEquals(optionLen, Some(13));
 * ```
 */
export function map<T, U>(
  option: Option<T>,
  fn: (value: T) => U,
): Option<U> {
  if (isSome(option)) return Some(fn(option.get));

  return option;
}

/** Returns the provided default value (if {@linkcode None}), or applies a function to the contained value (if {@linkcode Some}).
 *
 * @example
 * ```ts
 * import { mapOr, Option, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const option: Option<string> = Some("Hello");
 * assertEquals(mapOr(option, 0, ({ length }) => length), 5);
 * ```
 */
export function mapOr<T, U>(
  option: Option<T>,
  defaultValue: U,
  fn: (value: T) => U,
): U {
  if (isNone(option)) return defaultValue;

  return fn(option.get);
}

/** Computes a default function result (if {@linkcode None}), or applies a different function to the contained value (if {@linkcode Some}).
 *
 * @example
 * ```ts
 * import { mapOrElse, Option, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const option: Option<string> = Some("Hello");
 * assertEquals(mapOrElse(option, () => 2 ** 3, ({ length }) => length), 5);
 * ```
 */
export function mapOrElse<T, U>(
  option: Option<T>,
  defaultFn: () => U,
  fn: (value: T) => U,
): U {
  if (isNone(option)) return defaultFn();

  return fn(option.get);
}

/** Returns {@linkcode None} if the {@linkcode option} is {@linkcode None}, otherwise calls predicate with the wrapped value and returns:
 * - {@linkcode Some} if predicate returns `true`.
 * - {@linkcode None} if predicate returns `false`.
 *
 * @example
 * ```ts
 * import { type Option } from "https://deno.land/x/optio/spec.ts";
 * import { filter } from "https://deno.land/x/optio/operators/transform.ts";
 * import { assertType, IsExact } from "https://deno.land/std/testing/types.ts";
 *
 * declare const isString: (value: unknown) => value is string;
 * declare const option: Option<string | number>;
 *
 * const opt = filter(option, isString);
 * assertType<IsExact<typeof opt, Option<string>>>(true);
 * ```
 */
export function filter<T, U extends T = T>(
  option: Option<T>,
  guard: (value: T) => value is U,
): Option<U>;

/**
 * @example
 * ```ts
 * import { None, Some } from "https://deno.land/x/optio/spec.ts";
 * import { filter } from "https://deno.land/x/optio/operators/transform.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const isEven: (value: number) => boolean;
 *
 * assertEquals(filter(Some(0), isEven), Some(0));
 * assertEquals(filter(Some(1), isEven), None);
 * assertEquals(filter(None, isEven), None);
 * ```
 */
export function filter<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): Option<T>;
export function filter<T>(
  option: Option<T>,
  predicate: (value: T) => boolean,
): Option<T> {
  if (isNone(option)) return option;
  if (predicate(option.get)) return option;

  return None;
}

/** Converts from {@linkcode Option<Option<T>>} to {@linkcode Option<T>}.
 * @example
 * ```ts
 * import { type Option, Some } from "https://deno.land/x/optio/spec.ts";
 * import { flat } from "https://deno.land/x/optio/operators/transform.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const option: Option<Option<number>> = Some(Some(0));
 * assertEquals(flat(option), Some(0));
 * ```
 */
export function flat<T>(option: Option<Option<T>>): Option<T> {
  if (isNone(option)) return option;

  return option.get;
}

/** Zips {@linkcode option} with another {@linkcode Option}.
 *
 * If {@linkcode option} is {@linkcode Some<T>} and other is {@linkcode Some<U>},
 * returns {@linkcode Some<[T, U]>}; Otherwise {@linkcode None}.
 *
 * @example
 * ```ts
 * import { None, Some } from "https://deno.land/x/optio/spec.ts";
 * import { zip } from "https://deno.land/x/optio/operators/transform.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(zip(Some(0), Some(1)), Some<[0, 1]>([0, 1]));
 * assertEquals(zip(Some(0), None), None);
 * ```
 */
export function zip<T, U>(
  option: Option<T>,
  other: Option<U>,
): Option<[T, U]> {
  if (isNone(option) || isNone(other)) return None;

  const tuple: [T, U] = [option.get, other.get];
  return Some(tuple);
}
