<template>
  <div class="app">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading bot information...</p>
    </div>

    <div v-else-if="error" class="error">
      <h2>Failed to load bot configuration</h2>
      <p>{{ error }}</p>
    </div>

    <template v-else-if="data">
      <Header :config="data.config" />

      <div class="page-layout" :class="{ 'has-nav': hasCommands }">
        <CommandNav
          v-if="hasCommands"
          :categories="data.commandCategories"
          :current-view="currentView"
          :active-command="activeCommand"
          @navigate="handleNavigate"
        />

        <div class="page-content">
          <main class="main-content">
            <template v-if="currentView === 'overview'">
              <Carousel v-if="data.carouselImages.length" :images="data.carouselImages" />
              <Overview :content="data.overviewContent" />
              <Permissions
                v-if="data.config.permissions?.length"
                :permissions="data.config.permissions"
              />
            </template>
            <CommandGuide
              v-else-if="currentCategory"
              :key="currentView"
              :category="currentCategory"
              :active-command="activeCommand"
            />
          </main>

          <aside class="sidebar-content">
            <Sidebar
              :categories="data.config.categories"
              :languages="data.config.languages"
              :links="data.config.links"
            />
          </aside>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import Header from './components/Header.vue'
import Carousel from './components/Carousel.vue'
import Overview from './components/Overview.vue'
import Permissions from './components/Permissions.vue'
import Sidebar from './components/Sidebar.vue'
import CommandNav from './components/CommandNav.vue'
import CommandGuide from './components/CommandGuide.vue'
import { loadBotData, type BotData } from './config'

const data = ref<BotData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const currentView = ref('overview')
const activeCommand = ref<string | null>(null)

const hasCommands = computed(() => (data.value?.commandCategories?.length ?? 0) > 0)

const currentCategory = computed(() =>
  data.value?.commandCategories.find((c) => c.slug === currentView.value)
)

const handleNavigate = (view: string, commandSlug?: string) => {
  currentView.value = view
  activeCommand.value = commandSlug || null

  const path = view === 'overview' ? '/' : `/${view}`
  const hash = commandSlug ? `#${commandSlug}` : ''
  history.pushState(null, '', path + hash)

  if (commandSlug) {
    nextTick(() => {
      document.getElementById(commandSlug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const syncViewFromUrl = () => {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '')
  const hash = window.location.hash.slice(1)

  if (!path || path === 'overview') {
    currentView.value = 'overview'
    activeCommand.value = null
  } else {
    const category = data.value?.commandCategories.find((c) => c.slug === path)
    if (category) {
      currentView.value = path
      activeCommand.value = hash || null
      if (hash) {
        nextTick(() => {
          document.getElementById(hash)?.scrollIntoView({ block: 'start' })
        })
      }
    } else {
      currentView.value = 'overview'
      activeCommand.value = null
    }
  }
}

onMounted(async () => {
  try {
    data.value = await loadBotData()
    document.title = data.value.config.name

    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    if (!favicon) {
      favicon = document.createElement('link')
      favicon.rel = 'icon'
      document.head.appendChild(favicon)
    }
    favicon.href = data.value.config.avatar

    syncViewFromUrl()
    window.addEventListener('popstate', syncViewFromUrl)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error occurred'
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  window.removeEventListener('popstate', syncViewFromUrl)
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--background-primary);
}

.page-layout {
  max-width: 1260px;
  margin: 0 auto;
  padding: 24px 40px;
}

.page-layout.has-nav {
  max-width: 1440px;
  display: flex;
  gap: 40px;
}

.page-content {
  flex: 1;
  min-width: 0;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 40px;
}

.main-content {
  min-width: 0;
}

.sidebar-content {
  position: sticky;
  top: 80px;
  align-self: start;
}

.loading,
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
}

.loading {
  color: var(--text-secondary);
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--background-modifier-accent);
  border-top-color: var(--text-link);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: var(--text-primary);
}

.error h2 {
  margin: 0 0 8px 0;
  color: #ed4245;
}

.error p {
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 1100px) {
  .page-layout.has-nav {
    max-width: 1260px;
    flex-direction: column;
    gap: 16px;
  }
}

@media (max-width: 968px) {
  .page-layout,
  .page-layout.has-nav {
    padding: 24px 16px;
  }

  .page-content {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .sidebar-content {
    position: static;
  }
}
</style>
