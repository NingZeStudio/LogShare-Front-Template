<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  PhSun as Sun,
  PhMoon as Moon,
  PhMonitor as Monitor
} from '@phosphor-icons/vue'

export type DisplayMode = 'light' | 'dark' | 'system'

const displayMode = ref<DisplayMode>('system')

const themeOptions = [
  { mode: 'light' as DisplayMode, icon: Sun, label: '浅色' },
  { mode: 'dark' as DisplayMode, icon: Moon, label: '深色' },
  { mode: 'system' as DisplayMode, icon: Monitor, label: '跟随系统' }
]

const applyDisplayMode = (mode: DisplayMode) => {
  if (typeof window === 'undefined') return
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = mode === 'dark' || (mode === 'system' && prefersDark)
  document.documentElement.classList.toggle('dark', dark)
}

const setDisplayMode = (mode: DisplayMode) => {
  displayMode.value = mode
  if (mode === 'system') {
    localStorage.removeItem('display_mode')
  } else {
    localStorage.setItem('display_mode', mode)
  }
  applyDisplayMode(mode)
}

onMounted(() => {
  const stored = localStorage.getItem('display_mode') as DisplayMode | null
  displayMode.value = stored === 'dark' || stored === 'light' ? stored : 'system'
  applyDisplayMode(displayMode.value)

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    if (!localStorage.getItem('display_mode')) {
      applyDisplayMode('system')
    }
  })
})
</script>

<template>
  <div
    class="relative flex items-center gap-0.5 rounded-full border border-border/60 bg-background/60 p-0.5"
    role="tablist"
    aria-label="显示模式"
  >
    <span
      aria-hidden="true"
      class="absolute left-0.5 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-muted-foreground/25 shadow-sm transition-transform duration-300 ease-out"
      :style="{
        transform: `translateX(${themeOptions.findIndex(o => o.mode === displayMode) * 30}px) translateY(-50%)`
      }"
    />
    <button
      v-for="option in themeOptions"
      :key="option.mode"
      type="button"
      role="tab"
      :aria-selected="displayMode === option.mode"
      :aria-label="option.label"
      class="relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
      :class="{ '!text-foreground font-semibold': displayMode === option.mode }"
      @click="setDisplayMode(option.mode)"
    >
      <component :is="option.icon" weight="duotone" class="h-4 w-4" />
    </button>
  </div>
</template>
