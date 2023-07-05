// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { isNone, isSome } from "./query.ts";
import { None, Some } from "../spec.ts";
import { assert, assertFalse, describe, it } from "../_dev_deps.ts";

describe("isSome", () => {
  it("should return true if it is Some", () => {
    assert(isSome(Some(0)));
  });

  it("should return false if it is None", () => {
    assertFalse(isSome(None));
  });
});

describe("isNone", () => {
  it("should return true if it is None", () => {
    assert(isNone(None));
  });

  it("should return false if it is Some", () => {
    assertFalse(isNone(Some(0)));
  });
});
