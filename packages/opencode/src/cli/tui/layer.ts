import { run as runTui, type TuiInput } from "@axiom-ai/tui"
import { Global } from "@axiom-ai/core/global"
import { AppNodeBuilder } from "@axiom-ai/core/effect/app-node-builder"
import { Effect } from "effect"

export function run(input: TuiInput) {
  return runTui(input).pipe(Effect.provide(AppNodeBuilder.build(Global.node)))
}
