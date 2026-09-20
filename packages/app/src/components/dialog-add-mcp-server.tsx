import { Button } from "@axiom-ai/ui/button"
import { useDialog } from "@axiom-ai/ui/context/dialog"
import { Dialog } from "@axiom-ai/ui/dialog"
import { IconButton } from "@axiom-ai/ui/icon-button"
import { TextField } from "@axiom-ai/ui/text-field"
import { showToast } from "@/utils/toast"
import { batch, Component, For } from "solid-js"
import { createStore, produce } from "solid-js/store"
import { useServerSync } from "@/context/server-sync"
import { useLanguage } from "@/context/language"
import { useMutation } from "@tanstack/solid-query"

export type HeaderRow = {
  key: string
  value: string
  err?: { key?: string; value?: string }
}

export type AddMcpServerFormState = {
  name: string
  url: string
  headers: HeaderRow[]
  err: {
    name?: string
    url?: string
  }
}

export function DialogAddMcpServer(props: { onBack?: () => void }) {
  const language = useLanguage()

  return (
    <Dialog
      class="h-full"
      title={
        <div class="flex items-center gap-2">
          {props.onBack && (
            <IconButton
              tabIndex={-1}
              icon="arrow-left"
              variant="ghost"
              onClick={props.onBack}
              aria-label={language.t("common.goBack")}
            />
          )}
          <span>{language.t("dialog.mcp.addServer.title")}</span>
        </div>
      }
      transition
    >
      <AddMcpServerForm onBack={props.onBack} />
    </Dialog>
  )
}

export function AddMcpServerForm(props: { onBack?: () => void }) {
  const dialog = useDialog()
  const serverSync = useServerSync()
  const language = useLanguage()

  const [form, setForm] = createStore<AddMcpServerFormState>({
    name: "",
    url: "",
    headers: [],
    err: {},
  })

  const addHeader = () => {
    setForm(
      "headers",
      produce((rows) => {
        rows.push({ key: "", value: "" })
      }),
    )
  }

  const removeHeader = (index: number) => {
    setForm(
      "headers",
      produce((rows) => {
        rows.splice(index, 1)
      }),
    )
  }

  const setHeader = (index: number, key: "key" | "value", value: string) => {
    batch(() => {
      setForm("headers", index, key, value)
      setForm("headers", index, "err", key, undefined)
    })
  }

  const validate = () => {
    const name = form.name.trim().toLowerCase()
    const url = form.url.trim()
    let hasError = false
    const err: AddMcpServerFormState["err"] = {}

    if (!name) {
      err.name = language.t("dialog.mcp.error.name.required")
      hasError = true
    } else if (!/^[a-z0-9][a-z0-9-_]*$/.test(name)) {
      err.name = language.t("dialog.mcp.error.name.format")
      hasError = true
    }

    if (!url) {
      err.url = language.t("dialog.mcp.error.url.required")
      hasError = true
    } else if (!/^https?:\/\/.+/i.test(url)) {
      err.url = language.t("dialog.mcp.error.url.format")
      hasError = true
    }

    setForm("err", err)
    return hasError ? null : { name, url }
  }

  const saveMutation = useMutation(() => ({
    mutationFn: async (result: NonNullable<ReturnType<typeof validate>>) => {
      const headersRecord: Record<string, string> = {}
      for (const h of form.headers) {
        const k = h.key.trim()
        const v = h.value.trim()
        if (k && v) {
          headersRecord[k] = v
        }
      }

      const existingConfig = (serverSync().data.config.mcp as Record<string, any>) ?? {}
      const updatedMcp = {
        ...existingConfig,
        [result.name]: {
          type: "remote",
          url: result.url,
          headers: Object.keys(headersRecord).length > 0 ? headersRecord : undefined,
        },
      }

      await serverSync().updateConfig({
        mcp: updatedMcp,
      })
      await serverSync().refreshProviders().catch(() => undefined)
      return result
    },
    onSuccess: (result) => {
      if (props.onBack) {
        props.onBack()
      } else {
        dialog.close()
      }
      showToast({
        variant: "success",
        icon: "circle-check",
        title: language.t("common.save"),
        description: `${result.name} added`,
      })
    },
    onError: (error) => {
      showToast({
        variant: "error",
        title: language.t("common.requestFailed"),
        description: error instanceof Error ? error.message : String(error),
      })
    },
  }))

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const valid = validate()
    if (!valid) return
    saveMutation.mutate(valid)
  }

  return (
    <form onSubmit={handleSubmit} class="flex min-h-0 flex-1 flex-col gap-4 p-4 overflow-y-auto">
      <TextField
        label={language.t("dialog.mcp.field.name.label")}
        placeholder={language.t("dialog.mcp.field.name.placeholder")}
        value={form.name}
        onChange={(v) => {
          setForm("name", v)
          setForm("err", "name", undefined)
        }}
        validationState={form.err.name ? "invalid" : undefined}
        error={form.err.name}
        autofocus
      />

      <TextField
        label={language.t("dialog.mcp.field.url.label")}
        placeholder={language.t("dialog.mcp.field.url.placeholder")}
        value={form.url}
        onChange={(v) => {
          setForm("url", v)
          setForm("err", "url", undefined)
        }}
        validationState={form.err.url ? "invalid" : undefined}
        error={form.err.url}
      />

      <div class="flex flex-col gap-2 pt-2">
        <div class="flex items-center justify-between">
          <span class="text-12-medium text-text-weak">{language.t("dialog.mcp.headers.label")}</span>
          <Button type="button" variant="ghost" size="small" icon="plus-small" onClick={addHeader}>
            {language.t("dialog.mcp.headers.add")}
          </Button>
        </div>

        <For each={form.headers}>
          {(header, index) => (
            <div class="flex items-center gap-2">
              <TextField
                class="flex-1"
                placeholder="Header-Name"
                value={header.key}
                onChange={(v) => setHeader(index(), "key", v)}
              />
              <TextField
                class="flex-1"
                placeholder="Value"
                value={header.value}
                onChange={(v) => setHeader(index(), "value", v)}
              />
              <IconButton
                type="button"
                icon="close-small"
                variant="ghost"
                onClick={() => removeHeader(index())}
                aria-label={language.t("dialog.mcp.headers.remove")}
              />
            </div>
          )}
        </For>
      </div>

      <div class="mt-auto flex items-center justify-end gap-2 pt-4">
        {props.onBack && (
          <Button type="button" variant="ghost" onClick={props.onBack}>
            {language.t("common.cancel")}
          </Button>
        )}
        <Button type="submit" variant="primary" loading={saveMutation.isPending}>
          {language.t("common.save")}
        </Button>
      </div>
    </form>
  )
}
