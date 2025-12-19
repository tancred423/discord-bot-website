<template>
  <aside class="sidebar">
    <div class="sidebar-section">
      <h3 class="sidebar-title">Categories</h3>
      <div class="tags">
        <span 
          v-for="(category, index) in categories" 
          :key="index"
          class="tag"
        >
          {{ category }}
        </span>
      </div>
    </div>

    <div class="sidebar-section">
      <h3 class="sidebar-title">Supported Languages</h3>
      <div class="languages">
        <span 
          v-for="(language, index) in languages" 
          :key="index"
          class="language"
        >
          {{ language }}
        </span>
      </div>
    </div>

    <div class="sidebar-section">
      <h3 class="sidebar-title">Links</h3>
      <div class="links">
        <a 
          v-for="(link, index) in links" 
          :key="index"
          :href="link.url"
          class="link"
        >
          <svg v-if="link.label === 'GitHub'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <svg v-else-if="link.label === 'Privacy Policy'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
          <svg v-else-if="link.label === 'Terms of Service'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
          </svg>
          <span>{{ link.label }}</span>
        </a>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { BotConfig } from '../config'

const props = defineProps<{
  categories: string[]
  languages: string[]
  links: BotConfig['links']
}>()

const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}
</script>

<style scoped>
.sidebar {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  margin: 0;
  letter-spacing: 0.5px;
}

.server-count {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.count-text {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: var(--background-secondary);
  color: var(--text-normal);
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.languages {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.language {
  font-size: 14px;
  color: var(--text-normal);
}

.links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-link);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.link:hover {
  color: var(--text-link-hover);
  text-decoration: underline;
}

@media (max-width: 968px) {
  .sidebar {
    margin-top: 32px;
  }
}
</style>

