const PROVIDER_DISPLAY_OVERRIDES: Record<string, string> = {
  opencode: "Axiom",
  "opencode-go": "Axiom Go",
}

const PROVIDER_NAME_OVERRIDES: Record<string, string> = {
  "opencode zen": "Axiom",
  opencode: "Axiom",
}

export function displayProviderName(id?: string, fallbackName?: string): string {
  if (id && PROVIDER_DISPLAY_OVERRIDES[id]) {
    return PROVIDER_DISPLAY_OVERRIDES[id]
  }
  if (fallbackName) {
    const key = fallbackName.trim().toLowerCase()
    if (PROVIDER_NAME_OVERRIDES[key]) {
      return PROVIDER_NAME_OVERRIDES[key]
    }
  }
  if (id) {
    const key = id.trim().toLowerCase()
    if (PROVIDER_NAME_OVERRIDES[key]) {
      return PROVIDER_NAME_OVERRIDES[key]
    }
  }
  return fallbackName ?? id ?? ""
}
