// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNone, isSome } from "./query.ts";
import { None, type Option, Some } from "../spec.ts";

/** Maps an `Option<T>` to `Option<U>` by applying a function to a contained value(if `Some`) or returns `None`(if `None`).
 *
 * @example
 * ```ts
 * import { map, Option, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const option: Option<string> = Some.of("Hello, World!");
 * const optionLen = map(option, (v) => v.length);
 *
 * assertEquals(optionLen, Some.of(13));
 * ```
 */
export function map<T, U>(
  option: Option<T>,
  fn: (value: T) => U,
): Option<U> {
  if (isSome(option)) return Some.of(fn(option.get));

  return option;
}

/** Returns the provided default value (if `None`), or applies a function to the contained value (if `Some`).
 *
 * @example
 * ```ts
 * import { mapOr, Option, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const option: Option<string> = Some.of("Hello");
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

/** Computes a default function result (if `None`), or applies a different function to the contained value (if `Some`).
 *
 * @example
 * ```ts
 * import { mapOrElse, Option, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const option: Option<string> = Some.of("Hello");
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

/** Returns {@link None} if the {@link option} is {@link None}, otherwise calls predicate with the wrapped value and returns:
 * - {@link Some} if predicate returns `true`.
 * - {@link None} if predicate returns `false`.
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
 * assertEquals(filter(Some.of(0), isEven), Some.of(0));
 * assertEquals(filter(Some.of(1), isEven), None);
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
