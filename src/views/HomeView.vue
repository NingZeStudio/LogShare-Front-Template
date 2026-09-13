<script setup lang="ts">
import { useSeoMeta } from '@/lib/useSeoMeta'
import { siteConfig } from '@/lib/config'
import AppButton from '@/components/ui/AppButton.vue'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import {
  PhPalette as Palette,
  PhLightning as Lightning,
  PhDevices as Devices,
  PhTextT as TextIcon,
  PhArrowRight as ArrowRight,
  PhFileCode as FileCode
} from '@phosphor-icons/vue'

useSeoMeta({
  title: '首页',
  description: siteConfig.description
}, siteConfig.name)()

const features = [
  {
    icon: Palette,
    title: '低饱和度冷灰体系',
    desc: '严禁高饱和度紫蓝粉渐变，全站基于 Zinc / Slate 低饱和度语义变量构建，沉静稳重。'
  },
  {
    icon: Lightning,
    title: '物理回弹动效 (Spring)',
    desc: '全局注入 cubic-bezier(0.34, 1.7, 0.64, 1) 软阻尼缓动，无论是按钮点击还是弹窗浮动均告别生硬。'
  },
  {
    icon: Devices,
    title: '形变吸顶顶栏与全端防爆',
    desc: '滚动时平滑由平铺条形变为毛玻璃圆角悬浮胶囊；配合 overflow-x: clip 与 min-w-0 彻底根绝横向溢出。'
  },
  {
    icon: TextIcon,
    title: '自托管零阻塞字体',
    desc: '预打包 HarmonyOS Sans SC 常用汉字 ASCII 精简子集与 SauceCode Mono 代码字体，脱离外部 CDN 延迟。'
  }
]
</script>

<template>
  <div class="container mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 space-y-16">
    <!-- Hero 区域 -->
    <section class="text-center space-y-6 max-w-3xl mx-auto pt-4">
      <div class="inline-flex items-center gap-2">
        <Badge variant="secondary" class="py-1 px-3">
          <span>✨ LogShare Design System</span>
        </Badge>
        <Badge variant="outline" class="py-1 px-3">
          <span>Vue 3 + Tailwind CSS</span>
        </Badge>
      </div>

      <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
        为工程化与开源项目打造的<br class="hidden sm:inline" />
        <span class="text-muted-foreground font-extrabold">极简高质感</span> 前端设计范式
      </h1>

      <p class="text-base sm:text-lg text-muted-foreground leading-relaxed">
        沉淀自 LogShare.CN 与柠泽资源站前台设计实践。零冗余重型依赖，内置低饱和度冷灰阶、物理回弹动效、形变胶囊顶栏、细滚动条与多端元标签。
      </p>

      <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
        <AppButton as="router-link" to="/showcase" size="lg">
          浏览范式展台
          <ArrowRight weight="duotone" class="h-4 w-4" />
        </AppButton>
        <AppButton as="a" href="https://github.com/NingZeStudio" variant="outline" size="lg">
          <FileCode weight="duotone" class="h-4 w-4" />
          GitHub 仓库
        </AppButton>
      </div>
    </section>

    <!-- 特性卡片矩阵 -->
    <section class="space-y-6">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-bold tracking-tight text-foreground">设计范式核心要素</h2>
        <p class="text-sm text-muted-foreground">遵循 Vibe Coding 规范，兼顾美学调性与工程严谨性</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card v-for="feat in features" :key="feat.title" hoverable class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
              <component :is="feat.icon" weight="duotone" class="h-5 w-5" />
            </div>
            <h3 class="text-base font-bold text-foreground">{{ feat.title }}</h3>
          </div>
          <p class="text-sm text-muted-foreground leading-relaxed">
            {{ feat.desc }}
          </p>
        </Card>
      </div>
    </section>
  </div>
</template>
