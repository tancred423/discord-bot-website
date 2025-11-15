<template>
  <div class="carousel">
    <div 
      class="carousel-container"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <button class="carousel-arrow left" @click="handlePrev" aria-label="Previous image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      
      <div class="carousel-content">
        <img 
          v-for="(image, index) in images" 
          :key="index"
          :src="image"
          :alt="`Screenshot ${index + 1}`"
          class="carousel-image"
          :class="{ active: index === currentIndex }"
          @click="openPreview(index)"
        />
      </div>
      
      <button class="carousel-arrow right" @click="handleNext" aria-label="Next image">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
        </svg>
      </button>
    </div>
    
    <div class="carousel-dots">
      <button 
        v-for="(_, index) in images" 
        :key="index"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="handleGoTo(index)"
        :aria-label="`Go to image ${index + 1}`"
      />
    </div>

    <Teleport to="body">
      <div 
        v-if="showPreview" 
        class="image-preview-overlay"
        @click="closePreview"
      >
        <button class="preview-close" @click="closePreview" aria-label="Close preview">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <img 
          :src="images[previewIndex]" 
          :alt="`Screenshot ${previewIndex + 1}`"
          class="preview-image"
          @click.stop
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const currentIndex = ref(0)
const showPreview = ref(false)
const previewIndex = ref(0)
const isHovering = ref(false)
let autoplayInterval: number | null = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

const prev = () => {
  currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
}

const goTo = (index: number) => {
  currentIndex.value = index
}

const handlePrev = () => {
  prev()
  stopAutoplay()
}

const handleNext = () => {
  next()
  stopAutoplay()
}

const handleGoTo = (index: number) => {
  goTo(index)
  stopAutoplay()
}

const handleMouseEnter = () => {
  isHovering.value = true
  stopAutoplay()
}

const handleMouseLeave = () => {
  isHovering.value = false
  startAutoplay()
}

const openPreview = (index: number) => {
  previewIndex.value = index
  showPreview.value = true
  stopAutoplay()
  document.body.style.overflow = 'hidden'
}

const closePreview = () => {
  showPreview.value = false
  document.body.style.overflow = ''
  if (isHovering.value) {
    return
  }
  startAutoplay()
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showPreview.value) {
    closePreview()
  }
}

const startAutoplay = () => {
  if (autoplayInterval) {
    return
  }
  autoplayInterval = window.setInterval(() => {
    next()
  }, 5000)
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

onMounted(() => {
  startAutoplay()
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  stopAutoplay()
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.carousel {
  width: 100%;
  margin-bottom: 24px;
}

.carousel-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #1a1a1e;
  border-radius: 8px;
  overflow: hidden;
}

.carousel-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  cursor: pointer;
  pointer-events: none;
}

.carousel-image.active {
  opacity: 1;
  pointer-events: auto;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10;
}

.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.7);
}

.carousel-arrow.left {
  left: 16px;
}

.carousel-arrow.right {
  right: 16px;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--background-modifier-accent);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
}

.dot.active {
  background: var(--text-link);
}

.dot:hover {
  background: var(--text-muted);
}

.image-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  cursor: pointer;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.preview-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  z-index: 10001;
}

.preview-close:hover {
  background: rgba(0, 0, 0, 0.9);
}

.preview-image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  cursor: default;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
</style>

