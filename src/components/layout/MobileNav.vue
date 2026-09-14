<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { siteConfig } from '@/lib/config'
import { PhGithubLogo as Github } from '@phosphor-icons/vue'

const props = defineProps<{ scrolled?: boolean }>()

const route = useRoute()
const isOpen = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const menuEl = ref<HTMLElement | null>(null)

const toggleNav = () => {
  isOpen.value = !isOpen.value
}

const closeNav = () => {
  isOpen.value = false
}

const onDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node
  if (isOpen.value && !rootEl.value?.contains(target) && !menuEl.value?.contains(target)) {
    closeNav()
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div ref="rootEl" class="relative md:hidden flex items-center">
    <button
      class="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
      :aria-expanded="isOpen"
      aria-label="导航菜单"
      @click.stop="toggleNav"
    >
      <!-- 动画汉堡：三条线（中线半透明呼应 duotone 层次），展开时平滑合并为 X -->
      <span class="relative flex h-5 w-5 items-center justify-center">
        <span
          class="absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300 ease-bounce-soft"
          :class="isOpen ? 'rotate-45' : '-translate-y-[6px]'"
        />
        <span
          class="absolute h-0.5 w-4 rounded-full bg-current/60 transition-all duration-200"
          :class="isOpen ? 'opacity-0 scale-x-0' : 'opacity-100'"
        />
        <span
          class="absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300 ease-bounce-soft"
          :class="isOpen ? '-rotate-45' : 'translate-y-[6px]'"
        />
      </span>
    </button>

    <Teleport to="body">
      <Transition name="menu">
        <div
          v-if="isOpen"
          ref="menuEl"
          class="fixed right-3 z-50 w-56 overflow-hidden rounded-xl border border-border/60 bg-background/90 shadow-lg backdrop-blur-md"
          :class="props.scrolled ? 'top-[72px]' : 'top-[64px]'"
        >
          <div class="space-y-0.5 p-1.5">
            <RouterLink
              v-for="link in siteConfig.navLinks"
              :key="link.path"
              :to="link.path"
              class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
              :class="
                route.path === link.path || (link.path !== '/' && route.path.startsWith(link.path))
                  ? 'bg-accent text-accent-foreground font-semibold'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
              "
              @click="closeNav"
            >
              {{ link.name }}
            </RouterLink>

            <div v-if="siteConfig.github" class="border-t border-border/50 my-1" />

            <a
              v-if="siteConfig.github"
              :href="siteConfig.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/50 hover:text-accent-foreground"
              @click="closeNav"
            >
              <Github weight="duotone" class="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.menu-enter-active {
  transition:
    opacity 0.2s cubic-bezier(0.34, 1.7, 0.64, 1),
    transform 0.2s cubic-bezier(0.34, 1.7, 0.64, 1);
}

.menu-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>
