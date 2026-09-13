export interface NavItem {
  name: string
  path: string
  icon?: string
}

export interface FriendLink {
  name: string
  url: string
  desc?: string
}

export interface SiteConfig {
  name: string
  title: string
  description: string
  url: string
  logoText: string
  beian?: string
  github?: string
  qqGroup?: string
  contactEmail?: string
  navLinks: NavItem[]
  friendLinks: FriendLink[]
}

export const siteConfig: SiteConfig = {
  name: 'LogShare Front',
  title: 'LogShare Front UI - 现代轻量工程化前端设计范式模板',
  description: '基于 Vue 3 + Tailwind CSS + Phosphor Icons，专为现代开源项目打造的工程级稳重、低饱和度冷灰风格前台起步脚手架。',
  url: 'https://example.com',
  logoText: 'LogShare Front',
  beian: '萌ICP备20260001号',
  github: 'https://github.com/NingZeStudio',
  qqGroup: 'https://qm.qq.com/',
  contactEmail: 'contact@example.com',
  navLinks: [
    { name: '首页', path: '/' },
    { name: '范式展台', path: '/showcase' },
    { name: '使用文档', path: '/docs' }
  ],
  friendLinks: [
    { name: 'LogShare.CN', url: 'https://logshare.cn', desc: 'Minecraft 日志分享与分析平台' },
    { name: '柠泽资源站', url: 'https://miawa.cn', desc: 'Minecraft 启动器镜像分发平台' },
    { name: 'NingZe Studio', url: 'https://github.com/NingZeStudio', desc: '柠泽工作室开源矩阵' }
  ]
}
