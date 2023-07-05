# option

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/optio)
[![deno doc](https://doc.deno.land/badge.svg)](https://deno.land/x/optio?doc)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/option)](https://github.com/TomokiMiyauci/option/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/option/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/option)
[![License](https://img.shields.io/github/license/TomokiMiyauci/option)](LICENSE)

[![test](https://github.com/TomokiMiyauci/option/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/option/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@miyauci/option.png?mini=true)](https://nodei.co/npm/@miyauci/option/)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Rust style minimum option type.

## Background

This project provides minimum option features.

One of the existing challenges in the JavaScript/TypeScript community is
tree-shaking. Due to the dynamic nature of the language, tree-shaking can only
be used in limited situations. That is, tree-shaking cannot do anything about
unused class methods or properties.

The only solution to this is separation into top-level functions. It is very
unfortunate but true that no other method exists.

Having said that, a [future proposal](#feature) could solve this.

## Usage

Type `Option` represents an optional value.

Every `Option` is either `Some` and contains a value, or `None`, and does not.

```ts
import {
  expect,
  None,
  type Option,
  Some,
} from "https://deno.land/x/optio/mod.ts";

function divide(numerator: number, denominator: number): Option<number> {
  if (!denominator) return None;

  return Some(numerator / denominator);
}

const opt = divide(100, 0);
expect(opt, "divide by 0");
```

All operators for `Option` are separated from prototype.

## Documentation

- [Operators](operators/README.md)

## Feature

The [pipeline operator](https://github.com/tc39/proposal-pipeline-operator) will
linearize the nesting.

```ts, ignore
import { map, type Option, match } from "https://deno.land/x/optio/mod.ts";

declare const option: Option<unknown>;
declare const mapper: (value: unknown) => unknown

const result = map(option, mapper)
  |> map(%, mapper)
  |> match(%, {
    Some: mapper,
    None:mapper
  })
```

[proposal extensions](https://github.com/tc39/proposal-extensions) allows for
successive function adaptations, as in the Fluent API.

```ts, ignore
import { map, type Option, match } from "https://deno.land/x/optio/mod.ts";

declare const option: Option<unknown>;
declare const mapper: (value: unknown) => unknown

const result = option
  ::map(mapper)
  ::map(mapper)
  ::match({
    Some: mapper,
    None: mapper
  })
```

## Acknowledgements

- [Rust std::option](https://doc.rust-lang.org/std/option/index.html)

## Contributing

See [contribution](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2023 Tomoki Miyauchi
