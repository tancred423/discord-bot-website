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
    
    <template v-else-if="config">
      <Header :config="config" />
      
      <div class="main-container">
        <div class="content-wrapper">
          <main class="main-content">
            <Carousel :images="config.carouselImages" />
            <Overview :config="config" />
            <Permissions :permissions="config.permissions" />
          </main>
          
          <aside class="sidebar-content">
            <Sidebar 
              :server-count="config.serverCount"
              :categories="config.categories"
              :languages="config.languages"
              :links="config.links"
            />
          </aside>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import Carousel from './components/Carousel.vue'
import Overview from './components/Overview.vue'
import Permissions from './components/Permissions.vue'
import Sidebar from './components/Sidebar.vue'
import { loadBotConfig, type BotConfig } from './config'

const config = ref<BotConfig | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    config.value = await loadBotConfig()
    document.title = config.value.name
    
    // Set favicon from avatar
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement
    if (!favicon) {
      favicon = document.createElement('link')
      favicon.rel = 'icon'
      document.head.appendChild(favicon)
    }
    favicon.href = config.value.avatar
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error occurred'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: var(--background-primary);
}

.main-container {
  width: 100%;
  background: var(--background-primary);
}

.content-wrapper {
  max-width: 1260px;
  margin: 0 auto;
  padding: 32px 40px;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 40px;
}

.main-content {
  min-width: 0;
}

.sidebar-content {
  position: sticky;
  top: 100px;
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

@media (max-width: 968px) {
  .content-wrapper {
    grid-template-columns: 1fr;
    padding: 24px 16px;
    gap: 0;
  }
  
  .sidebar-content {
    position: static;
  }
}
</style>

