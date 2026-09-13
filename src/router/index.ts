import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { updateSeoMeta } from '@/lib/useSeoMeta'
import { siteConfig } from '@/lib/config'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '首页' }
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: () => import('@/views/ShowcaseView.vue'),
      meta: { title: '范式展台' }
    },
    {
      path: '/docs',
      name: 'docs',
      redirect: '/showcase'
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: '404' }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, _from, next) => {
  const title = (to.meta.title as string) || '页面'
  updateSeoMeta({ title }, siteConfig.name)
  next()
})

export default router
