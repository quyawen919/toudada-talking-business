const STAGES = {
  LEAD: '线索',
  CONTACTED: '已联系',
  DIAGNOSING: '诊断中',
  DELIVERING: '交付中',
  CLOSED: '已结案'
}

const STAGE_LIST = [
  { key: 'LEAD', label: STAGES.LEAD },
  { key: 'CONTACTED', label: STAGES.CONTACTED },
  { key: 'DIAGNOSING', label: STAGES.DIAGNOSING },
  { key: 'DELIVERING', label: STAGES.DELIVERING },
  { key: 'CLOSED', label: STAGES.CLOSED }
]

const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client'
}

const QUESTIONS = [
  {
    id: 'q1',
    title: '您目前处于哪个阶段？',
    subtitle: '请选择最符合您现状的一项',
    type: 'single',
    field: 'q1_stage',
    options: [
      '准备开店 / 筹备中',
      '已开业，经营正常想优化',
      '已开业，经营困难想诊断',
      '多店经营，想体系化 / 复制'
    ]
  },
  {
    id: 'q2',
    title: '您现在最头疼的是什么？',
    subtitle: '可多选，最多选 3 项',
    type: 'multiple',
    max: 3,
    field: 'q2_painPoints',
    options: [
      '选址 / 定位不对',
      '定价 / 毛利 / 成本控不住',
      '人员 / 薪酬 / 管理混乱',
      '大众点评 / 线上运营',
      '营销 / 引流 / 转化',
      '筹备 / 开业节奏',
      '多店复制 / 标准化',
      '其他（可在备注里补充一句）'
    ]
  },
  {
    id: 'q3',
    title: '您目前有几家门店？',
    subtitle: '请选择一项',
    type: 'single',
    field: 'q3_storeCount',
    options: [
      '还没开店（筹备中）',
      '1 家',
      '2–3 家',
      '4–9 家',
      '10 家及以上'
    ]
  },
  {
    id: 'q4',
    title: '您希望通过咨询优先获得什么？',
    subtitle: '请选择最优先的一项',
    type: 'single',
    field: 'q4_expectation',
    options: [
      '先做一次经营诊断（L1）',
      '某一模块方案（如选址/定价/点评等）',
      '筹备或经营全案',
      '短期陪跑 / 长期顾问',
      '还不确定，想先聊聊'
    ]
  },
  {
    id: 'q5',
    title: '您愿意配合提供哪些信息？',
    subtitle: '可多选',
    type: 'multiple',
    field: 'q5_dataWillingness',
    options: [
      '基础经营数据（营业额/毛利等）',
      '门店照片 / 菜单 / 点评截图',
      '人员与组织架构情况',
      '暂时只能先聊情况，稍后再提供数据',
      '希望先签保密 / 预览版后再深入'
    ]
  }
]

const INDUSTRY_TYPES = [
  '传统餐饮',
  '粉面小吃 / 快餐',
  '酒店餐饮',
  '夜场 / 酒吧 / KTV',
  '茶馆 / 新中式',
  '其他服务业'
]

const INVESTMENT_STATUS = [
  '筹备中（计划投资）',
  '已开业（已投入）'
]

const INVESTMENT_RANGES = [
  '10 万以内',
  '10–30 万',
  '30–80 万',
  '80 万以上',
  '不便透露'
]

const AGE_RANGES = [
  '25 岁以下',
  '25–35 岁',
  '36–45 岁',
  '46–55 岁',
  '55 岁以上',
  '不填写'
]

const GENDERS = [
  '男',
  '女',
  '不填写'
]

const PENDING_CONSULT_KEY = 'toudada_pending_consult'

const DELIVER_STATUS_OPTIONS = ['未交付', '预览版', '正式版', '已交付']

const PRIVACY_POLICY_VERSION = '2026-06-15'

function buildSummary(answers, basicInfo = {}) {
  const painPoints = (answers.q2_painPoints || []).join('、') || '未选'
  const willingness = (answers.q5_dataWillingness || []).join(' + ') || '未选'
  const lines = [
    '【新咨询线索】',
    `阶段：${answers.q1_stage || '未选'}`,
    `核心问题：${painPoints}`,
    `门店数：${answers.q3_storeCount || '未选'}`,
    `期望：${answers.q4_expectation || '未选'}`,
    `配合度：${willingness}`
  ]

  if (basicInfo.industryType) {
    lines.push(`业态：${basicInfo.industryType}`)
  }
  if (basicInfo.investmentStatus && basicInfo.investmentRange) {
    lines.push(`投资：${basicInfo.investmentStatus} · ${basicInfo.investmentRange}`)
  }
  if (basicInfo.city) {
    lines.push(`城市：${basicInfo.city}`)
  }
  if (basicInfo.phone) {
    lines.push(`电话：${basicInfo.phone}`)
  }
  const profile = [basicInfo.age, basicInfo.gender]
    .filter((item) => item && item !== '不填写')
    .join(' · ')
  if (profile) {
    lines.push(`画像：${profile}`)
  }

  return lines.join('\n')
}

export {
  STAGES,
  STAGE_LIST,
  ROLES,
  QUESTIONS,
  INDUSTRY_TYPES,
  INVESTMENT_STATUS,
  INVESTMENT_RANGES,
  AGE_RANGES,
  GENDERS,
  PENDING_CONSULT_KEY,
  DELIVER_STATUS_OPTIONS,
  PRIVACY_POLICY_VERSION,
  buildSummary
}
