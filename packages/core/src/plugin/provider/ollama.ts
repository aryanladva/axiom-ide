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
        const rawBaseURL = evt.options.baseURL || "http://127.0.0.1:11434/v1"
        const baseURL = rawBaseURL.replace("://localhost:", "://127.0.0.1:")
        const options: Record<string, any> = {
          name: "ollama",
          ...evt.options,
          baseURL,
          includeUsage: false,
        }
        evt.sdk = mod.createOpenAICompatible(options as any)
      }),
    )
  }),
})
