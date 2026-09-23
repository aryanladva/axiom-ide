import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dir = path.resolve(__dirname, "..")

process.chdir(dir)

const modelsUrl = process.env.OPENCODE_MODELS_URL || "https://models.dev"

async function fetchModelsData() {
  if (process.env.MODELS_DEV_API_JSON) {
    try {
      return await Bun.file(process.env.MODELS_DEV_API_JSON).text()
    } catch {}
  }
  try {
    const res = await fetch(`${modelsUrl}/api.json`)
    if (res.ok) return await res.text()
  } catch (err) {
    console.warn("Could not fetch remote models snapshot, using local fallback fixture")
  }
  const fixturePath = path.resolve(__dirname, "../test/tool/fixtures/models-api.json")
  try {
    if (await Bun.file(fixturePath).exists()) {
      return await Bun.file(fixturePath).text()
    }
  } catch {}
  return "{}"
}

export const modelsData = await fetchModelsData()
console.log("Loaded models.dev snapshot")
