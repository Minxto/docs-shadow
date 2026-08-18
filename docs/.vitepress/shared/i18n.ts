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
  rules: string
  rulesUsage: string
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
  openMenu: string
  closeMenu: string
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
  homeLinkRules: string
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
  yesterday: string
  uptime: string
  noDowntime: string
  related: string
  gatewayPartialIssue: string
  gatewayMajorIssue: string
  gatewayValErrorsIssue: string
  gatewayValErrorsMessage: string
  api: string
  gateway: string
  discordLink: string
  systemMetrics: string
  apiResponseTime: string
  day: string
  week: string
  month: string
  pastIncidents: string
  noIncidentsReported: string
  noIncidentsOnDay: string
  resolved: string
  resolvedMessage: string
  monitoring: string
  monitoringMessage: string
}

const sidebarEn: SidebarLabels = {
  shadowEmulator: 'Shadow Emulator',
  shadowColor: 'Shadow Color',
  rules: 'Rules',
  rulesUsage: 'Proper usage',
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
    rules: 'Règles',
    rulesUsage: 'Bon usage',
    requirements: 'Prérequis',
    howToUse: 'Comment utiliser',
    tutorial: 'Tutoriel',
    fixErrors: 'Corriger les erreurs',
    avoidingGameBans: 'Éviter les bans'
  },
  es: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    rules: 'Reglas',
    rulesUsage: 'Uso correcto',
    requirements: 'Requisitos',
    howToUse: 'Cómo usar',
    tutorial: 'Tutorial',
    fixErrors: 'Corregir errores',
    avoidingGameBans: 'Evitar baneos'
  },
  pt: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    rules: 'Regras',
    rulesUsage: 'Uso correto',
    requirements: 'Requisitos',
    howToUse: 'Como usar',
    tutorial: 'Tutorial',
    fixErrors: 'Corrigir erros',
    avoidingGameBans: 'Evitar bans'
  },
  it: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    rules: 'Regole',
    rulesUsage: 'Uso corretto',
    requirements: 'Requisiti',
    howToUse: 'Come usare',
    tutorial: 'Tutorial',
    fixErrors: 'Correggere errori',
    avoidingGameBans: 'Evitare ban'
  },
  vi: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    rules: 'Quy tắc',
    rulesUsage: 'Sử dụng đúng cách',
    requirements: 'Yêu cầu',
    howToUse: 'Cách sử dụng',
    tutorial: 'Hướng dẫn',
    fixErrors: 'Sửa lỗi',
    avoidingGameBans: 'Tránh bị ban'
  },
  zh: {
    shadowEmulator: 'Shadow Emulator',
    shadowColor: 'Shadow Color',
    rules: '规则',
    rulesUsage: '正确使用',
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
    },
    {
      text: labels.rules,
      collapsed: false,
      items: [
        { text: labels.rulesUsage, link: '/rules' }
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
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
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
  homeLinkColorAvoidingBans: 'Shadow Color — Avoiding Game-Bans',
  homeLinkRules: 'Rules — Proper usage'
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
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
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
    homeLinkColorAvoidingBans: 'Shadow Color — Éviter les bans',
    homeLinkRules: 'Règles — Bon usage'
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
    homeLinkColorAvoidingBans: 'Shadow Color — Evitar baneos',
    homeLinkRules: 'Reglas — Uso correcto'
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
    homeLinkColorAvoidingBans: 'Shadow Color — Evitar bans',
    homeLinkRules: 'Regras — Uso correto'
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
    homeLinkColorAvoidingBans: 'Shadow Color — Evitare ban',
    homeLinkRules: 'Regole — Uso corretto'
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
    homeLinkColorAvoidingBans: 'Shadow Color — Tránh bị ban',
    homeLinkRules: 'Quy tắc — Sử dụng đúng cách'
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
    homeLinkColorAvoidingBans: 'Shadow Color — 避免封号',
    homeLinkRules: '规则 — 正确使用'
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
  yesterday: 'Yesterday',
  uptime: 'uptime',
  noDowntime: 'No downtime recorded on this day.',
  related: 'RELATED',
  gatewayPartialIssue: 'Gateway connection instability',
  gatewayMajorIssue: 'Gateway service interruption',
  gatewayValErrorsIssue: 'Gateway partial outage due to Val5 and VAL-102 errors',
  gatewayValErrorsMessage: 'We are investigating Val5 and VAL-102 errors affecting Gateway connectivity.',
  api: 'API',
  gateway: 'Gateway',
  discordLink: 'Discord Link',
  systemMetrics: 'System Metrics',
  apiResponseTime: 'API Response Time',
  day: 'Day',
  week: 'Week',
  month: 'Month',
  pastIncidents: 'Past Incidents',
  noIncidentsReported: 'No incidents reported today.',
  noIncidentsOnDay: 'No incidents reported.',
  resolved: 'Resolved',
  resolvedMessage: 'This incident has been resolved.',
  monitoring: 'Monitoring',
  monitoringMessage: 'We are monitoring the situation after the outage.'
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
    yesterday: 'Hier',
    uptime: 'de disponibilité',
    noDowntime: 'Aucune interruption enregistrée ce jour-là.',
    related: 'LIÉ',
    gatewayPartialIssue: 'Instabilité de la connexion Gateway',
    gatewayMajorIssue: 'Interruption du service Gateway',
    gatewayValErrorsIssue: 'Panne partielle Gateway suite aux erreurs Val5 et VAL-102',
    gatewayValErrorsMessage: 'Nous enquêtons sur les erreurs Val5 et VAL-102 affectant la connexion Gateway.',
    api: 'API',
    gateway: 'Gateway',
    discordLink: 'Lien Discord',
    systemMetrics: 'Métriques système',
    apiResponseTime: 'Temps de réponse API',
    day: 'Jour',
    week: 'Semaine',
    month: 'Mois',
    pastIncidents: 'Incidents passés',
    noIncidentsReported: 'Aucun incident signalé aujourd’hui.',
    noIncidentsOnDay: 'Aucun incident signalé.',
    resolved: 'Résolu',
    resolvedMessage: 'Cet incident a été résolu.',
    monitoring: 'Surveillance',
    monitoringMessage: 'Nous surveillons la situation après la panne.'
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
    yesterday: 'Ayer',
    uptime: 'de tiempo activo',
    noDowntime: 'No se registró tiempo de inactividad este día.',
    related: 'RELACIONADO',
    gatewayPartialIssue: 'Inestabilidad de la conexión Gateway',
    gatewayMajorIssue: 'Interrupción del servicio Gateway',
    gatewayValErrorsIssue: 'Interrupción parcial de Gateway por errores Val5 y VAL-102',
    gatewayValErrorsMessage: 'Estamos investigando los errores Val5 y VAL-102 que afectan la conexión Gateway.',
    api: 'API',
    gateway: 'Gateway',
    discordLink: 'Enlace de Discord',
    systemMetrics: 'Métricas del sistema',
    apiResponseTime: 'Tiempo de respuesta de la API',
    day: 'Día',
    week: 'Semana',
    month: 'Mes',
    pastIncidents: 'Incidentes pasados',
    noIncidentsReported: 'No se reportaron incidentes hoy.',
    noIncidentsOnDay: 'No se reportaron incidentes.',
    resolved: 'Resuelto',
    resolvedMessage: 'Este incidente ha sido resuelto.',
    monitoring: 'Monitoreo',
    monitoringMessage: 'Estamos monitoreando la situación después de la interrupción.'
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
    yesterday: 'Ontem',
    uptime: 'de tempo de atividade',
    noDowntime: 'Nenhuma indisponibilidade registrada neste dia.',
    related: 'RELACIONADO',
    gatewayPartialIssue: 'Instabilidade na conexão Gateway',
    gatewayMajorIssue: 'Interrupção do serviço Gateway',
    gatewayValErrorsIssue: 'Interrupção parcial do Gateway devido a erros Val5 e VAL-102',
    gatewayValErrorsMessage: 'Estamos investigando erros Val5 e VAL-102 que afetam a conexão Gateway.',
    api: 'API',
    gateway: 'Gateway',
    discordLink: 'Link do Discord',
    systemMetrics: 'Métricas do sistema',
    apiResponseTime: 'Tempo de resposta da API',
    day: 'Dia',
    week: 'Semana',
    month: 'Mês',
    pastIncidents: 'Incidentes anteriores',
    noIncidentsReported: 'Nenhum incidente reportado hoje.',
    noIncidentsOnDay: 'Nenhum incidente reportado.',
    resolved: 'Resolvido',
    resolvedMessage: 'Este incidente foi resolvido.',
    monitoring: 'Monitoramento',
    monitoringMessage: 'Estamos monitorando a situação após a interrupção.'
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
    yesterday: 'Ieri',
    uptime: 'di uptime',
    noDowntime: 'Nessun downtime registrato in questo giorno.',
    related: 'CORRELATO',
    gatewayPartialIssue: 'Instabilità della connessione Gateway',
    gatewayMajorIssue: 'Interruzione del servizio Gateway',
    gatewayValErrorsIssue: 'Interruzione parziale Gateway dovuta a errori Val5 e VAL-102',
    gatewayValErrorsMessage: 'Stiamo investigando gli errori Val5 e VAL-102 che influenzano la connessione Gateway.',
    api: 'API',
    gateway: 'Gateway',
    discordLink: 'Link Discord',
    systemMetrics: 'Metriche di sistema',
    apiResponseTime: 'Tempo di risposta API',
    day: 'Giorno',
    week: 'Settimana',
    month: 'Mese',
    pastIncidents: 'Incidenti passati',
    noIncidentsReported: 'Nessun incidente segnalato oggi.',
    noIncidentsOnDay: 'Nessun incidente segnalato.',
    resolved: 'Risolto',
    resolvedMessage: 'Questo incidente è stato risolto.',
    monitoring: 'Monitoraggio',
    monitoringMessage: 'Stiamo monitorando la situazione dopo l’interruzione.'
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
    yesterday: 'Hôm qua',
    uptime: 'thời gian hoạt động',
    noDowntime: 'Không có sự cố nào được ghi nhận trong ngày này.',
    related: 'LIÊN QUAN',
    gatewayPartialIssue: 'Kết nối Gateway không ổn định',
    gatewayMajorIssue: 'Gián đoạn dịch vụ Gateway',
    gatewayValErrorsIssue: 'Sự cố một phần Gateway do lỗi Val5 và VAL-102',
    gatewayValErrorsMessage: 'Chúng tôi đang điều tra lỗi Val5 và VAL-102 ảnh hưởng đến kết nối Gateway.',
    api: 'API',
    gateway: 'Gateway',
    discordLink: 'Liên kết Discord',
    systemMetrics: 'Số liệu hệ thống',
    apiResponseTime: 'Thời gian phản hồi API',
    day: 'Ngày',
    week: 'Tuần',
    month: 'Tháng',
    pastIncidents: 'Sự cố trong quá khứ',
    noIncidentsReported: 'Không có sự cố nào được báo cáo hôm nay.',
    noIncidentsOnDay: 'Không có sự cố nào được báo cáo.',
    resolved: 'Đã giải quyết',
    resolvedMessage: 'Sự cố này đã được giải quyết.',
    monitoring: 'Đang theo dõi',
    monitoringMessage: 'Chúng tôi đang theo dõi tình hình sau sự cố.'
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
    yesterday: '昨天',
    uptime: '正常运行时间',
    noDowntime: '当天未记录任何停机时间。',
    related: '相关',
    gatewayPartialIssue: 'Gateway 连接不稳定',
    gatewayMajorIssue: 'Gateway 服务中断',
    gatewayValErrorsIssue: 'Gateway 因 Val5 和 VAL-102 错误部分中断',
    gatewayValErrorsMessage: '我们正在调查影响 Gateway 连接的 Val5 和 VAL-102 错误。',
    api: 'API',
    gateway: 'Gateway',
    discordLink: 'Discord 链接',
    systemMetrics: '系统指标',
    apiResponseTime: 'API 响应时间',
    day: '日',
    week: '周',
    month: '月',
    pastIncidents: '历史事件',
    noIncidentsReported: '今天未报告任何事件。',
    noIncidentsOnDay: '未报告任何事件。',
    resolved: '已解决',
    resolvedMessage: '此事件已解决。',
    monitoring: '监控中',
    monitoringMessage: '我们正在中断发生后监控情况。'
  }
}

export function getStatusLabels(locale: string): StatusLabels {
  return statusLabels[(locale as LocaleKey)] ?? statusLabels.root
}

type ReportLabels = {
  title: string
  subtitle: string
  namePlaceholder: string
  messagePlaceholder: string
  submitReport: string
  submitReply: string
  reply: string
  replies: string
  anonymous: string
  empty: string
  loading: string
  refresh: string
  profanityError: string
  linkError: string
  submitError: string
  unavailable: string
  posting: string
}

const reportEn: ReportLabels = {
  title: 'Community Reports',
  subtitle: 'Share an issue visible to everyone.',
  namePlaceholder: 'Your name (optional)',
  messagePlaceholder: 'Describe the issue...',
  submitReport: 'Post report',
  submitReply: 'Post reply',
  reply: 'Reply',
  replies: 'replies',
  anonymous: 'Anonymous',
  empty: 'No reports yet. Be the first to post one.',
  loading: 'Loading reports...',
  refresh: 'Refresh',
  profanityError: 'Insults and offensive language are not allowed.',
  linkError: 'Links and advertising are not allowed.',
  submitError: 'Could not submit. Please try again.',
  unavailable: 'Reports are temporarily unavailable.',
  posting: 'Posting...'
}

export const reportLabels: Record<LocaleKey, ReportLabels> = {
  root: reportEn,
  fr: {
    ...reportEn,
    title: 'Signalements',
    subtitle: 'Partagez un problème visible par tous.',
    namePlaceholder: 'Votre nom (optionnel)',
    messagePlaceholder: 'Décrivez le problème...',
    submitReport: 'Publier',
    submitReply: 'Répondre',
    reply: 'Répondre',
    replies: 'réponses',
    anonymous: 'Anonyme',
    empty: 'Aucun signalement pour le moment.',
    loading: 'Chargement...',
    refresh: 'Actualiser',
    profanityError: 'Les insultes et propos offensants sont interdits.',
    linkError: 'Les liens et la publicité sont interdits.',
    submitError: 'Envoi impossible. Réessayez.',
    unavailable: 'Signalements temporairement indisponibles.',
    posting: 'Envoi...'
  },
  es: {
    ...reportEn,
    title: 'Reportes',
    subtitle: 'Comparte un problema visible para todos.',
    namePlaceholder: 'Tu nombre (opcional)',
    messagePlaceholder: 'Describe el problema...',
    submitReport: 'Publicar',
    submitReply: 'Responder',
    reply: 'Responder',
    replies: 'respuestas',
    anonymous: 'Anónimo',
    empty: 'Aún no hay reportes.',
    loading: 'Cargando...',
    refresh: 'Actualizar',
    profanityError: 'No se permiten insultos ni lenguaje ofensivo.',
    linkError: 'No se permiten enlaces ni publicidad.',
    submitError: 'No se pudo enviar. Inténtalo de nuevo.',
    unavailable: 'Reportes temporalmente no disponibles.',
    posting: 'Enviando...'
  },
  pt: {
    ...reportEn,
    title: 'Relatórios',
    subtitle: 'Compartilhe um problema visível para todos.',
    namePlaceholder: 'Seu nome (opcional)',
    messagePlaceholder: 'Descreva o problema...',
    submitReport: 'Publicar',
    submitReply: 'Responder',
    reply: 'Responder',
    replies: 'respostas',
    anonymous: 'Anônimo',
    empty: 'Nenhum relatório ainda.',
    loading: 'Carregando...',
    refresh: 'Atualizar',
    profanityError: 'Insultos e linguagem ofensiva não são permitidos.',
    linkError: 'Links e publicidade não são permitidos.',
    submitError: 'Não foi possível enviar. Tente novamente.',
    unavailable: 'Relatórios temporariamente indisponíveis.',
    posting: 'Enviando...'
  },
  it: {
    ...reportEn,
    title: 'Segnalazioni',
    subtitle: 'Condividi un problema visibile a tutti.',
    namePlaceholder: 'Il tuo nome (opzionale)',
    messagePlaceholder: 'Descrivi il problema...',
    submitReport: 'Pubblica',
    submitReply: 'Rispondi',
    reply: 'Rispondi',
    replies: 'risposte',
    anonymous: 'Anonimo',
    empty: 'Nessuna segnalazione ancora.',
    loading: 'Caricamento...',
    refresh: 'Aggiorna',
    profanityError: 'Insulti e linguaggio offensivo non sono ammessi.',
    linkError: 'Link e pubblicità non sono ammessi.',
    submitError: 'Invio non riuscito. Riprova.',
    unavailable: 'Segnalazioni temporaneamente non disponibili.',
    posting: 'Invio...'
  },
  vi: {
    ...reportEn,
    title: 'Báo cáo',
    subtitle: 'Chia sẻ sự cố cho mọi người xem.',
    namePlaceholder: 'Tên của bạn (tuỳ chọn)',
    messagePlaceholder: 'Mô tả sự cố...',
    submitReport: 'Đăng báo cáo',
    submitReply: 'Trả lời',
    reply: 'Trả lời',
    replies: 'phản hồi',
    anonymous: 'Ẩn danh',
    empty: 'Chưa có báo cáo nào.',
    loading: 'Đang tải...',
    refresh: 'Làm mới',
    profanityError: 'Không được phép dùng ngôn từ xúc phạm.',
    linkError: 'Không được phép đăng liên kết hoặc quảng cáo.',
    submitError: 'Không thể gửi. Vui lòng thử lại.',
    unavailable: 'Báo cáo tạm thời không khả dụng.',
    posting: 'Đang gửi...'
  },
  zh: {
    ...reportEn,
    title: '社区报告',
    subtitle: '发布所有人可见的问题。',
    namePlaceholder: '您的名字（可选）',
    messagePlaceholder: '描述问题...',
    submitReport: '发布报告',
    submitReply: '回复',
    reply: '回复',
    replies: '条回复',
    anonymous: '匿名',
    empty: '暂无报告。',
    loading: '加载中...',
    refresh: '刷新',
    profanityError: '不允许侮辱或攻击性语言。',
    linkError: '不允许发布链接或广告。',
    submitError: '提交失败，请重试。',
    unavailable: '报告功能暂时不可用。',
    posting: '提交中...'
  }
}

export function getReportLabels(locale: string): ReportLabels {
  return reportLabels[(locale as LocaleKey)] ?? reportLabels.root
}

type PatchNotesLabels = {
  title: string
  ariaLabel: string
  notes: string[]
}

const patchNotesEn: PatchNotesLabels = {
  title: 'Patch Notes',
  ariaLabel: 'Patch notes',
  notes: [
    'Fixed the VAL 5 ban that was happening constantly, even when you weren\'t doing anything.',
    'Fixed temporary bans that you were receiving for no reason.',
    'Fixed the VAL-102 error that occurred before a ban.',
    'Improved and adapted the Vanguard dump.'
  ]
}

export const patchNotesLabels: Record<LocaleKey, PatchNotesLabels> = {
  root: patchNotesEn,
  fr: {
    title: 'Notes de patch',
    ariaLabel: 'Notes de patch',
    notes: [
      'Correction du ban VAL 5 qui survenait en permanence, même sans rien faire.',
      'Correction des bans temporaires reçus sans raison.',
      'Correction de l\'erreur VAL-102 qui survenait avant un ban.',
      'Amélioration et adaptation du dump Vanguard.'
    ]
  },
  es: {
    title: 'Notas del parche',
    ariaLabel: 'Notas del parche',
    notes: [
      'Corregido el ban VAL 5 que ocurría constantemente, incluso sin hacer nada.',
      'Corregidos los baneos temporales recibidos sin motivo.',
      'Corregido el error VAL-102 que ocurría antes de un ban.',
      'Mejora y adaptación del dump de Vanguard.'
    ]
  },
  pt: {
    title: 'Notas de patch',
    ariaLabel: 'Notas de patch',
    notes: [
      'Corrigido o ban VAL 5 que ocorria constantemente, mesmo sem fazer nada.',
      'Corrigidos os bans temporários recebidos sem motivo.',
      'Corrigido o erro VAL-102 que ocorria antes de um ban.',
      'Melhoria e adaptação do dump do Vanguard.'
    ]
  },
  it: {
    title: 'Note di patch',
    ariaLabel: 'Note di patch',
    notes: [
      'Risolto il ban VAL 5 che avveniva costantemente, anche senza fare nulla.',
      'Risolti i ban temporanei ricevuti senza motivo.',
      'Risolto l\'errore VAL-102 che si verificava prima di un ban.',
      'Miglioramento e adattamento del dump Vanguard.'
    ]
  },
  vi: {
    title: 'Ghi chú bản vá',
    ariaLabel: 'Ghi chú bản vá',
    notes: [
      'Sửa ban VAL 5 xảy ra liên tục, kể cả khi bạn không làm gì.',
      'Sửa các ban tạm thời nhận được không có lý do.',
      'Sửa lỗi VAL-102 xảy ra trước khi bị ban.',
      'Cải thiện và điều chỉnh dump Vanguard.'
    ]
  },
  zh: {
    title: '更新说明',
    ariaLabel: '更新说明',
    notes: [
      '修复了即使什么都不做也会不断出现的 VAL 5 封禁。',
      '修复了无理由收到的临时封禁。',
      '修复了封禁前出现的 VAL-102 错误。',
      '改进并适配 Vanguard dump。'
    ]
  }
}

export function getPatchNotesLabels(locale: string): PatchNotesLabels {
  return patchNotesLabels[(locale as LocaleKey)] ?? patchNotesLabels.root
}
