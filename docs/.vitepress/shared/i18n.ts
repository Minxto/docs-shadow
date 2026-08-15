export type LocaleKey = 'root' | 'fr' | 'es' | 'pt' | 'it' | 'vi' | 'zh'

export const localeConfig: Record<LocaleKey, { label: string; lang: string; link?: string }> = {
  root: { label: 'English', lang: 'en-US' },
  fr: { label: 'Français', lang: 'fr-FR', link: '/fr/' },
  es: { label: 'Español', lang: 'es-ES', link: '/es/' },
  pt: { label: 'Português', lang: 'pt-BR', link: '/pt/' },
  it: { label: 'Italiano', lang: 'it-IT', link: '/it/' },
  vi: { label: 'Tiếng Việt', lang: 'vi-VN', link: '/vi/' },
  zh: { label: '中文', lang: 'zh-CN', link: '/zh/' }
}

type SidebarLabels = {
  shadowEmulator: string
  shadowColor: string
  requirements: string
  howToUse: string
  tutorial: string
  fixErrors: string
  avoidingGameBans: string
}

type UiLabels = {
  siteTitle: string
  welcomeSidebar: string
  poweredBy: string
  search: string
  copy: string
  copied: string
  previous: string
  next: string
  lastUpdated: string
  langMenu: string
  onThisPage: string
  homeTitle: string
  homeSubtitle: string
  homeWebsite: string
  homeWebsiteHint: string
  homeDiscord: string
  homeDiscordHint: string
  homeLinksTitle: string
  homeLinkEmulatorRequirements: string
  homeLinkEmulatorHowToUse: string
  homeLinkEmulatorTutorial: string
  homeLinkEmulatorFixErrors: string
  homeLinkEmulatorAvoidingBans: string
  homeLinkColorRequirements: string
  homeLinkColorHowToUse: string
  homeLinkColorTutorial: string
  homeLinkColorFixErrors: string
  homeLinkColorAvoidingBans: string
}

type StatusLabels = {
  button: string
  allOperational: string
  someIssues: string
  uptimeIntro: string
  operational: string
  degraded: string
  partial: string
  major: string
  daysAgo: string
  today: string
  uptime: string
}

const sidebarEn: SidebarLabels = {
  shadowEmulator: 'Shadow Emulator',
  shadowColor: 'Shadow Color',
  requirements: 'Requirements',
  howToUse: 'How to use',
  tutorial: 'Tutorial',
  fixErrors: 'Fix Errors',
  avoidingGameBans: 'Avoiding Game-Bans'
}

export const sidebarLabels: Record<LocaleKey, SidebarLabels> = {
  root: sidebarEn,
  fr: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    requirements: 'Prérequis',
    howToUse: 'Comment utiliser',
    tutorial: 'Tutoriel',
    fixErrors: 'Corriger les erreurs',
    avoidingGameBans: 'Éviter les bans'
  },
  es: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    requirements: 'Requisitos',
    howToUse: 'Cómo usar',
    tutorial: 'Tutorial',
    fixErrors: 'Corregir errores',
    avoidingGameBans: 'Evitar baneos'
  },
  pt: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    requirements: 'Requisitos',
    howToUse: 'Como usar',
    tutorial: 'Tutorial',
    fixErrors: 'Corrigir erros',
    avoidingGameBans: 'Evitar bans'
  },
  it: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    requirements: 'Requisiti',
    howToUse: 'Come usare',
    tutorial: 'Tutorial',
    fixErrors: 'Correggere errori',
    avoidingGameBans: 'Evitare ban'
  },
  vi: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    requirements: 'Yêu cầu',
    howToUse: 'Cách sử dụng',
    tutorial: 'Hướng dẫn',
    fixErrors: 'Sửa lỗi',
    avoidingGameBans: 'Tránh bị ban'
  },
  zh: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    requirements: '要求',
    howToUse: '使用方法',
    tutorial: '教程',
    fixErrors: '修复错误',
    avoidingGameBans: '避免封号'
  }
}

export function createSidebar(labels: SidebarLabels) {
  return [
    {
      text: labels.shadowEmulator,
      collapsed: false,
      items: [
        { text: labels.requirements, link: '/shadow-emulator/requirements' },
        { text: labels.howToUse, link: '/shadow-emulator/how-to-use' },
        { text: labels.tutorial, link: '/shadow-emulator/tutorial' },
        { text: labels.fixErrors, link: '/shadow-emulator/fix-errors' },
        { text: labels.avoidingGameBans, link: '/shadow-emulator/avoiding-game-bans' }
      ]
    },
    {
      text: labels.shadowColor,
      collapsed: false,
      items: [
        { text: labels.requirements, link: '/shadow-color/requirements' },
        { text: labels.howToUse, link: '/shadow-color/how-to-use' },
        { text: labels.tutorial, link: '/shadow-color/tutorial' },
        { text: labels.fixErrors, link: '/shadow-color/fix-errors' },
        { text: labels.avoidingGameBans, link: '/shadow-color/avoiding-game-bans' }
      ]
    }
  ]
}

const uiEn: UiLabels = {
  siteTitle: 'shadow.Locker | Documentation',
  welcomeSidebar: 'Welcome to Shadow Tutorial',
  poweredBy: 'Powered by Shadow',
  search: 'Search...',
  copy: 'Copy',
  copied: 'Copied!',
  previous: 'Previous',
  next: 'Next',
  lastUpdated: 'Last updated',
  langMenu: 'Language',
  onThisPage: 'On this page',
  homeTitle: 'Welcome to Shadow Docs',
  homeSubtitle: 'Make sure to follow every step 100% correctly.',
  homeWebsite: 'Website',
  homeWebsiteHint: 'Shadow Locker community',
  homeDiscord: 'Discord',
  homeDiscordHint: 'Join our Discord server',
  homeLinksTitle: 'Tutorial links',
  homeLinkEmulatorRequirements: 'Shadow Emulator — Requirements',
  homeLinkEmulatorHowToUse: 'Shadow Emulator — How to use',
  homeLinkEmulatorTutorial: 'Shadow Emulator — Tutorial',
  homeLinkEmulatorFixErrors: 'Shadow Emulator — Fix Errors',
  homeLinkEmulatorAvoidingBans: 'Shadow Emulator — Avoiding Game-Bans',
  homeLinkColorRequirements: 'Shadow Color — Requirements',
  homeLinkColorHowToUse: 'Shadow Color — How to use',
  homeLinkColorTutorial: 'Shadow Color — Tutorial',
  homeLinkColorFixErrors: 'Shadow Color — Fix Errors',
  homeLinkColorAvoidingBans: 'Shadow Color — Avoiding Game-Bans'
}

export const uiLabels: Record<LocaleKey, UiLabels> = {
  root: uiEn,
  fr: {
    ...uiEn,
    welcomeSidebar: 'Bienvenue sur Shadow Tutorial',
    search: 'Rechercher...',
    copy: 'Copier',
    copied: 'Copié !',
    previous: 'Précédent',
    next: 'Suivant',
    lastUpdated: 'Dernière mise à jour',
    langMenu: 'Langue',
    onThisPage: 'Sur cette page',
    homeTitle: 'Bienvenue sur Shadow Docs',
    homeSubtitle: 'Assurez-vous de suivre toutes les étapes à 100 % correctement.',
    homeWebsite: 'Site web',
    homeWebsiteHint: 'Communauté Shadow Locker',
    homeDiscord: 'Discord',
    homeDiscordHint: 'Rejoindre notre serveur Discord',
    homeLinksTitle: 'Liens du tutoriel',
    homeLinkEmulatorRequirements: 'Shadow Emulator — Prérequis',
    homeLinkEmulatorHowToUse: 'Shadow Emulator — Comment utiliser',
    homeLinkEmulatorTutorial: 'Shadow Emulator — Tutoriel',
    homeLinkEmulatorFixErrors: 'Shadow Emulator — Corriger les erreurs',
    homeLinkEmulatorAvoidingBans: 'Shadow Emulator — Éviter les bans',
    homeLinkColorRequirements: 'Shadow Color — Prérequis',
    homeLinkColorHowToUse: 'Shadow Color — Comment utiliser',
    homeLinkColorTutorial: 'Shadow Color — Tutoriel',
    homeLinkColorFixErrors: 'Shadow Color — Corriger les erreurs',
    homeLinkColorAvoidingBans: 'Shadow Color — Éviter les bans'
  },
  es: {
    ...uiEn,
    welcomeSidebar: 'Bienvenido a Shadow Tutorial',
    search: 'Buscar...',
    copy: 'Copiar',
    copied: '¡Copiado!',
    previous: 'Anterior',
    next: 'Siguiente',
    lastUpdated: 'Última actualización',
    langMenu: 'Idioma',
    onThisPage: 'En esta página',
    homeTitle: 'Bienvenido a Shadow Docs',
    homeSubtitle: 'Asegúrate de seguir todos los pasos al 100 % correctamente.',
    homeWebsite: 'Sitio web',
    homeWebsiteHint: 'Comunidad Shadow Locker',
    homeDiscord: 'Discord',
    homeDiscordHint: 'Únete a nuestro servidor de Discord',
    homeLinksTitle: 'Enlaces del tutorial',
    homeLinkEmulatorRequirements: 'Shadow Emulator — Requisitos',
    homeLinkEmulatorHowToUse: 'Shadow Emulator — Cómo usar',
    homeLinkEmulatorTutorial: 'Shadow Emulator — Tutorial',
    homeLinkEmulatorFixErrors: 'Shadow Emulator — Corregir errores',
    homeLinkEmulatorAvoidingBans: 'Shadow Emulator — Evitar baneos',
    homeLinkColorRequirements: 'Shadow Color — Requisitos',
    homeLinkColorHowToUse: 'Shadow Color — Cómo usar',
    homeLinkColorTutorial: 'Shadow Color — Tutorial',
    homeLinkColorFixErrors: 'Shadow Color — Corregir errores',
    homeLinkColorAvoidingBans: 'Shadow Color — Evitar baneos'
  },
  pt: {
    ...uiEn,
    welcomeSidebar: 'Bem-vindo ao Shadow Tutorial',
    search: 'Pesquisar...',
    copy: 'Copiar',
    copied: 'Copiado!',
    previous: 'Anterior',
    next: 'Próximo',
    lastUpdated: 'Última atualização',
    langMenu: 'Idioma',
    onThisPage: 'Nesta página',
    homeTitle: 'Bem-vindo ao Shadow Docs',
    homeSubtitle: 'Certifique-se de seguir todas as etapas 100% corretamente.',
    homeWebsite: 'Site',
    homeWebsiteHint: 'Comunidade Shadow Locker',
    homeDiscord: 'Discord',
    homeDiscordHint: 'Entre no nosso servidor Discord',
    homeLinksTitle: 'Links do tutorial',
    homeLinkEmulatorRequirements: 'Shadow Emulator — Requisitos',
    homeLinkEmulatorHowToUse: 'Shadow Emulator — Como usar',
    homeLinkEmulatorTutorial: 'Shadow Emulator — Tutorial',
    homeLinkEmulatorFixErrors: 'Shadow Emulator — Corrigir erros',
    homeLinkEmulatorAvoidingBans: 'Shadow Emulator — Evitar bans',
    homeLinkColorRequirements: 'Shadow Color — Requisitos',
    homeLinkColorHowToUse: 'Shadow Color — Como usar',
    homeLinkColorTutorial: 'Shadow Color — Tutorial',
    homeLinkColorFixErrors: 'Shadow Color — Corrigir erros',
    homeLinkColorAvoidingBans: 'Shadow Color — Evitar bans'
  },
  it: {
    ...uiEn,
    welcomeSidebar: 'Benvenuto su Shadow Tutorial',
    search: 'Cerca...',
    copy: 'Copia',
    copied: 'Copiato!',
    previous: 'Precedente',
    next: 'Successivo',
    lastUpdated: 'Ultimo aggiornamento',
    langMenu: 'Lingua',
    onThisPage: 'In questa pagina',
    homeTitle: 'Benvenuto su Shadow Docs',
    homeSubtitle: 'Assicurati di seguire tutti i passaggi al 100% correttamente.',
    homeWebsite: 'Sito web',
    homeWebsiteHint: 'Community Shadow Locker',
    homeDiscord: 'Discord',
    homeDiscordHint: 'Unisciti al nostro server Discord',
    homeLinksTitle: 'Link del tutorial',
    homeLinkEmulatorRequirements: 'Shadow Emulator — Requisiti',
    homeLinkEmulatorHowToUse: 'Shadow Emulator — Come usare',
    homeLinkEmulatorTutorial: 'Shadow Emulator — Tutorial',
    homeLinkEmulatorFixErrors: 'Shadow Emulator — Correggere errori',
    homeLinkEmulatorAvoidingBans: 'Shadow Emulator — Evitare ban',
    homeLinkColorRequirements: 'Shadow Color — Requisiti',
    homeLinkColorHowToUse: 'Shadow Color — Come usare',
    homeLinkColorTutorial: 'Shadow Color — Tutorial',
    homeLinkColorFixErrors: 'Shadow Color — Correggere errori',
    homeLinkColorAvoidingBans: 'Shadow Color — Evitare ban'
  },
  vi: {
    ...uiEn,
    welcomeSidebar: 'Chào mừng đến Shadow Tutorial',
    search: 'Tìm kiếm...',
    copy: 'Sao chép',
    copied: 'Đã sao chép!',
    previous: 'Trước',
    next: 'Tiếp',
    lastUpdated: 'Cập nhật lần cuối',
    langMenu: 'Ngôn ngữ',
    onThisPage: 'Trên trang này',
    homeTitle: 'Chào mừng đến Shadow Docs',
    homeSubtitle: 'Hãy chắc chắn thực hiện tất cả các bước 100% chính xác.',
    homeWebsite: 'Trang web',
    homeWebsiteHint: 'Cộng đồng Shadow Locker',
    homeDiscord: 'Discord',
    homeDiscordHint: 'Tham gia máy chủ Discord của chúng tôi',
    homeLinksTitle: 'Liên kết hướng dẫn',
    homeLinkEmulatorRequirements: 'Shadow Emulator — Yêu cầu',
    homeLinkEmulatorHowToUse: 'Shadow Emulator — Cách sử dụng',
    homeLinkEmulatorTutorial: 'Shadow Emulator — Hướng dẫn',
    homeLinkEmulatorFixErrors: 'Shadow Emulator — Sửa lỗi',
    homeLinkEmulatorAvoidingBans: 'Shadow Emulator — Tránh bị ban',
    homeLinkColorRequirements: 'Shadow Color — Yêu cầu',
    homeLinkColorHowToUse: 'Shadow Color — Cách sử dụng',
    homeLinkColorTutorial: 'Shadow Color — Hướng dẫn',
    homeLinkColorFixErrors: 'Shadow Color — Sửa lỗi',
    homeLinkColorAvoidingBans: 'Shadow Color — Tránh bị ban'
  },
  zh: {
    ...uiEn,
    welcomeSidebar: '欢迎使用 Shadow Tutorial',
    search: '搜索...',
    copy: '复制',
    copied: '已复制！',
    previous: '上一页',
    next: '下一页',
    lastUpdated: '最后更新',
    langMenu: '语言',
    onThisPage: '本页内容',
    homeTitle: '欢迎使用 Shadow Docs',
    homeSubtitle: '请确保 100% 正确地完成所有步骤。',
    homeWebsite: '网站',
    homeWebsiteHint: 'Shadow Locker 社区',
    homeDiscord: 'Discord',
    homeDiscordHint: '加入我们的 Discord 服务器',
    homeLinksTitle: '教程链接',
    homeLinkEmulatorRequirements: 'Shadow Emulator — 要求',
    homeLinkEmulatorHowToUse: 'Shadow Emulator — 使用方法',
    homeLinkEmulatorTutorial: 'Shadow Emulator — 教程',
    homeLinkEmulatorFixErrors: 'Shadow Emulator — 修复错误',
    homeLinkEmulatorAvoidingBans: 'Shadow Emulator — 避免封号',
    homeLinkColorRequirements: 'Shadow Color — 要求',
    homeLinkColorHowToUse: 'Shadow Color — 使用方法',
    homeLinkColorTutorial: 'Shadow Color — 教程',
    homeLinkColorFixErrors: 'Shadow Color — 修复错误',
    homeLinkColorAvoidingBans: 'Shadow Color — 避免封号'
  }
}

export function getUiLabels(locale: string): UiLabels {
  return uiLabels[(locale as LocaleKey)] ?? uiLabels.root
}

const statusEn: StatusLabels = {
  button: 'Status',
  allOperational: 'All Systems Operational',
  someIssues: 'Some Systems Experiencing Issues',
  uptimeIntro: 'Uptime over the past 90 days.',
  operational: 'Operational',
  degraded: 'Degraded Performance',
  partial: 'Partial Outage',
  major: 'Major Outage',
  daysAgo: '90 days ago',
  today: 'Today',
  uptime: 'uptime'
}

export const statusLabels: Record<LocaleKey, StatusLabels> = {
  root: statusEn,
  fr: {
    button: 'Statut',
    allOperational: 'Tous les systèmes sont opérationnels',
    someIssues: 'Certains systèmes rencontrent des problèmes',
    uptimeIntro: 'Disponibilité sur les 90 derniers jours.',
    operational: 'Opérationnel',
    degraded: 'Performances dégradées',
    partial: 'Panne partielle',
    major: 'Panne majeure',
    daysAgo: 'Il y a 90 jours',
    today: "Aujourd'hui",
    uptime: 'de disponibilité'
  },
  es: {
    button: 'Estado',
    allOperational: 'Todos los sistemas operativos',
    someIssues: 'Algunos sistemas presentan problemas',
    uptimeIntro: 'Tiempo activo en los últimos 90 días.',
    operational: 'Operativo',
    degraded: 'Rendimiento degradado',
    partial: 'Interrupción parcial',
    major: 'Interrupción mayor',
    daysAgo: 'Hace 90 días',
    today: 'Hoy',
    uptime: 'de tiempo activo'
  },
  pt: {
    button: 'Status',
    allOperational: 'Todos os sistemas operacionais',
    someIssues: 'Alguns sistemas estão com problemas',
    uptimeIntro: 'Tempo de atividade nos últimos 90 dias.',
    operational: 'Operacional',
    degraded: 'Desempenho degradado',
    partial: 'Interrupção parcial',
    major: 'Interrupção maior',
    daysAgo: 'Há 90 dias',
    today: 'Hoje',
    uptime: 'de tempo de atividade'
  },
  it: {
    button: 'Stato',
    allOperational: 'Tutti i sistemi operativi',
    someIssues: 'Alcuni sistemi stanno riscontrando problemi',
    uptimeIntro: 'Uptime negli ultimi 90 giorni.',
    operational: 'Operativo',
    degraded: 'Prestazioni degradate',
    partial: 'Interruzione parziale',
    major: 'Interruzione grave',
    daysAgo: '90 giorni fa',
    today: 'Oggi',
    uptime: 'di uptime'
  },
  vi: {
    button: 'Trạng thái',
    allOperational: 'Tất cả hệ thống đang hoạt động',
    someIssues: 'Một số hệ thống đang gặp sự cố',
    uptimeIntro: 'Thời gian hoạt động trong 90 ngày qua.',
    operational: 'Hoạt động',
    degraded: 'Hiệu suất suy giảm',
    partial: 'Gián đoạn một phần',
    major: 'Gián đoạn nghiêm trọng',
    daysAgo: '90 ngày trước',
    today: 'Hôm nay',
    uptime: 'thời gian hoạt động'
  },
  zh: {
    button: '状态',
    allOperational: '所有系统运行正常',
    someIssues: '部分系统出现问题',
    uptimeIntro: '过去 90 天的正常运行时间。',
    operational: '正常运行',
    degraded: '性能下降',
    partial: '部分中断',
    major: '严重中断',
    daysAgo: '90 天前',
    today: '今天',
    uptime: '正常运行时间'
  }
}

export function getStatusLabels(locale: string): StatusLabels {
  return statusLabels[(locale as LocaleKey)] ?? statusLabels.root
}
