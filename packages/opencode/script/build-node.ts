#!/usr/bin/env bun
import { $ } from "bun"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dir = path.resolve(__dirname, "..")

process.chdir(dir)

const generated = await import("./generate.ts")
import { Script } from "@axiom-ai/script"

await $`mkdir -p dist/node`

await Bun.build({
  target: "node",
  format: "esm",
  entrypoints: ["./src/node.ts"],
  outdir: "./dist/node",
  naming: "node.js",
  plugins: [
    {
      name: "jsonc-parser-esm",
      setup(build) {
        build.onResolve({ filter: /^jsonc-parser$/ }, async () => {
          const resolved = await import.meta.resolve("jsonc-parser")
          return {
            path: fileURLToPath(resolved.replace("/lib/umd/main.js", "/lib/esm/main.js")),
          }
        })
      },
    },
  ],
  external: [
    "node-gyp",
    "fsevents",
    "@lydell/node-pty",
  ],
  define: {
    OPENCODE_VERSION: `'${Script.version}'`,
    OPENCODE_MODELS_DEV: generated.modelsData,
    OPENCODE_CHANNEL: `'${Script.channel}'`,
  },
})

console.log("Built node server bundle to dist/node/node.js")
