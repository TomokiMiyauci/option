// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { expect, unwrap, unwrapOr, unwrapOrElse } from "./extract.ts";
import { None, Some } from "../spec.ts";
import {
  assertEquals,
  assertSpyCalls,
  assertThrows,
  describe,
  it,
  spy,
} from "../_dev_deps.ts";

describe("unwrap", () => {
  it("should return some value", () => {
    assertEquals(unwrap(Some.of(0)), 0);
  });

  it("should throw error if None", () => {
    assertThrows(() => unwrap(None), Error, "option is None");
  });
});

describe("unwrapOr", () => {
  it("should some value if some", () => {
    assertEquals(unwrapOr(Some.of(0), 1), 0);
  });

  it("should default value if None", () => {
    assertEquals(unwrapOr(None, 1), 1);
  });
});

describe("unwrapOrElse", () => {
  it("should some value if some", () => {
    const fn = spy(() => 1);
    assertEquals(unwrapOrElse(Some.of(0), fn), 0);
    assertSpyCalls(fn, 0);
  });

  it("should default value if None", () => {
    const fn = spy(() => 1);
    assertEquals(unwrapOrElse(None, fn), 1);
    assertSpyCalls(fn, 1);
  });
});

describe("expect", () => {
  it("should return some value", () => {
    assertEquals(expect(Some.of(0), ""), 0);
  });

  it("should throw error if None", () => {
    const message = "<message>";
    assertThrows(() => expect(None, message), Error, message);
  });

  it("should throw custom error instance if None", () => {
    const message = "<message>";
    assertThrows(() => expect(None, message, RangeError), RangeError, message);
  });
});
