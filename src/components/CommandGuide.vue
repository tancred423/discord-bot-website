<template>
  <div class="command-guide">
    <h2 class="category-title">{{ category.name }}</h2>
    <div
      v-for="command in category.commands"
      :id="command.slug"
      :key="command.slug"
      class="command-section"
      :class="{ active: activeCommand === command.slug }"
    >
      <h3 class="command-name">{{ command.name }}</h3>
      <div
        v-if="command.content"
        class="command-content markdown-content"
        v-html="renderMarkdown(command.content)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import type { ParsedCategory } from '../config'

defineProps<{
  category: ParsedCategory
  activeCommand: string | null
}>()

const renderMarkdown = (content: string): string => {
  return marked.parse(content, { breaks: true, gfm: true }) as string
}
</script>

<style scoped>
.category-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 24px 0;
}

.command-section {
  position: relative;
  background: var(--background-secondary);
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 16px;
  scroll-margin-top: 72px;
  overflow: hidden;
}

.command-section.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #5865f2;
  border-radius: 0;
}

.command-section.active {
  animation: highlight-flash 1s ease-out;
}

@keyframes highlight-flash {
  0% {
    background: rgba(88, 101, 242, 0.12);
  }
  100% {
    background: var(--background-secondary);
  }
}

.command-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 12px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--background-modifier-accent);
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
}

.command-content {
  color: var(--text-normal);
  font-size: 14px;
  line-height: 1.7;
}
</style>
