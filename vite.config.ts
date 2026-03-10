import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readdirSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'

function imageManifestPlugin(): Plugin {
  let publicDir = ''

  const generate = () => {
    if (!publicDir) return
    for (const entry of readdirSync(publicDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const dir = join(publicDir, entry.name, 'previews')
      if (!existsSync(dir)) continue
      try {
        const files = readdirSync(dir)
          .filter(f => /\.(png|jpe?g|gif|webp|svg)$/i.test(f))
          .sort()
        writeFileSync(join(dir, '_manifest.json'), JSON.stringify(files))
      } catch { /* skip unreadable directories */ }
    }
  }

  return {
    name: 'image-manifest',
    configResolved(config) {
      publicDir = config.publicDir
      generate()
    },
    configureServer(server) {
      server.watcher.on('all', (_event, filePath) => {
        if (filePath.includes('/previews/') && !filePath.endsWith('_manifest.json')) {
          generate()
        }
      })
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
