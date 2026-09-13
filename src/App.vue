<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import ToastHost from '@/components/ui/ToastHost.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500">
    <Header />

    <!-- [&>*]:min-w-0: 消除 flex 子项默认 min-width:auto 引发的长内容横向溢出 -->
    <main class="flex-1 flex flex-col [&>*]:min-w-0">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <Footer />
    <ToastHost />
  </div>
</template>

<style>
/* 页面级路由过渡：淡入 + 微幅上滑（0.18s 回弹微动效） */
.page-enter-active {
  transition: opacity 0.18s cubic-bezier(0.34, 1.7, 0.64, 1), transform 0.18s cubic-bezier(0.34, 1.7, 0.64, 1);
}
.page-leave-active {
  transition: opacity 0.12s ease-in, transform 0.12s ease-in;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
