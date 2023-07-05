// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Optional values.
 * Type {@linkcode Option} represents an optional value: every {@linkcode Option} is either {@linkcode Some} and contains a value, or {@linkcode None}, and does not.
 *
 * ## Querying the variant
 * The {@linkcode isSome} and {@linkcode isNone} return `true` if the {@linkcode Option} is {@linkcode Some} or {@linkcode None},
 * respectively.
 *
 * ## Extracting the contained value
 * Extract the contained value in an {@linkcode Option<T>} when it is the {@linkcode Some}.
 *
 * If the {@linkcode Option} is {@linkcode None}:
 * - {@linkcode expect} throws with a provided custom message
 * - {@linkcode unwrap} throws with generic message
 * - {@linkcode unwrapOr} returns the provided default value
 * - {@linkcode unwrapOrElse} returns the result of evaluating the provided function
 *
 * ## Transforming contained values
 * Transform the {@linkcode Some}:
 * - {@linkcode filter} calls the provided predicate function on the contained value `T` if the {@linkcode Option} is {@linkcode Some<T>},
 * and returns {@linkcode Some<T>} if the function returns `true`; otherwise, returns {@linkcode None}
 * - {@linkcode flat} removes one level of nesting from an {@linkcode Option<Option<T>>}
 * - {@linkcode map} transforms {@linkcode Option<T>} to {@linkcode Option<U>} by applying the provided function to the contained value of {@linkcode Some} and leaving {@linkcode None} values unchanged
 *
 * Transform {@linkcode Option<T>} to a value of a possibly different type `U`:
 * - {@linkcode mapOr} applies the provided function to the contained value of {@linkcode Some}, or returns the provided default value if the {@linkcode Option} is {@linkcode None}
 * - {@linkcode mapOrElse} applies the provided function to the contained value of {@linkcode Some}, or returns the result of evaluating the provided fallback function if the {@linkcode Option} is {@linkcode None}
 *
 * Combine the {@linkcode Some} of two {@linkcode Option} values:
 * - {@linkcode zip} returns {@linkcode Some<[T, U]>} if `option` is {@linkcode Some<T>} and the provided {@linkcode Option} value is {@linkcode Some<U>}; otherwise, returns {@linkcode None}
 *
 * ## Logical operators
 * Treat the {@linkcode Option} as a boolean value, where {@linkcode Some} acts like `true` and {@linkcode None} acts like `false`.
 *
 * The {@linkcode and}, {@linkcode or}, and {@linkcode xor} take another {@linkcode Option}, and produce an {@linkcode Option} as output.
 * Only the {@linkcode and} can produce an {@linkcode Option<U>} value having a different inner type `U` than {@linkcode Option<T>}.
 *
 * | name            | option    | input     | output    |
 * | --------------- | --------- | --------- | --------- |
 * | {@linkcode and} | `None`    | -         | `None`    |
 * | {@linkcode and} | `Some<T>` | `None`    | `None`    |
 * | {@linkcode and} | `Some<T>` | `Some<U>` | `Some<U>` |
 * | {@linkcode or}  | `None`    | `None`    | `None`    |
 * | {@linkcode or}  | `None`    | `Some<U>` | `Some<U>` |
 * | {@linkcode or}  | `Some<T>` | -         | `Some<T>` |
 * | {@linkcode xor} | `None`    | `None`    | `None`    |
 * | {@linkcode xor} | `None`    | `Some<U>` | `Some<U>` |
 * | {@linkcode xor} | `Some<T>` | `None`    | `Some<T>` |
 * | {@linkcode xor} | `Some<T>` | `Some<U>` | `None`    |
 *
 * The {@linkcode andThen} and {@linkcode orElse} take a function as input, and
 * only evaluate the function when they need to produce a new value.
 * Only the {@linkcode andThen} can produce an {@linkcode Option<U>} value having a different inner type `U` than {@linkcode Option<T>}.
 *
 * | name                | option    | function input | function result | output    |
 * | ------------------- | --------- | -------------- | --------------- | --------- |
 * | {@linkcode andThen} | `None`    | -              | -               | `None`    |
 * | {@linkcode andThen} | `Some<T>` | `T`            | `None`          | `None`    |
 * | {@linkcode andThen} | `Some<T>` | `T`            | `Some<U>`       | `Some<U>` |
 * | {@linkcode orElse}  | `None`    | -              | `None`          | `None`    |
 * | {@linkcode orElse}  | `None`    | -              | `Some<U>`       | `Some<U>` |
 * | {@linkcode orElse}  | `Some<T>` | -              | -               | `Some<T>` |
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
