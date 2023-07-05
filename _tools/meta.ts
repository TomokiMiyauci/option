import { BuildOptions } from "https://deno.land/x/dnt@0.37.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  typeCheck: "both",
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "@miyauci/option",
    version,
    description: "Minimum option type port of Rust",
    keywords: [
      "option",
      "optional",
      "some",
      "none",
      "rust",
    ],
    license: "MIT",
    homepage: "https://github.com/TomokiMiyauci/option",
    repository: {
      type: "git",
      url: "git+https://github.com/TomokiMiyauci/option.git",
    },
    bugs: {
      url: "https://github.com/TomokiMiyauci/option/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: { access: "public" },
  },
  packageManager: "pnpm",
});
