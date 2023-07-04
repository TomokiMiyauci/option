// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { filter, map, mapOr, mapOrElse } from "./transform.ts";
import { None, Option, Some } from "../spec.ts";
import {
  assert,
  assertEquals,
  assertSpyCallArgs,
  assertSpyCalls,
  assertType,
  describe,
  IsExact,
  isString,
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

describe("filter", () => {
  it("should return None if None", () => {
    const predicate = spy(() => true);
    assertEquals(filter(None, predicate), None);
    assertSpyCalls(predicate, 0);
  });

  it("should return Some if Some and predicate is true", () => {
    const predicate = spy(() => true);
    const some = Some.of(0);
    assert(filter(some, predicate) === some);
    assertSpyCalls(predicate, 1);
    assertSpyCallArgs(predicate, 0, [0]);
  });

  it("should return None if Some and predicate is false", () => {
    const predicate = spy(() => false);
    const some = Some.of(0);
    assert(filter(some, predicate) === None);
    assertSpyCalls(predicate, 1);
    assertSpyCallArgs(predicate, 0, [0]);
  });

  it("should infer narrowing", () => {
    const option: Option<string | number> = Some.of(0);

    const opt = filter(option, isString);
    assertType<IsExact<typeof opt, Option<string>>>(true);
  });
});
