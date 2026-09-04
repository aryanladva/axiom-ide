import { Effect } from "effect"
import { define } from "../internal"

export const OllamaPlugin = define({
  id: "ollama",
  effect: Effect.fn(function* (ctx) {
    yield* ctx.aisdk.sdk(
      Effect.fn(function* (evt) {
        if (evt.sdk) return
        if (evt.model.providerID !== "ollama" && !evt.package.includes("ollama")) return
        const mod = yield* Effect.promise(() => import("@ai-sdk/openai-compatible"))
        const options: Record<string, any> = {
          name: "ollama",
          baseURL: "http://localhost:11434/v1",
          ...evt.options,
        }
        if (options.includeUsage !== false) options.includeUsage = true
        evt.sdk = mod.createOpenAICompatible(options as any)
      }),
    )
  }),
})
