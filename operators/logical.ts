// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNone, isSome } from "./query.ts";
import { None, type Option, Some } from "../spec.ts";

/** Returns the {@link option} if it contains a value, otherwise returns {@link obtb}.
 *
 * @example
 * ```ts
 * import { None, or, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const x = Some.of(2);
 * assertEquals(or(x, None), Some.of(2));
 *
 * const y = None;
 * assertEquals(or(y, Some.of(100)), Some.of(100));
 * ```
 */
export function or<T>(option: Option<T>, obtb: Option<T>): Option<T> {
  if (isSome(option)) return option;

  return obtb;
}

/** Returns the {@link option} if it {@link Some}, otherwise calls {@link fn} and returns the result.
 *
 * @example
 * ```ts
 * import { orElse } from "https://deno.land/x/optio/operators/logical.ts";
 * import { None, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(orElse(Some.of(0), () => Some.of(1)), Some.of(0));
 * assertEquals(orElse(None, () => Some.of(1)), Some.of(1));
 * ```
 */
export function orElse<T>(option: Option<T>, fn: () => Option<T>): Option<T> {
  if (isSome(option)) return option;

  return fn();
}

/** Returns `None` if the `option` is `None`, otherwise returns `optb`.
 *
 * @example
 * ```ts
 * import { and } from "https://deno.land/x/optio/operators/logical.ts";
 * import { None, Some } from "https://deno.land/x/optio/spec.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const some: Some<unknown>;
 * declare const someb: Some<unknown>;
 *
 * assertEquals(and(some, None), None);
 * assertEquals(and(some, someb), someb);
 * assertEquals(and(None, some), None);
 * assertEquals(and(None, None), None);
 * ```
 */
export function and<T>(option: Option<unknown>, optb: Option<T>): Option<T> {
  if (isNone(option)) return option;

  return optb;
}

/** Returns {@link None} if the {@link option} is {@link None}, otherwise calls {@link fn} with the wrapped value and returns the result.
 *
 * @example
 * ```ts
 * import { None, Some } from "https://deno.land/x/optio/spec.ts";
 * import { andThen } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const square: (value: number) => number;
 *
 * assertEquals(andThen(Some.of(3), square), Some.of(9));
 * assertEquals(andThen(None, square), None);
 * ```
 */
export function andThen<T, U>(
  option: Option<T>,
  fn: (value: T) => U,
): Option<U> {
  if (isNone(option)) return option;

  return Some.of(fn(option.get));
}

/** Returns `Some` if exactly one of {@link option}, {@link optb} is `Some`, otherwise returns `None`.
 *
 * @example
 * ```ts
 * import { xor } from "https://deno.land/x/optio/operators/logical.ts";
 * import { None, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const some: Some<unknown>;
 * declare const someb: Some<unknown>;
 *
 * assertEquals(xor(some, None), some);
 * assertEquals(xor(None, someb), someb);
 * assertEquals(xor(some, someb), None);
 * assertEquals(xor(None, None), None);
 * ```
 */
export function xor<T>(option: Option<T>, optb: Option<T>): Option<T> {
  if (isSome(option)) {
    if (isSome(optb)) return None;

    return option;
  }

  return optb;
}
