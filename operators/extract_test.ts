// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { expect, match, unwrap, unwrapOr, unwrapOrElse } from "./extract.ts";
import { None, Some } from "../spec.ts";
import {
  assertEquals,
  assertSpyCallArgs,
  assertSpyCalls,
  assertThrows,
  describe,
  it,
  spy,
} from "../_dev_deps.ts";

describe("unwrap", () => {
  it("should return some value", () => {
    assertEquals(unwrap(Some(0)), 0);
  });

  it("should throw error if None", () => {
    assertThrows(() => unwrap(None), Error, "option is None");
  });
});

describe("unwrapOr", () => {
  it("should some value if some", () => {
    assertEquals(unwrapOr(Some(0), 1), 0);
  });

  it("should default value if None", () => {
    assertEquals(unwrapOr(None, 1), 1);
  });
});

describe("unwrapOrElse", () => {
  it("should some value if some", () => {
    const fn = spy(() => 1);
    assertEquals(unwrapOrElse(Some(0), fn), 0);
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
    assertEquals(expect(Some(0), ""), 0);
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

describe("match", () => {
  it("should call Some if Some", () => {
    const s = spy(() => 1);
    const n = spy(() => 2);

    assertEquals(match(Some(0), { Some: s, None: n }), 1);
    assertSpyCalls(s, 1);
    assertSpyCalls(n, 0);
    assertSpyCallArgs(s, 0, [0]);
  });

  it("should call None if None", () => {
    const s = spy(() => 1);
    const n = spy(() => 2);

    assertEquals(match(None, { Some: s, None: n }), 2);
    assertSpyCalls(s, 0);
    assertSpyCalls(n, 1);
  });
});
