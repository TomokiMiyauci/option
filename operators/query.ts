// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { type None, type Option, OptionType, type Some } from "../spec.ts";

/** Returns `true` if the {@linkcode option} is a {@linkcode Some}.
 *
 * @example
 * ```ts
 * import { isSome, Option, Some } from "https://deno.land/x/optio/mod.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * const option: Option<number> = Some(2);
 * assert(isSome(option));
 * ```
 */
export function isSome<T>(option: Readonly<Option<T>>): option is Some<T> {
  return option.type === OptionType.Some;
}

/** Returns `true` if the {@linkcode option} is a {@linkcode None}.
 *
 * @example
 * ```ts
 * import { isNone, None, Option } from "https://deno.land/x/optio/mod.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * const option: Option<unknown> = None;
 * assert(isNone(option));
 * ```
 */
export function isNone(option: Readonly<Option<unknown>>): option is None {
  return option.type === OptionType.None;
}
