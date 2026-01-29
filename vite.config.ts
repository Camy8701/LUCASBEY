import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
import { readdirSync, statSync, readFileSync } from "fs"

const rootDir = path.resolve(__dirname, "src")

function getHtmlEntries(dir: string, baseDir: string, acc: Record<string, string>) {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = path.join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      getHtmlEntries(fullPath, baseDir, acc)
      continue
    }
    if (entry.endsWith(".html")) {
      const rel = path.relative(baseDir, fullPath).replace(/\\/g, "/")
      const name = rel.replace(/\.html$/, "")
      acc[name] = fullPath
    }
  }
}

const inputs: Record<string, string> = {}
getHtmlEntries(rootDir, rootDir, inputs)

const data = JSON.parse(readFileSync(path.resolve(__dirname, "data.json"), "utf-8"))
const tokenRegex = /{{\s*([A-Z0-9_]+)\s*}}/g

export default defineConfig({
  root: rootDir,
  plugins: [
    react(),
    {
      name: "inject-data-tokens",
      transformIndexHtml(html) {
        return html.replace(tokenRegex, (match, key) => {
          const value = data[key]
          return value !== undefined ? String(value) : match
        })
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: inputs,
    },
  },
})
