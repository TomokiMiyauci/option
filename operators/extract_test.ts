// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { expect, unwrap } from "./extract.ts";
import { None, Some } from "../spec.ts";
import { assertEquals, assertThrows, describe, it } from "../_dev_deps.ts";

describe("unwrap", () => {
  it("should return some value", () => {
    assertEquals(unwrap(Some.of(0)), 0);
  });

  it("should throw error if None", () => {
    assertThrows(() => unwrap(None), Error, "option is None");
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
