<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { siteConfig } from '@/lib/config'
import ThemeToggle from './ThemeToggle.vue'
import { PhGithubLogo as Github } from '@phosphor-icons/vue'

const route = useRoute()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const onWindowScroll = () => {
  isScrolled.value = window.scrollY > 8
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  onWindowScroll()
  window.addEventListener('scroll', onWindowScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onWindowScroll)
})
</script>

<template>
  <header class="sticky top-0 z-30 w-full pointer-events-none">
    <div
      class="pointer-events-auto mx-auto transition-all duration-300 ease-out"
      :class="
        isScrolled
          ? 'mt-3 w-[calc(100%-2rem)] max-w-6xl rounded-full border border-border/60 bg-background/80 shadow-lg backdrop-blur-md'
          : 'mt-0 w-full rounded-none border-b border-border/40 bg-background/60 backdrop-blur-sm'
      "
    >
      <div
        class="flex items-center gap-3 px-4 sm:px-6 transition-all duration-300 max-w-6xl mx-auto"
        :class="isScrolled ? 'h-12' : 'h-14'"
      >
        <!-- Logo 与站名 -->
        <RouterLink to="/" class="flex shrink-0 items-center gap-2 font-bold tracking-tight text-foreground" @click="closeMobileMenu">
          <div class="h-6 w-6 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono font-black">
            L
          </div>
          <span>{{ siteConfig.logoText }}</span>
        </RouterLink>

        <!-- 桌面端导航项 -->
        <nav class="ml-4 hidden items-center gap-1 md:flex">
          <RouterLink
            v-for="link in siteConfig.navLinks"
            :key="link.path"
            :to="link.path"
            class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            :class="
              route.path === link.path || (link.path !== '/' && route.path.startsWith(link.path))
                ? 'bg-accent text-accent-foreground font-semibold'
                : 'text-muted-foreground'
            "
          >
            {{ link.name }}
          </RouterLink>
        </nav>

        <div class="flex-1" />

        <!-- 外部链接 (GitHub) -->
        <a
          v-if="siteConfig.github"
          :href="siteConfig.github"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:inline-flex rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
          aria-label="GitHub Repository"
        >
          <Github weight="duotone" class="h-4 w-4" />
        </a>

        <!-- 主题切换胶囊 -->
        <ThemeToggle />

        <!-- 移动端汉堡按钮（三线平滑合并变 X） -->
        <div class="relative md:hidden flex items-center">
          <button
            class="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground cursor-pointer"
            :aria-expanded="isMobileMenuOpen"
            aria-label="导航菜单"
            @click.stop="toggleMobileMenu"
          >
            <span class="relative flex h-5 w-5 items-center justify-center">
              <span
                class="absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300 ease-bounce-soft"
                :class="isMobileMenuOpen ? 'rotate-45' : '-translate-y-[6px]'"
              />
              <span
                class="absolute h-0.5 w-4 rounded-full bg-current/60 transition-all duration-200"
                :class="isMobileMenuOpen ? 'opacity-0 scale-50' : 'opacity-100'"
              />
              <span
                class="absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300 ease-bounce-soft"
                :class="isMobileMenuOpen ? '-rotate-45' : 'translate-y-[6px]'"
              />
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端下拉抽屉菜单 -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-250 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-x-4 z-40 rounded-2xl border border-border/80 bg-card/95 p-4 shadow-xl backdrop-blur-md md:hidden"
          :style="{ top: isScrolled ? '72px' : '64px' }"
        >
          <div class="flex flex-col gap-1">
            <RouterLink
              v-for="link in siteConfig.navLinks"
              :key="link.path"
              :to="link.path"
              class="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              :class="route.path === link.path ? 'bg-accent text-accent-foreground font-semibold' : 'text-muted-foreground'"
              @click="closeMobileMenu"
            >
              {{ link.name }}
            </RouterLink>
            <a
              v-if="siteConfig.github"
              :href="siteConfig.github"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground flex items-center gap-2"
              @click="closeMobileMenu"
            >
              <Github weight="duotone" class="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
