/**
 * 头大大 · 测测大厅目录
 * status: live 可测 | soon 即将上线
 */
const GAME_CATALOG = [
  {
    id: 'store',
    title: '门店估值测评',
    subtitle: '九宫格快测 · 纯属娱乐',
    desc: '10 轮选题，估一估你的店值多少。测完可晒朋友圈，朋友也能回首页。',
    emoji: '🏪',
    color: '#3DAA8C',
    status: 'live',
    tags: ['引流爆款', '已上线']
  },
  {
    id: 'mgmt',
    title: '管理能力测评',
    subtitle: '带团队 · 做决策 · 控执行',
    desc: '从排优先级、用人、控成本等维度，娱乐测算你的管理段位。',
    emoji: '👔',
    color: '#1A3668',
    status: 'soon',
    path: '',
    tags: ['组织团队', '即将上线']
  },
  {
    id: 'biz',
    title: '经营能力测评',
    subtitle: '看模型 · 算账 · 抓机会',
    desc: '围绕盈利模型、成本结构、增长节奏，测你的经营者类型与短板。',
    emoji: '📈',
    color: '#E85D4C',
    status: 'soon',
    path: '',
    tags: ['模型诊断', '即将上线']
  },
  {
    id: 'potential',
    title: '个人潜能测评',
    subtitle: '学习力 · 抗压 · 沟通创新',
    desc: '娱乐画像你的潜能组合，头大大给一句成长向判断（非心理测评）。',
    emoji: '✨',
    color: '#8B5CF6',
    status: 'soon',
    path: '',
    tags: ['个人成长', '即将上线']
  }
]

const HUB_META = {
  badge: '纯属娱乐',
  title: '头大大 · 测测',
  slogan: '测一测，晒一晒，把店况与能力算清楚',
  footnote: '均为娱乐向快测，不构成正式评估或投资建议'
}

function getLiveGames() {
  return GAME_CATALOG.filter((g) => g.status === 'live')
}

function getGameById(id) {
  return GAME_CATALOG.find((g) => g.id === id) || null
}

export {
  GAME_CATALOG,
  HUB_META,
  getLiveGames,
  getGameById
}
