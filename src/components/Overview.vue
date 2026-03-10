<template>
  <div class="overview-section">
    <h2 class="section-title">Overview</h2>
    <div ref="descriptionRef" class="description" :class="{ expanded: isExpanded }">
      <div class="description-content markdown-content" v-html="parsedContent"></div>
    </div>
    <button v-if="showToggle" class="show-more-btn" @click="toggleExpanded">
      {{ isExpanded ? 'Show less' : 'Show more' }}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        :class="{ rotated: isExpanded }"
      >
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  content: string
}>()

const isExpanded = ref(false)
const showToggle = ref(false)
const descriptionRef = ref<HTMLElement | null>(null)

const parsedContent = computed(() => {
  return marked.parse(props.content, {
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

watch(parsedContent, async () => {
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
