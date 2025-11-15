<template>
  <div class="overview-section">
    <h2 class="section-title">Overview</h2>
    <div class="description" :class="{ expanded: isExpanded }" ref="descriptionRef">
      <div 
        class="description-content markdown-content" 
        v-html="parsedDescription"
      />
    </div>
    <button 
      v-if="showToggle" 
      class="show-more-btn" 
      @click="toggleExpanded"
    >
      {{ isExpanded ? 'Show less' : 'Show more' }}
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        :class="{ rotated: isExpanded }"
      >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { marked } from 'marked'
import type { BotConfig } from '../config'

const props = defineProps<{
  config: BotConfig
}>()

const isExpanded = ref(false)
const showToggle = ref(false)
const descriptionRef = ref<HTMLElement | null>(null)

const parsedDescription = computed(() => {
  return marked.parse(props.config.description, { 
    breaks: true,
    gfm: true 
  })
})

const checkHeight = () => {
  if (descriptionRef.value) {
    const scrollHeight = descriptionRef.value.scrollHeight
    const clientHeight = descriptionRef.value.clientHeight
    showToggle.value = scrollHeight > clientHeight
  }
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

watch(parsedDescription, async () => {
  await nextTick()
  setTimeout(checkHeight, 50)
})

onMounted(async () => {
  await nextTick()
  setTimeout(checkHeight, 50)
})
</script>

<style scoped>
.overview-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
}

.description {
  max-height: 300px;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.description.expanded {
  max-height: none;
}

.description-content {
  color: var(--text-normal);
  font-size: 14px;
  line-height: 1.6;
}

.markdown-content :deep(p) {
  margin: 0 0 12px 0;
}

.markdown-content :deep(p:last-child) {
  margin-bottom: 0;
}

.markdown-content :deep(strong) {
  font-weight: 700;
  color: var(--text-primary);
}

.markdown-content :deep(em) {
  font-style: italic;
}

.description-content :deep(ul),
.description-content :deep(ol) {
  margin: 8px 0 12px 0;
  padding-left: 24px;
}

.description-content :deep(ul) {
  list-style-type: disc;
}

.description-content :deep(ol) {
  list-style-type: decimal;
}

.description-content :deep(li) {
  margin: 4px 0;
  list-style-position: outside;
}

.description-content :deep(ul ul),
.description-content :deep(ol ol),
.description-content :deep(ul ol),
.description-content :deep(ol ul) {
  margin-top: 4px;
  margin-bottom: 4px;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4) {
  color: var(--text-primary);
  font-weight: 700;
  margin: 16px 0 8px 0;
}

.markdown-content :deep(h1) {
  font-size: 24px;
}

.markdown-content :deep(h2) {
  font-size: 20px;
}

.markdown-content :deep(h3) {
  font-size: 18px;
}

.markdown-content :deep(h4) {
  font-size: 16px;
}

.markdown-content :deep(code) {
  background: var(--background-secondary);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
}

.markdown-content :deep(pre) {
  background: var(--background-secondary);
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  margin: 12px 0;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
}

.markdown-content :deep(a) {
  color: var(--text-link);
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--background-modifier-accent);
  padding-left: 12px;
  margin: 12px 0;
  color: var(--text-secondary);
}

.show-more-btn {
  background: none;
  border: none;
  color: var(--text-link);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 0;
  transition: color 0.2s;
  width: 100%;
  justify-content: center;
}

.show-more-btn:hover {
  color: var(--text-link-hover);
}

.show-more-btn::before,
.show-more-btn::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--background-modifier-accent);
}

.show-more-btn svg {
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.show-more-btn svg.rotated {
  transform: rotate(180deg);
}
</style>

