// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isSome } from "./query.ts";
import { type Option, Some } from "../spec.ts";

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
