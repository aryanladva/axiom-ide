import { $ } from "bun"
import path from "path"
import { downloadCliToResources } from "./utils"

const desktopDir = path.resolve(import.meta.dirname, "..")
await $`bun ${path.join(desktopDir, "scripts/copy-icons.ts")} ${process.env.OPENCODE_CHANNEL ?? "dev"}`
await $`cd ${path.resolve(desktopDir, "../axiom")} && bun script/build-node.ts`
await downloadCliToResources()
