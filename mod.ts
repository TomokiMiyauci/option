// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Optional values.
 * Type `Option` represents an optional value: every `Option` is either `Some` and contains a value, or `None`, and does not.
 *
 * ## Querying the variant
 * The `isSome` and `isNone` return `true` if the `Option` is `Some` or `None`,
 * respectively.
 *
 * @module
 */

export { None, type Option, Some } from "./spec.ts";
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
