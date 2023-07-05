// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Optional values.
 * Type {@linkcode Option} represents an optional value: every {@link Option} is either `Some` and contains a value, or {@link None}, and does not.
 *
 * ## Querying the variant
 * The {@link isSome} and {@link isNone} return `true` if the {@link Option} is {@link Some} or {@link None},
 * respectively.
 *
 * @module
 */

export { None, type Option, OptionType, Some } from "./spec.ts";
export {
  filter,
  flat,
  map,
  mapOr,
  mapOrElse,
  zip,
} from "./operators/transform.ts";
export { isNone, isSome } from "./operators/query.ts";
export { and, andThen, or, orElse, xor } from "./operators/logical.ts";
export {
  expect,
  match,
  type Matcher,
  unwrap,
  unwrapOr,
  unwrapOrElse,
} from "./operators/extract.ts";
