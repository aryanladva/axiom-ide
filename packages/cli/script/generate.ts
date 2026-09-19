const modelsUrl = process.env.OPENCODE_MODELS_URL || "https://models.opencode.ai"

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
    console.warn("Could not fetch remote models snapshot, using empty fallback")
  }
  return "{}"
}

export const modelsData = await fetchModelsData()

console.log("Loaded models.dev snapshot")
