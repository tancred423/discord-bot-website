<template>
  <div class="header-container">
    <div class="banner-spacer"></div>
    <div class="top-banner">
      <div class="top-banner-content">
        <h2 class="banner-title">{{ config.name }}</h2>
        <div class="action-buttons sticky-buttons" :class="{ active: showStickyButtons }">
          <button class="btn-primary" @click="addBot">Add App</button>
          <button class="btn-icon theme-btn" @click="toggleTheme">
            <span class="theme-text">{{ currentTheme }}</span>
          </button>
          <div class="dropdown">
            <button class="btn-icon" @click="toggleMenu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="19" r="2"/>
              </svg>
            </button>
            <div v-if="showMenu" class="dropdown-menu">
              <button @click="copyLink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Copy Link
              </button>
              <button @click="joinSupport">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Support Server
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="banner-section">
      <img :src="config.banner" :alt="config.name + ' banner'" class="banner-image" />
    </div>
    
    <div class="content-wrapper">
      <div class="avatar-section">
        <img :src="config.avatar" :alt="config.name + ' avatar'" class="avatar-image" />
      </div>
      
      <div class="title-actions-row">
        <div class="title-section">
          <h1 class="bot-title">{{ config.name }}</h1>
        </div>
        
        <div class="action-section" ref="actionSection">
          <div class="action-buttons" :class="{ hidden: showStickyButtons }">
            <button class="btn-primary" @click="addBot">Add App</button>
            <button class="btn-icon theme-btn" @click="toggleTheme">
              <span class="theme-text">{{ currentTheme }}</span>
            </button>
            <div class="dropdown">
              <button class="btn-icon" @click="toggleMenu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="2"/>
                  <circle cx="12" cy="12" r="2"/>
                  <circle cx="12" cy="19" r="2"/>
                </svg>
              </button>
              <div v-if="showMenu" class="dropdown-menu">
                <button @click="copyLink">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  Copy Link
                </button>
                <button @click="joinSupport">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Support Server
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { BotConfig } from '../config'

const props = defineProps<{
  config: BotConfig
}>()

const showMenu = ref(false)
const currentTheme = ref('Auto')
const actionSection = ref<HTMLElement | null>(null)
const showStickyButtons = ref(false)

const themes = ['Auto', 'Light', 'Dark']
let themeIndex = 0

const applyTheme = (theme: string) => {
  const html = document.documentElement
  if (theme === 'Light') {
    html.setAttribute('data-theme', 'light')
  } else if (theme === 'Dark') {
    html.setAttribute('data-theme', 'dark')
  } else {
    html.removeAttribute('data-theme')
  }
}

const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme && themes.includes(savedTheme)) {
    currentTheme.value = savedTheme
    themeIndex = themes.indexOf(savedTheme)
    applyTheme(savedTheme)
  }
}

const toggleTheme = () => {
  themeIndex = (themeIndex + 1) % themes.length
  currentTheme.value = themes[themeIndex]
  applyTheme(currentTheme.value)
  localStorage.setItem('theme', currentTheme.value)
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const addBot = () => {
  window.location.href = props.config.inviteUrl || '#'
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  showMenu.value = false
}

const joinSupport = () => {
  window.location.href = props.config.supportServerUrl || '#'
  showMenu.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.dropdown')) {
    showMenu.value = false
  }
}

let scrollTimeout: number | null = null

const handleScroll = () => {
  if (scrollTimeout) {
    cancelAnimationFrame(scrollTimeout)
  }
  
  scrollTimeout = requestAnimationFrame(() => {
    if (actionSection.value) {
      const rect = actionSection.value.getBoundingClientRect()
      const topBarHeight = 68
      showStickyButtons.value = rect.top <= topBarHeight + 10
    }
  })
}

onMounted(() => {
  loadTheme()
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimeout) {
    cancelAnimationFrame(scrollTimeout)
  }
})
</script>

<style scoped>
.header-container {
  width: 100%;
}

.banner-spacer {
  height: 68px;
  flex-shrink: 0;
}

.top-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: var(--background-tertiary);
  padding: 16px 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  height: 68px;
  box-sizing: border-box;
}

.top-banner-content {
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.banner-title {
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.sticky-buttons {
  opacity: 0;
  transition: opacity 0.15s ease;
  pointer-events: none;
}

.sticky-buttons.active {
  opacity: 1;
  pointer-events: all;
}

.banner-section {
  position: relative;
  width: 100%;
  background: #1a1a1e;
}

.banner-image {
  width: 100%;
  height: 240px;
  object-fit: contain;
  display: block;
  background: #1a1a1e;
}

.content-wrapper {
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
}

.avatar-section {
  position: absolute;
  top: -60px;
  left: 40px;
}

.avatar-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 8px solid var(--background-primary);
  background: var(--background-secondary);
}

.title-actions-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 24px;
  gap: 24px;
}

.title-section {
  flex: 1;
  min-width: 0;
}

.bot-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.action-section {
  flex-shrink: 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
  transition: opacity 0.15s ease;
}

.action-buttons.hidden {
  opacity: 0;
  pointer-events: none;
}

.btn-primary {
  background: #5865f2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #4752c4;
}

.btn-icon {
  background: var(--background-secondary);
  color: var(--text-secondary);
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-icon:hover {
  background: var(--background-modifier-hover);
}

.theme-btn {
  padding: 8px 12px;
}

.theme-text {
  font-size: 14px;
  font-weight: 500;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: var(--background-floating);
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
  min-width: 200px;
  padding: 6px 0;
  z-index: 1001;
}

.dropdown-menu button {
  width: 100%;
  background: none;
  border: none;
  padding: 10px 12px;
  text-align: left;
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.15s;
}

.dropdown-menu button:hover {
  background: var(--background-modifier-hover);
}

@media (max-width: 968px) {
  .banner-spacer {
    height: auto;
    min-height: 100px;
  }

  .top-banner {
    height: auto;
    min-height: 100px;
  }

  .top-banner-content {
    padding: 0 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .content-wrapper {
    padding: 0 16px;
  }
  
  .avatar-section {
    left: 16px;
  }
  
  .title-actions-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .action-section {
    width: 100%;
  }
  
  .action-buttons {
    justify-content: flex-start;
  }
}
</style>

