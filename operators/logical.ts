// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isSome } from "./query.ts";
import { type Option } from "../spec.ts";

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
