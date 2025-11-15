export interface Permission {
  name: string
  reason?: string
}

export interface BotConfig {
  name: string
  description: string
  avatar: string
  banner: string
  inviteUrl: string
  supportServerUrl: string
  serverCount: number
  categories: string[]
  languages: string[]
  carouselImages: string[]
  links: {
    label: string
    url: string
  }[]
  permissions: Permission[]
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

