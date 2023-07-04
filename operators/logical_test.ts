// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { or } from "./logical.ts";
import { None, Some } from "../spec.ts";
import { assert, describe, it } from "../_dev_deps.ts";

describe("or", () => {
  it("should return option if it is Some", () => {
    const option = Some.of(0);
    assert(or(option, Some.of(0)) === option);
    assert(or(option, None) === option);
  });

  it("should return optb if it is None", () => {
    const optb = Some.of(0);
    assert(or(None, optb) === optb);
    assert(or(None, None) === None);
  });
});
