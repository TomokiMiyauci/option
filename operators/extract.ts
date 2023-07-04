// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isSome } from "./query.ts";
import { type Option } from "../spec.ts";

/** Returns the contained `Some` value.
 *
 * @example
 * ```ts
 * import { Some } from "https://deno.land/x/optio/spec.ts";
 * import { unwrap } from "https://deno.land/x/optio/operators/extract.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(unwrap(Some.of(0)), 0);
 * ```
 * @throws {Error} if the {@link option} is `None`.
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
