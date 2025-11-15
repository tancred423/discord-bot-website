<template>
  <div class="permissions-section">
    <h2 class="section-title">Permissions</h2>
    <div class="permissions-card">
      <h3 class="card-title">Required Permissions</h3>
      <div class="permissions-list">
        <div 
          v-for="(permission, index) in permissions" 
          :key="index"
          class="permission-item"
        >
          <div class="permission-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="check-icon">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span class="permission-name">{{ permission.name }}</span>
          </div>
          <p v-if="permission.reason" class="permission-reason">{{ permission.reason }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Permission {
  name: string
  reason?: string
}

defineProps<{
  permissions: Permission[]
}>()
</script>

<style scoped>
.permissions-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px 0;
}

.permissions-card {
  background: var(--background-secondary);
  border-radius: 8px;
  padding: 16px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 12px 0;
}

.permissions-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.permission-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.permission-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.permission-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-normal);
}

.permission-reason {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
  padding-left: 28px;
  line-height: 1.5;
}

.check-icon {
  color: #3ba55d;
  flex-shrink: 0;
}
</style>

