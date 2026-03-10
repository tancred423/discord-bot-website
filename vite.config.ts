import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readdirSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const IMAGE_RE = /\.(png|jpe?g|gif|webp|svg)$/i

function listPreviewImages(publicDir: string, bot: string): string[] {
  const dir = join(publicDir, bot, 'previews')
  if (!existsSync(dir)) return []
  try {
    return readdirSync(dir)
      .filter((f) => IMAGE_RE.test(f))
      .sort()
  } catch {
    return []
  }
}

function imageManifestPlugin(): Plugin {
  let publicDir = ''

  return {
    name: 'image-manifest',
    configResolved(config) {
      publicDir = config.publicDir
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/([^/]+)\/previews\/_manifest\.json/)
        if (!match) return next()
        const files = listPreviewImages(publicDir, match[1])
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(files))
      })
    },
    writeBundle(_, bundle) {
      const outDir = join(publicDir, '..', 'dist')
      for (const entry of readdirSync(publicDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue
        const files = listPreviewImages(publicDir, entry.name)
        if (!files.length) continue
        const manifestDir = join(outDir, entry.name, 'previews')
        mkdirSync(manifestDir, { recursive: true })
        writeFileSync(join(manifestDir, '_manifest.json'), JSON.stringify(files))
      }
    }
  }
}

export default defineConfig({
  plugins: [vue(), imageManifestPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true,
      interval: 1000
    }
  }
})
