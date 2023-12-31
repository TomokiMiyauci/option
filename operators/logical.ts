// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNone, isSome } from "./query.ts";
import { None, type Option, Some } from "../spec.ts";

/** Returns the {@linkcode option} if it contains a value, otherwise returns {@linkcode obtb}.
 *
 * @example
 * ```ts
 * import { None, or, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const x = Some(2);
 * assertEquals(or(x, None), Some(2));
 *
 * const y = None;
 * assertEquals(or(y, Some(100)), Some(100));
 * ```
 */
export function or<T>(option: Option<T>, obtb: Option<T>): Option<T> {
  if (isSome(option)) return option;

  return obtb;
}

/** Returns the {@linkcode option} if it {@linkcode Some}, otherwise calls {@linkcode fn} and returns the result.
 *
 * @example
 * ```ts
 * import { orElse } from "https://deno.land/x/optio/operators/logical.ts";
 * import { None, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(orElse(Some(0), () => Some(1)), Some(0));
 * assertEquals(orElse(None, () => Some(1)), Some(1));
 * ```
 */
export function orElse<T>(option: Option<T>, fn: () => Option<T>): Option<T> {
  if (isSome(option)) return option;

  return fn();
}

/** Returns {@linkcode None} if the {@linkcode option} is {@linkcode None}, otherwise returns {@linkcode optb}.
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

/** Returns {@linkcode None} if the {@linkcode option} is {@linkcode None}, otherwise calls {@linkcode fn} with the wrapped value and returns the result.
 *
 * @example
 * ```ts
 * import { None, Some } from "https://deno.land/x/optio/spec.ts";
 * import { andThen } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const square: (value: number) => number;
 *
 * assertEquals(andThen(Some(3), square), Some(9));
 * assertEquals(andThen(None, square), None);
 * ```
 */
export function andThen<T, U>(
  option: Option<T>,
  fn: (value: T) => U,
): Option<U> {
  if (isNone(option)) return option;

  return Some(fn(option.get));
}

/** Returns {@linkcode Some} if exactly one of {@linkcode option}, {@linkcode optb} is {@linkcode Some}, otherwise returns {@linkcode None}.
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
