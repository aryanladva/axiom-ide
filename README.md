<p align="center">
  <img src="packages/ui/src/assets/favicon/favicon.svg" alt="AXIOM Logo" width="96" height="96" />
</p>

<h1 align="center">AXIOM</h1>

<p align="center">
  <strong>The modern AI-native development environment.</strong>
</p>

<p align="center">
  AXIOM is an AI-agent-powered desktop integrated development environment built for autonomous coding and intelligent developer workflows. Designed local-first, it embeds a high-performance execution daemon directly within a sleek Electron application to orchestrate multi-file editing, tool execution, and terminal commands. AXIOM seamlessly connects with local models via Ollama as well as major cloud LLM providers, delivering complete flexibility and privacy.
</p>

---

## 📸 Screenshots

<!-- TODO: add screenshot of main chat view here -->
<!-- ![Main Interface](docs/screenshots/main.png) -->

<!-- TODO: add screenshot of model provider selection and settings here -->
<!-- ![Model Provider Selection](docs/screenshots/providers.png) -->

<!-- TODO: add screenshot of agent tool execution and diff review here -->
<!-- ![Agent Tool Execution](docs/screenshots/tools.png) -->

---

## ✨ Key Features

- **Multi-Provider LLM Integration**: Connect directly to over 30 LLM providers including Anthropic (Claude 3.5 Sonnet, Claude 3 Opus), OpenAI (GPT-4o, o1, o3-mini), Google Gemini (Gemini 1.5 Pro, 2.0 Flash), OpenRouter, Groq, Mistral, xAI, Cerebras, Cohere, Together AI, Azure OpenAI, Amazon Bedrock, and generic OpenAI-compatible gateways.
- **Local-First Model Support via Ollama**: First-class native support for running local, offline models through Ollama (`http://localhost:11434`). Zero API keys required—AXIOM automatically discovers downloaded models (e.g. Llama 3, DeepSeek-R1, Qwen 2.5 Coder) with single-click connection.
- **Autonomous Tool Execution**: Full suite of built-in tools enabling agents to inspect and modify your codebase safely:
  - **File Operations**: Precise surgical edits (`edit`), full file creation (`write`), and file inspection (`read`).
  - **Code Search**: High-performance regex text matching (`grep`) and directory pattern traversal (`glob`).
  - **Command Execution**: Direct shell command and process execution (`bash`) with real-time output streaming.
  - **Web Intelligence**: Live web search (`websearch`) and web page content retrieval (`webfetch`).
  - **Interactive Collaboration**: User clarification prompts (`question`) and structured patch application (`apply_patch`).
- **Tabbed Session & Workspace Management**: Multitask across separate coding sessions with dedicated tabs, persistent chat history, and automatic draft state restoration.
- **Refined Axiom Design System**: Custom dark and light themes crafted for prolonged coding sessions, featuring warm terracotta and amber tones (Primary `#d97757`, Accent `#e8916b`, Dark Neutral `#161616`, Ink `#ececec`, Light Neutral `#faf9f7`) paired with crisp typography powered by **Inter** (`--font-family-text: "Inter", sans-serif`) and JetBrains Mono.
- **Embedded Local Daemon**: Fast internal sidecar daemon orchestrating model interaction, context curation, and tool execution locally on your machine without third-party editor telemetry.

---

## 🚀 Getting Started

### Path 1: Download the App (Windows)

1. Navigate to the [AXIOM Releases](https://github.com/aryanladva/axiom-ide/releases) page on GitHub.
2. Download the latest installer: `axiom-desktop-win-x64.exe` (currently **v1.0.1**).
3. Run the installer. AXIOM will install into your local user directory (`%LOCALAPPDATA%\Programs\@axiom-aidesktop`) and launch automatically.
4. Seamless background updates are supported out of the box (**Help** &rarr; **Check for Updates...**).

---

### Path 2: Build from Source

#### Prerequisites
- [Bun](https://bun.sh) v1.3+
- [Node.js](https://nodejs.org) v20+
- Git

#### 1. Clone the Repository
```bash
git clone https://github.com/aryanladva/axiom-ide.git
cd axiom-ide
```

#### 2. Install Dependencies
```bash
bun install
```

#### 3. Run in Development Mode
```bash
bun run dev:desktop
```

#### 4. Build and Package for Production
```bash
# Build the production bundle
bun run --cwd packages/desktop build

# Package the Windows installer (.exe)
bun run --cwd packages/desktop package:win
```
*(Build scripts also provide `package:mac` for macOS and `package:linux` for Linux).*

---

## ⚙️ Configuration

### Cloud Providers (Anthropic, OpenAI, Google, OpenRouter, etc.)
1. Open AXIOM and navigate to **Settings** (or click the model selector in the chat view).
2. Click **Connect Provider**.
3. Select your provider (e.g. Anthropic, OpenAI, Google Gemini, OpenRouter) and input your API key.
4. Your API keys are encrypted and stored locally on your machine.

### Local Models (Ollama)
1. Install and start [Ollama](https://ollama.com):
   ```bash
   ollama serve
   ```
2. Pull any desired model in your terminal:
   ```bash
   ollama pull qwen2.5-coder
   # or
   ollama pull deepseek-r1
   # or
   ollama pull llama3.2
   ```
3. In AXIOM, open **Settings** &rarr; **Connect Provider** and select **Ollama (Local)**.
4. AXIOM automatically tests the connection at `http://localhost:11434`, detects all installed local models, and populates them into your model picker immediately—no API key needed.

---

## 📁 Project Structure

```
axiom-ide/
├── packages/
│   ├── desktop/          # Electron desktop shell, window management, and auto-updater
│   ├── app/              # SolidJS desktop renderer, session management, and settings UI
│   ├── ui/               # Design system, Axiom themes, icons, and reusable components
│   ├── core/             # Agent engine, tool execution system, and provider integrations
│   ├── opencode/         # Embedded backend daemon and sidecar server runtime
│   ├── cli/              # Command-line interface for terminal-based workflows
│   └── sdk/              # Client SDK and protocol schemas for backend communication
```

---

## 📜 License & Credits

AXIOM is licensed under the [MIT License](./LICENSE).

*Built on top of the opencode project, MIT licensed.*
