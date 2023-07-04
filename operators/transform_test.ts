// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { map, mapOr, mapOrElse } from "./transform.ts";
import { None, Option, Some } from "../spec.ts";
import {
  assertEquals,
  assertSpyCallArgs,
  assertSpyCalls,
  describe,
  it,
  spy,
} from "../_dev_deps.ts";

describe("map", () => {
  it("should call mapper if it is some", () => {
    const INPUT = "Hello, World!";
    const option: Option<string> = Some.of(INPUT);
    const fn = spy((v: string) => v.length);
    const optionLen = map(option, fn);

    assertEquals(optionLen, Some.of(13));
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [INPUT]);
  });

  it("should not call mapper function if it is none", () => {
    const option: Option<string> = None;
    const fn = spy((v: string) => v.length);
    const optionLen = map(option, fn);

    assertEquals(optionLen, None);
    assertSpyCalls(fn, 0);
  });
});

describe("mapOr", () => {
  it("should call mapper if it is some", () => {
    const INPUT = "Hello, World!";
    const option: Option<string> = Some.of(INPUT);
    const fn = spy((v: string) => v.length);
    const optionLen = mapOr(option, 0, fn);

    assertEquals(optionLen, INPUT.length);
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [INPUT]);
  });

  it("should return default value if it is none", () => {
    const option: Option<string> = None;
    const fn = spy((v: string) => v.length);
    const optionLen = mapOr(option, 0, fn);

    assertEquals(optionLen, 0);
    assertSpyCalls(fn, 0);
  });
});

describe("mapOrElse", () => {
  it("should call mapper if it is some", () => {
    const INPUT = "Hello, World!";
    const option: Option<string> = Some.of(INPUT);
    const fn = spy((v: string) => v.length);
    const defaultFn = spy(() => 0);
    const optionLen = mapOrElse(option, defaultFn, fn);

    assertEquals(optionLen, INPUT.length);
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [INPUT]);
    assertSpyCalls(defaultFn, 0);
  });

  it("should return default value if it is none", () => {
    const option: Option<string> = None;
    const fn = spy((v: string) => v.length);
    const defaultFn = spy(() => 0);
    const optionLen = mapOrElse(option, defaultFn, fn);

    assertEquals(optionLen, 0);
    assertSpyCalls(fn, 0);
    assertSpyCalls(defaultFn, 1);
  });
});