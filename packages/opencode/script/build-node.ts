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
  target: "bun",
  format: "esm",
  entrypoints: ["./src/index.ts"],
  outdir: "./dist/node",
  naming: "node.js",
  external: [
    "node-gyp",
    "fsevents",
    "@lydell/node-pty",
    "@opentui/core-darwin-x64",
    "@opentui/core-darwin-arm64",
    "@opentui/core-linux-x64",
    "@opentui/core-linux-arm64",
    "@opentui/core-linux-x64-musl",
    "@opentui/core-linux-arm64-musl",
    "@opentui/core-win32-arm64",
    "@opentui/core-win32-x64",
  ],
  define: {
    OPENCODE_VERSION: `'${Script.version}'`,
    OPENCODE_MODELS_DEV: generated.modelsData,
    OPENCODE_CHANNEL: `'${Script.channel}'`,
  },
})

console.log("Built node server bundle to dist/node/node.js")
