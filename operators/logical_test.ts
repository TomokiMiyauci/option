// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { and, andThen, or, orElse, xor } from "./logical.ts";
import { None, Some } from "../spec.ts";
import {
  assert,
  assertEquals,
  assertSpyCallArgs,
  assertSpyCalls,
  describe,
  it,
  spy,
} from "../_dev_deps.ts";

describe("or", () => {
  it("should return option if it is Some", () => {
    const option = Some(0);
    assert(or(option, Some(0)) === option);
    assert(or(option, None) === option);
  });

  it("should return optb if it is None", () => {
    const optb = Some(0);
    assert(or(None, optb) === optb);
    assert(or(None, None) === None);
  });
});

describe("and", () => {
  it("should return Some if both of arg is some otherwise None", () => {
    const some = Some(0);
    const someb = Some(1);

    assert(and(some, None) === None);
    assert(and(some, someb) === someb);
    assert(and(None, some) === None);
    assert(and(None, None) === None);
  });
});

describe("xor", () => {
  it("should return Some if one of option or optb is Some, otherwise None", () => {
    const option = Some(0);
    const optb = Some(0);

    assert(xor(option, None) === option);
    assert(xor(None, optb) === optb);
    assert(xor(Some(0), Some(1)) === None);
    assert(xor(None, None) === None);
  });
});

describe("andThen", () => {
  it("should return Some and call fn if option is Some", () => {
    const fn = spy((v: number) => v ** 3);
    assertEquals(andThen(Some(2), fn), Some(8));
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [2]);
  });

  it("should return None if option is None", () => {
    const fn = spy((v: number) => v ** 3);
    assertEquals(andThen(None, fn), None);
    assertSpyCalls(fn, 0);
  });
});

describe("orElse", () => {
  it("should return Some and call fn if option is Some", () => {
    const fn = spy(() => Some(1));
    assertEquals(orElse(Some(0), fn), Some(0));
    assertSpyCalls(fn, 0);
  });

  it("should return None if option is None", () => {
    const fn = spy(() => Some(1));
    assertEquals(orElse(None, fn), Some(1));
    assertSpyCalls(fn, 1);
  });
});
