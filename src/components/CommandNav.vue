<template>
  <div class="command-nav">
    <select class="nav-mobile-select" :value="currentView" @change="onMobileSelect">
      <option value="overview">Overview</option>
      <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
    </select>

    <div class="nav-links">
      <a
        href="/"
        class="nav-link"
        :class="{ active: currentView === 'overview' }"
        @click.prevent="emit('navigate', 'overview')"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        Overview
      </a>

      <div v-for="cat in categories" :key="cat.slug" class="nav-section">
        <a
          :href="'/' + cat.slug"
          class="nav-link nav-category-link"
          :class="{ active: currentView === cat.slug }"
          @click.prevent="emit('navigate', cat.slug)"
        >
          {{ cat.name }}
        </a>
        <a
          v-for="cmd in cat.commands"
          :key="cmd.slug"
          :href="'/' + cat.slug + '#' + cmd.slug"
          class="nav-link nav-command-link"
          :class="{ active: currentView === cat.slug && activeCommand === cmd.slug }"
          @click.prevent="emit('navigate', cat.slug, cmd.slug)"
        >
          {{ cmd.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParsedCategory } from '../config'

defineProps<{
  categories: ParsedCategory[]
  currentView: string
  activeCommand: string | null
}>()

const emit = defineEmits<{
  (e: 'navigate', view: string, commandSlug?: string): void
}>()

const onMobileSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('navigate', target.value)
}
</script>

<style scoped>
.command-nav {
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  align-self: start;
  max-height: calc(100vh - 104px);
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--background-tertiary) transparent;
}

.nav-mobile-select {
  display: none;
  width: 100%;
  padding: 10px 12px;
  background: var(--background-secondary);
  color: var(--text-primary);
  border: 1px solid var(--background-modifier-accent);
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition:
    background 0.15s,
    color 0.15s;
  cursor: pointer;
}

.nav-link:hover {
  background: var(--background-modifier-hover);
  color: var(--text-primary);
  text-decoration: none;
}

.nav-link.active {
  background: var(--background-modifier-selected);
  color: var(--text-primary);
  font-weight: 600;
}

.nav-section {
  margin-top: 16px;
}

.nav-category-link {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 6px 12px;
  border-radius: 4px;
}

.nav-category-link:hover {
  color: var(--text-secondary);
  background: var(--background-modifier-hover);
}

.nav-category-link.active {
  color: var(--text-primary);
  background: var(--background-modifier-selected);
}

.nav-command-link {
  font-size: 13px;
  padding: 5px 12px 5px 20px;
  color: var(--text-secondary);
  font-weight: 400;
  border-left: 2px solid transparent;
  border-radius: 0;
  margin-left: 8px;
}

.nav-command-link:hover {
  color: var(--text-primary);
  background: none;
  border-left-color: var(--text-muted);
}

.nav-command-link.active {
  color: var(--text-primary);
  border-left-color: #5865f2;
  font-weight: 500;
}

@media (max-width: 1100px) {
  .command-nav {
    width: 100%;
    position: static;
    max-height: none;
    overflow: visible;
  }

  .nav-mobile-select {
    display: block;
  }

  .nav-links {
    display: none;
  }
}
</style>
