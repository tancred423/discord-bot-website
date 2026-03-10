export interface Permission {
  name: string
  reason?: string
}

export interface CommandCategoryConfig {
  name: string
  file: string
}

export interface BotConfig {
  name: string
  overview?: string
  description?: string
  avatar: string
  banner: string
  inviteUrl: string
  supportServerUrl: string
  categories: string[]
  languages: string[]
  previewFolder?: string
  carouselImages?: string[]
  links: {
    label: string
    url: string
  }[]
  permissions: Permission[]
  commandCategories?: CommandCategoryConfig[]
}

export interface ParsedCommand {
  name: string
  slug: string
  content: string
}

export interface ParsedCategory {
  name: string
  slug: string
  commands: ParsedCommand[]
}

export interface BotData {
  config: BotConfig
  overviewContent: string
  commandCategories: ParsedCategory[]
  carouselImages: string[]
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/^\//, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function parseCommandMarkdown(markdown: string): ParsedCommand[] {
  const commands: ParsedCommand[] = []
  const sections = markdown.split(/^## /m)

  for (const section of sections) {
    const trimmed = section.trim()
    if (!trimmed) continue

    const lineBreak = trimmed.indexOf('\n')
    const name = lineBreak >= 0 ? trimmed.substring(0, lineBreak).trim() : trimmed
    const content = lineBreak >= 0 ? trimmed.substring(lineBreak + 1).trim() : ''

    commands.push({
      name,
      slug: slugify(name),
      content
    })
  }

  return commands
}

async function fetchText(path: string): Promise<string> {
  const response = await fetch(path)
  if (!response.ok) throw new Error(`Failed to load ${path}`)
  return response.text()
}

export async function loadBotConfig(): Promise<BotConfig> {
  const configName = import.meta.env.VITE_BOT_CONFIG as string
  const configPath = configName ? `/${configName}/config.json` : '/config.json'

  const response = await fetch(configPath)
  if (!response.ok) {
    throw new Error(`Failed to load bot configuration from ${configPath}`)
  }
  return response.json()
}

export async function loadBotData(): Promise<BotData> {
  const config = await loadBotConfig()
  const configName = import.meta.env.VITE_BOT_CONFIG as string
  const basePath = configName ? `/${configName}` : ''

  let overviewContent = ''
  if (config.overview) {
    try {
      overviewContent = await fetchText(`${basePath}/${config.overview}`)
    } catch {
      overviewContent = ''
    }
  } else if (config.description) {
    overviewContent = config.description
  }

  let carouselImages: string[] = []
  if (config.previewFolder) {
    try {
      const manifest = await fetchText(`${basePath}/${config.previewFolder}/_manifest.json`)
      const files: string[] = JSON.parse(manifest)
      carouselImages = files.map((f) => `${basePath}/${config.previewFolder}/${f}`)
    } catch {
      carouselImages = []
    }
  } else if (config.carouselImages) {
    carouselImages = config.carouselImages
  }

  const commandCategories: ParsedCategory[] = (
    await Promise.all(
      (config.commandCategories || []).map(async (cat) => {
        try {
          const markdown = await fetchText(`${basePath}/${cat.file}`)
          return {
            name: cat.name,
            slug: slugify(cat.name),
            commands: parseCommandMarkdown(markdown)
          } as ParsedCategory
        } catch {
          return null
        }
      })
    )
  ).filter((c): c is ParsedCategory => c !== null)

  return { config, overviewContent, commandCategories, carouselImages }
}
