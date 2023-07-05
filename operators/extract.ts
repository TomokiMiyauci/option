// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isSome } from "./query.ts";
import { type Option } from "../spec.ts";

/** Returns the contained {@linkcode Some} value.
 *
 * @example
 * ```ts
 * import { Some } from "https://deno.land/x/optio/spec.ts";
 * import { unwrap } from "https://deno.land/x/optio/operators/extract.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(unwrap(Some(0)), 0);
 * ```
 * @throws {Error} if the {@linkcode option} is {@linkcode None}.
 * @example
 * ```ts
 * import { None } from "https://deno.land/x/optio/spec.ts";
 * import { unwrap } from "https://deno.land/x/optio/operators/extract.ts";
 * import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertThrows(() => unwrap(None));
 * ```
 */
export function unwrap<T>(option: Option<T>): T {
  if (isSome(option)) return option.get;

  throw new Error("option is None");
}

/** Returns the contained {@linkcode Some} value, otherwise {@linkcode defaultValue}.
 *
 * @example
 * ```ts
 * import { None, Some } from "https://deno.land/x/optio/spec.ts";
 * import { unwrapOr } from "https://deno.land/x/optio/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(unwrapOr(Some(0), 1), 0);
 * assertEquals(unwrapOr(None, 1), 1);
 * ```
 */
export function unwrapOr<T>(option: Option<T>, defaultValue: T): T {
  if (isSome(option)) return option.get;

  return defaultValue;
}

/** Returns the contained {@linkcode Some} value, otherwise computes it from a closure.
 *
 * @example
 * ```ts
 * import { None, Some } from "https://deno.land/x/optio/spec.ts";
 * import { unwrapOrElse } from "https://deno.land/x/optio/operators/extract.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(unwrapOrElse(Some(0), () => 2 ** 3), 0);
 * assertEquals(unwrapOrElse(None, () => 2 ** 3), 8);
 * ```
 */
export function unwrapOrElse<T>(option: Option<T>, fn: () => T): T {
  if (isSome(option)) return option.get;

  return fn();
}

/** Returns the contained `Some` value.
 *
 * @example
 * ```ts
 * import { Some } from "https://deno.land/x/optio/spec.ts";
 * import { expect } from "https://deno.land/x/optio/operators/extract.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const option = Some(0);
 * declare const message: string;
 *
 * assertEquals(expect(option, message), 0);
 * ```
 *
 * @throws {Error} {@linkcode msg}
 * @example
 * ```ts
 * import { None } from "https://deno.land/x/optio/spec.ts";
 * import { expect } from "https://deno.land/x/optio/mod.ts";
 * import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const message: string;
 * assertThrows(() => expect(None, message), Error, message);
 * ```
 *
 * Change error constructor:
 * @example
 * ```ts
 * import { None } from "https://deno.land/x/optio/spec.ts";
 * import { expect } from "https://deno.land/x/optio/mod.ts";
 * import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const message: string;
 * assertThrows(() => expect(None, message, RangeError), RangeError, message);
 * ```
 */
export function expect<T>(
  option: Option<T>,
  msg: string,
  error: ErrorConstructor = Error,
): T {
  if (isSome(option)) return option.get;

  throw new error(msg);
}

/** {@linkcode Option} matcher. */
export interface Matcher<T, U> {
  /** Match on {@linkcode Some}. */
  Some: (value: T) => U;

  /** Match on {@linkcode None}. */
  None: () => U;
}

/** Pattern matching for {@linkcode option}. Match on {@linkcode matcher.Some} if {@linkcode Some}, otherwise match on {@linkcode matcher.None}.
 *
 * @example
 * ```ts
 * import { None, type Option } from "https://deno.land/x/optio/spec.ts";
 * import { match } from "https://deno.land/x/optio/operators/extract.ts";
 *
 * declare const option: Option<number>;
 *
 * match(option, {
 *  Some: (value) => value,
 *  None: () => 500,
 * });
 * ```
 */
export function match<T, U>(
  option: Option<T>,
  matcher: Readonly<Matcher<T, U>>,
): U {
  if (isSome(option)) return matcher.Some(option.get);

  return matcher.None();
}
