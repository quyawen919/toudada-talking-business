const BRAND = {
  slogan: '一个让你提升经营思维的男人',
  name: '头大大管理咨询',
  tagline: '新店指导 × 老店诊断',
  scope: '餐饮 · 酒店 · 夜场 · 服务业',
  intro: '个人餐饮与服务业管理咨询 OPC。曾与管理大师余世维，餐饮前辈冯耀龙等深度交流，把一线经营逻辑转化为老板听得懂的诊断与方案。',
  /** 擅长方向（about · 行业资历） */
  expertiseSummary: '经营诊断 · 运营优化 · 管理改进 · 业绩提升 · 薪酬改革'
}

/** 首页 · 士气基地向社群展示 */
const HOME_COMMUNITY = {
  shortName: '头大大',
  subtitle: '经营思维圈子',
  communitySlogan: '提升经营思维，开创美好未来',
  bannerBadge: '限时 · 30秒问卷',
  ctaText: '立即开聊',
  memberCount: '+128 位老板',
  searchPlaceholder: '搜话题：定价 / 选址 / 点评…'
}

/** 头大大 · 独到判断（创始人投稿，置顶于热门经营话题） */
const FOUNDER_TOPICS = [
  {
    id: 'founder-model',
    label: '别只降价',
    title: '低价不再奏效，老板真正要算的是经营模型',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'operate',
    intro: '低价只能带来短期热闹，带不来长期利润；能在合理价格里让顾客觉得值，才是门店真正的本事。',
    paragraphs: [
      '很多餐饮老板一看到生意下滑，下意识就想降价、做活动、上套餐，以为价格低一点，顾客就会回来。但头大大看到的不是价格问题，而是模型问题。低价只能带来短期热闹，带不来长期利润。',
      '一个店如果产品结构没算清、毛利空间没算清、人工效率没算清、复购路径没算清，越降价，亏得越快。很多老板不是输给同行，而是输给自己没有算账。表面上是顾客嫌贵，背后可能是产品没有记忆点；表面上是客流不够，背后可能是门店没有复购理由；表面上是活动没效果，背后可能是老板把营销当成救命稻草。',
      '头大大认为，今天的餐饮已经不能只靠经验和勤快，真正能活下来的店，一定要从「我觉得能卖」变成「数据证明能赚」。低价不是经营能力，能在合理价格里让顾客觉得值，才是门店真正的本事。'
    ]
  },
  {
    id: 'founder-online',
    label: '线上可信度',
    title: '顾客进店前，已经在线上把你判断完了',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'service',
    intro: '顾客不是进店后才认识你，而是在手机上就已经决定要不要给你机会。',
    paragraphs: [
      '以前老板选铺子，特别看重人流量，觉得门口人多，生意就不会差。但头大大看到，现在顾客的到店决策早就变了。很多顾客还没走到你门口，已经在线上看过图片、评价、价格、团购、差评、距离、榜单，甚至已经把你和旁边几家店比较完了。',
      '很多老板把钱花在装修、设备、招牌上，却忽略了线上呈现这件事。门店实际不错，但照片看不出食欲；产品有特色，但菜单表达不清；服务有用心，但评价没有沉淀；价格不算贵，但顾客看不到价值。',
      '头大大认为，今天开店不能只建一个物理门店，还要建立一个线上可信度。人流量只是看得见的流量，顾客心里的确定感，才是真正影响进店的关键。'
    ]
  },
  {
    id: 'founder-trend',
    label: '别追风口',
    title: '风口品类爆火，最怕老板把热闹当成生意',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'mindset',
    intro: '风口从来不等于利润，热闹也不等于长久。',
    paragraphs: [
      '一个品类突然火了，很多人就开始心动：别人排队，我也想做；别人开店，我也想跟；别人加盟，我也想试。但头大大看到的不是风口，而是风险。任何一个爆火品类，到了大量人涌入以后，很快就会进入同质化、价格战、选址争夺和供应链比拼。',
      '很多新手老板只看到了别人门口排队，却没看到背后的产品打磨、供应链稳定、出品标准、团队管理和区域深耕。真正值得研究的不是这个品类火不火，而是它为什么能复购，为什么能跨区域，为什么能把口味稳定下来，为什么能在同行模仿后还活得下去。',
      '头大大认为，很多老板开店失败，就是把别人的结果当成自己的起点。看到别人跑出来，不代表自己进去就能接住。开店前不先拆底盘，只追风口，很容易把积蓄投进一场短暂的热闹里。'
    ]
  },
  {
    id: 'founder-scene',
    label: '热点做场景',
    title: '节日和热点不是拿来蹭的，是拿来设计消费场景的',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'open',
    intro: '热点能不能变成生意，关键看门店有没有把顾客当时的状态想清楚。',
    paragraphs: [
      '世界杯、端午、龙舟、城市赛事、地方民俗，这些热点确实能带来流量，但头大大看到的不是「做活动」，而是「做场景」。很多门店一遇到节日就打折、发券、换海报，以为这样就叫借势。',
      '其实顾客愿意消费的，不只是便宜，而是氛围、情绪、社交和体验。看球的人需要夜宵、啤酒、小食、投屏、多人套餐；端午的人需要家庭聚餐、地方特色、伴手礼和仪式感；龙舟赛事周边的人流，需要的是快取、便捷、特色和拍照传播。',
      '头大大认为，顾客是一个人来，还是一群人来？是边走边吃，还是坐下来聚？是为了填饱肚子，还是为了参与氛围？如果这些没想清楚，热点来了也只是路过。真正会经营的老板，不是追热点，而是把热点转化成产品组合、门店动线、服务节奏和复购记忆。'
    ]
  },
  {
    id: 'founder-data',
    label: '小店看数据',
    title: 'AI和数据不是大品牌专属，小店更要学会看损耗',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'operate',
    intro: '数字不是冰冷的东西，数字是老板看清门店真相的眼睛。',
    paragraphs: [
      '很多小店老板一听到 AI、数据、系统，就觉得那是大品牌的事情，跟自己没关系。但头大大看到，恰恰是小店更需要用数据把账算清楚。因为小店抗风险能力更弱，一点点损耗、一点点排班浪费、一点点库存积压，都会直接吃掉利润。',
      '很多店看起来有营业额，月底却不赚钱，问题往往不在生意表面，而在看不见的细节里。今天多备了多少菜？哪些菜卖得多但毛利低？哪个时段员工排多了？哪些原料损耗高？外卖单看起来多，扣完平台费用还剩多少？这些都不能只靠感觉。',
      '头大大认为，小店不一定马上上复杂系统，但至少要建立基本的经营记录。不会看数据的老板，很容易被热闹骗；会看数据的老板，才知道哪里该加、哪里该减、哪里该停。'
    ]
  },
  {
    id: 'founder-diff',
    label: '开店先差异化',
    title: '全国门店那么多，开店前要问清楚顾客为什么选你',
    submitter: '头大大',
    isFounder: true,
    columnKey: 'mindset',
    intro: '开店前真正要想清楚的，不是「这个行业有没有机会」，而是「这个机会是不是属于我」。',
    paragraphs: [
      '餐饮市场很大，但门店也很多。很多人准备开店时，只看到行业规模大、消费频次高、别人也在做，却没有认真想过一个问题：顾客为什么要选你？头大大看到，很多新手开店失败，不是因为不努力，而是从起步就没有差异化判断。',
      '产品和别人差不多，装修和别人差不多，价格和别人差不多，服务也没有明显记忆点，最后只能靠位置和运气。可在竞争越来越密的环境里，靠运气开店越来越难。你的客群是谁？他们为什么会来？他们为什么会再来？你的产品有没有一句话能说清楚？你的价格有没有利润？你的老板本人能不能下场经营？',
      '头大大认为，如果这些问题没有答案，店开出来以后，就会被市场逼着交学费。餐饮不是不能做，而是不能糊里糊涂地做。'
    ]
  }
]

/** 热门经营话题 · 老板投稿 + 勾选共鸣（与五栏目 IP 互补，点击进引导而非直接弹 IP） */
const COMMUNITY_TOPICS = [
  {
    id: 'topic-site',
    label: '选址踩坑',
    voteCount: 86,
    submitter: '餐饮老板·长沙',
    intro: '同一条步行街，为什么有的店赚钱、有的店一直亏？先把人群和定位想清楚，再谈租金。',
    columnKey: 'site',
    checkOptions: [
      { id: 's1', text: '人流大但几乎不进店', painKey: '选址 / 定位不对' },
      { id: 's2', text: '租金占比过高心里没底', painKey: '定价 / 毛利 / 成本控不住' },
      { id: 's3', text: '周边竞品太多，差异化说不清', painKey: '选址 / 定位不对' },
      { id: 's4', text: '签租前没做 3～5 个点位比选', painKey: '选址 / 定位不对' }
    ]
  },
  {
    id: 'topic-margin',
    label: '保本算不清',
    voteCount: 124,
    submitter: '小吃店主·成都',
    intro: '营业额看着还行，月底一算账才发现白忙。你会算保本销量和真实毛利吗？',
    columnKey: 'operate',
    checkOptions: [
      { id: 'm1', text: '不知道每天卖多少才保本', painKey: '定价 / 毛利 / 成本控不住' },
      { id: 'm2', text: '菜品定价跟着同行走', painKey: '定价 / 毛利 / 成本控不住' },
      { id: 'm3', text: '人工、房租占比心里没数', painKey: '定价 / 毛利 / 成本控不住' },
      { id: 'm4', text: '促销一停业绩就掉', painKey: '营销 / 引流 / 转化' }
    ]
  },
  {
    id: 'topic-open',
    label: '开业冷场',
    voteCount: 63,
    submitter: '筹备中·重庆',
    intro: '开业前很热闹，开业后客人不回头。节奏和复购设计比当天火爆更重要。',
    columnKey: 'open',
    checkOptions: [
      { id: 'o1', text: '开业活动做完就没人了', painKey: '筹备 / 开业节奏' },
      { id: 'o2', text: '外卖团购还没理顺就开业', painKey: '筹备 / 开业节奏' },
      { id: 'o3', text: '制度、薪酬、表格还没到位', painKey: '人员 / 薪酬 / 管理混乱' },
      { id: 'o4', text: '储值、复购机制没设计', painKey: '营销 / 引流 / 转化' }
    ]
  },
  {
    id: 'topic-review',
    label: '点评上不去',
    voteCount: 97,
    submitter: '酒店餐饮·杭州',
    intro: '分数卡在 3.8 左右，买流量又怕违规。先改服务动作，再谈曝光。',
    columnKey: 'service',
    checkOptions: [
      { id: 'r1', text: '差评多，不知道改哪几个动作', painKey: '大众点评 / 线上运营' },
      { id: 'r2', text: '想合规提分，不想碰刷单', painKey: '大众点评 / 线上运营' },
      { id: 'r3', text: '前厅后厨服务标准不一致', painKey: '人员 / 薪酬 / 管理混乱' },
      { id: 'r4', text: '线上运营投入产出算不清', painKey: '营销 / 引流 / 转化' }
    ]
  },
  {
    id: 'topic-pay',
    label: '薪酬改不动',
    voteCount: 71,
    submitter: '多店老板·广州',
    intro: '店长拿固定工资，店里赚不赚钱和他关系不大。机制不改，人效很难上去。',
    columnKey: 'operate',
    checkOptions: [
      { id: 'p1', text: '店长薪酬和利润没挂钩', painKey: '人员 / 薪酬 / 管理混乱' },
      { id: 'p2', text: '员工流动大，培训白做', painKey: '人员 / 薪酬 / 管理混乱' },
      { id: 'p3', text: '表格化管理推不下去', painKey: '人员 / 薪酬 / 管理混乱' },
      { id: 'p4', text: '想复制多店但标准落不了地', painKey: '多店复制 / 标准化' }
    ]
  }
]

const TOPIC_CATEGORY_OPTIONS = [
  { key: 'mindset', label: '思维' },
  { key: 'site', label: '选址' },
  { key: 'open', label: '开业' },
  { key: 'operate', label: '经营' },
  { key: 'service', label: '服务' }
]

const TOPIC_SUBMIT_HINTS = [
  '用一句话说清你的真实困境',
  '例如：商场店人流大但不转化',
  '例如：开业后第二周就开始下滑',
  '例如：点评分卡在 4.0 不知道怎么提'
]

/** @deprecated 使用 COMMUNITY_TOPICS */
const HOT_TOPICS = COMMUNITY_TOPICS.map(({ id, label }) => ({ id, label }))

const COMMUNITY_FEED = [
  {
    id: 'feed1',
    user: '餐饮老板·成都',
    tag: 'L1诊断',
    text: '终于搞懂保本销量怎么算了'
  },
  {
    id: 'feed2',
    user: '酒店合伙人·重庆',
    tag: '筹备中',
    text: 'A3 选品模块很有帮助'
  }
]

const IP_GRID_META = [
  { key: 'mindset', color: '#E85D4C' },
  { key: 'site', color: '#F5A623' },
  { key: 'open', color: '#3DAA8C' },
  { key: 'operate', color: '#1A3668' },
  { key: 'service', color: '#8B5CF6' }
]

const STATS = [
  { id: 'experience', value: '20年', label: '行业经验' },
  { id: 'industries', value: '18', label: '业态覆盖' },
  { id: 'products', value: 'L1–L9', label: '咨询梯度' }
]

const STAT_DETAILS = {
  experience: {
    title: '20年行业经验',
    subtitle: '从一线门店到管理咨询',
    intro:
      '头大大在餐饮、酒店、夜场及广义服务业深耕二十年，经历过筹备、开业、爬坡、多店复制与经营危机诊断的全周期。咨询不是纸上谈兵，而是把一线踩过的坑、算过的账，翻译成老板听得懂、店里用得上的方案。',
    highlights: [
      { title: '一线操盘', desc: '门店筹备、开业、日常经营与团队管理，懂店长和老板各自在愁什么。' },
      { title: '多业态沉淀', desc: '正餐、小吃、酒店餐饮、夜场、茶馆等场景都做过深度服务，不是只会一种模型。' },
      { title: '内容 + 咨询', desc: '「头大大谈经营」IP 持续输出避坑与算账逻辑，咨询交付与内容同频，不脱节。' },
      { title: '结果导向', desc: '按诊断、模块、全案、陪跑分层服务，按里程碑交付成果，非按小时闲聊。' }
    ],
    footer: '以上为个人从业与咨询实践概括，具体项目范围以诊断沟通与合同约定为准。'
  },
  industries: {
    title: '18个业态覆盖',
    subtitle: '餐饮 · 酒店 · 夜场 · 服务业',
    intro:
      '不同业态毛利结构、人效模型、引流方式完全不同。头大大覆盖以下 18 类场景，能按业态给诊断口径，而不是套一套万能模板。',
    footer: '若您的业态未在列表中，可在咨询问卷备注说明，先做一次 L1 经营诊断再定模块。'
  },
  products: {
    title: 'L1–L9 咨询梯度',
    subtitle: '从轻诊断到战略陪跑',
    intro:
      '梯度不是「越贵越好」，而是按您当前阶段选配：先 L1 看清问题，再按需升 L2–L6 模块或全案，长期经营可上 L7–L9 顾问与体系化服务。',
    footer: 'L1 为 9.9 元/次（价值 500 元）经营诊断；L2–L9 仅展示服务说明，正式报价在 L1 沟通后书面给出，不承诺保证盈利。'
  }
}

const IP_COLUMNS = [
  {
    key: 'mindset',
    name: '头大大谈思维',
    desc: '经营思维，先想再做',
    points: [
      '开店前先算账，会算账比会炒菜更重要',
      '账上有钱不等于赚钱，别用感觉经营',
      '员工不操心，多半是机制没让操心有结果',
      '不承诺包赚，只交付能落地、能验收的方案',
      '垂直深耕一种业态，比啥都接的万能顾问更值钱',
      '每个动作都要有数字，热闹不等于有效'
    ]
  },
  {
    key: 'site',
    name: '头大大谈选址',
    desc: '位置定位，先看人群',
    points: [
      '人多不等于会进店，先看人流愿不愿为你的产品停下来',
      '选址先看消费场景，再看客流量',
      '先定一句话定位，再选铺子，别倒过来',
      '同一商圈至少比选 3～5 个点位，别凭感觉签租',
      '商场店看出店率，街铺看时段人流，夜场看集中消费时段',
      '选址失误，往往是一整年房租的沉没成本'
    ]
  },
  {
    key: 'open',
    name: '头大大谈开业',
    desc: '筹备节奏，开业不慌',
    points: [
      '开业不是终点，是复购的开始',
      '开业活动不只求热闹，要设计第二次来的理由',
      '先打通外卖团购再开业，别等平台慢慢审',
      '开业前制度、薪酬、表格先到位，再开门迎客',
      '7/15/30 天分阶段做活动，别三天把力气用完',
      '储值和下次券要在第一次消费时就埋下',
      '开业后 4～8 周陪跑，比开业当天更重要'
    ]
  },
  {
    key: 'operate',
    name: '头大大谈经营',
    desc: '定价毛利，日常操盘',
    points: [
      '定价先看自己的成本，别看同行卖多少',
      '卖得越多不等于赚越多，先算保本销量',
      '毛利、人工、房租占比要每周看得见',
      '点评先改三个服务动作，别急着买流量',
      '店长薪酬要连利润，固定工资养不出经营意识',
      '表格化管理不是填表，是让问题当天暴露',
      '活动没效果，先查转化链路，再加大投放'
    ]
  },
  {
    key: 'service',
    name: '头大大谈服务',
    desc: '客户体验，留住回头客',
    points: [
      '服务标准写清楚，客人体验才稳定',
      '一条差评背后往往是三个服务动作没做到',
      '回访比刷单实在，合规提分靠流程不是人头',
      '前厅后厨 SOP 一致，客人感受才不会断层',
      '留住回头客，比拉新客便宜得多',
      '服务不是态度好就行，要可检查、可复盘',
      '客户体验从进门第一秒开始，不是上菜那一刻'
    ]
  }
]

const PORTRAITS = [
  {
    id: 'p1',
    image: '/images/portraits/portrait-p1.jpg',
    caption: '经营咨询 · 桌前诊断'
  },
  {
    id: 'p2',
    image: '/images/portraits/portrait-p2.jpg',
    caption: '专业形象 · 商务正装'
  },
  {
    id: 'p3',
    image: '/images/portraits/portrait-p3.jpg',
    caption: '演说分享 · 行业交流'
  },
  {
    id: 'p4',
    image: '/images/portraits/portrait-p4.jpg',
    caption: '管理经验 · 分享授课'
  },
  {
    id: 'p5',
    image: '/images/portraits/portrait-p5.jpg',
    caption: '专业形象 · 领结正装'
  }
]

const ENDORSEMENT_GROUPS = [
  {
    id: 'yu',
    guest: '余世维',
    tag: '管理大师',
    title: '管理大师 · 深度交流',
    desc: '粉丝见面会 · 五星酒廊 · 坐而论道',
    cover: '/images/endorsements/yu-fan-meeting.jpg',
    photos: [
      {
        image: '/images/endorsements/yu-fan-meeting.jpg',
        title: '管理大师 · 粉丝见面会交流',
        desc: '新形势下的企业发展机遇与经营策略 · 坐而论道',
        tag: '管理咨询'
      },
      {
        image: '/images/endorsements/yu-hotel-lounge.jpg',
        title: '五星级酒店 · 深度交流',
        desc: '酒店场景下的经营思维与管理逻辑探讨',
        tag: '五星酒店'
      }
    ]
  },
  {
    id: 'feng',
    guest: '冯耀龙',
    tag: '餐饮实战派',
    title: '餐饮行业交流晚宴',
    desc: '晚宴交流 · 赠书留念',
    cover: '/images/endorsements/feng-yaolong-1.jpg',
    photos: [
      {
        image: '/images/endorsements/feng-yaolong-1.jpg',
        title: '餐饮行业交流晚宴',
        desc: '与餐饮业前辈席间探讨门店经营',
        tag: '行业晚宴'
      },
      {
        image: '/images/endorsements/feng-yaolong-2.jpg',
        title: '共进晚宴 · 赠书留念',
        desc: '晚宴席间交流，冯老师亲笔签名赠书',
        tag: '赠书交流'
      }
    ]
  }
]

const HERO_MAIN = {
  id: 'h1',
  template: 'image',
  image: '/images/hero/hero-brand-main.jpg',
  fallback: '/images/hero/hero-option-c.jpg',
  brandMark: 'TOU DA DA',
  title: '头大大管理咨询',
  subtitle: '一个让你提升经营思维的男人',
  desc: '新店指导 × 老店诊断 · NEW BUSINESS LINK'
}

const HERO_BANNERS = [
  {
    id: 'h2',
    image: '/images/portraits/portrait-main.jpg',
    fallback: '/images/hero/hero-work.png',
    title: '头大大管理咨询',
    subtitle: '一个让你提升经营思维的男人',
    desc: '餐饮 · 酒店 · 夜场 · 服务业'
  },
  {
    id: 'h3',
    image: '/images/endorsements/yu-hotel-lounge-hero.jpg',
    fallback: '/images/hero/hero-work.png',
    title: '与管理大师坐而论道',
    subtitle: '五星级酒店 · 深度交流',
    desc: '把管理思维落到门店经营诊断'
  }
]

const SERVICE_CASES = [
  {
    id: 'case1',
    title: '锦听酒店 · 经济舒适型',
    industry: '经济舒适型酒店',
    service: 'L8 多店体系化',
    scale: '20 家直营 · 80 家代运营',
    city: '成都 · 熊猫基地昭觉寺南路店',
    problem: '财务管控、部门内耗、管理协同、运营标准、薪酬体系',
    progress: '已交付 · 项目已结案',
    image: '/images/cases/case-jinting-panda.jpg'
  },
  {
    id: 'case2',
    title: '城南小馆',
    industry: '传统餐饮',
    service: '模块方案 · 营销与点评',
    problem: '引流转化、线上运营偏弱',
    progress: '已联系 · 方案沟通中',
    image: '/images/cases/case-restaurant.jpg'
  },
  {
    id: 'case3',
    title: '筹备中 · 粉面店',
    industry: '粉面小吃',
    service: '筹备咨询 · 先聊后深诊',
    problem: '选址、开业节奏不清晰',
    progress: '线索 · 问卷已提交',
    image: '/images/cases/case-prep.jpg'
  }
]

const GUEST_PROFILES = {
  feng: {
    name: '冯耀龙',
    tag: '餐饮实战派',
    lines: [
      '冯耀龙是餐饮实战派代表：曾任西贝餐饮首任 CEO，三十年餐企一线操盘与品牌策划，业界称「餐企良医」，著《餐饮管理之魂》等实务书。',
      '我曾与他多次晚宴交流、见面沟通，并授赠签名书给我。前辈把经营逻辑传授给我，并转化为您店里能落地的诊断与方法。'
    ]
  },
  yu: {
    name: '余世维',
    tag: '管理大师',
    lines: [
      '余世维被誉为「华人管理教育第一人」，曾任日本航空副总裁等职，深耕战略、执行力与组织管理，代表著作包括《有效沟通》《赢在执行》。',
      '我的定位是「一个让你提升经营思维的男人」——余老师教的正是经营背后的管理框架：定方向、带团队、抓执行，而不只盯着换菜单、做活动。',
      '见面会、五星酒廊与他的对谈，对我不是贴标签，而是把管理学语言翻译成餐饮·酒店·夜场老板听得懂的 L1 诊断与 L7–L9 陪跑。'
    ]
  }
}

const CREDENTIALS = [
  {
    year: '深耕服务业',
    title: '娱乐服务业 · 三十省七十城',
    desc: '二十年一线，足迹遍及三十余省、七十余城；覆盖餐饮、酒店、夜场及广义服务业，懂店里真实经营。'
  },
  {
    year: '内容 IP',
    title: '头大大谈经营',
    desc: '抖音 / 视频号主阵地，下设思维、选址、开业、经营、服务五个栏目；用真实经营逻辑帮老板少踩坑。'
  },
  {
    year: '咨询 OPC',
    title: '1 个创始人 + N 个 AI 协作',
    desc: '创始人负责判断、现场与对客户负责；方案经 5 段式交付与创始人审定。'
  },
  {
    year: '擅长方向',
    title: '经营诊断 · 运营优化 · 管理改进 · 业绩提升 · 薪酬改革',
    desc: '按里程碑交付方案与陪跑，把诊断结论落到店里能执行的动作，非按小时闲聊。'
  }
]

const SERVICE_SCOPES = [
  { name: '传统正餐', desc: '地方菜、宴席、家常菜等堂食模型' },
  { name: '粉面小吃', desc: '粉面、快餐、档口、高周转小店' },
  { name: '火锅串串', desc: '自助、单锅、串串、旋转小火锅' },
  { name: '烧烤烤肉', desc: '街边烧烤、韩式烤肉、露营烧烤' },
  { name: '艺术 / 主题餐', desc: '场景化、高设计感的主题餐饮' },
  { name: '音乐餐吧', desc: 'Live、演艺、餐+酒复合业态' },
  { name: '咖啡茶饮', desc: '咖啡馆、新式茶饮、轻食' },
  { name: '烘焙甜品', desc: '面包蛋糕、甜品站、伴手礼' },
  { name: '酒店餐饮', desc: '星级/精品酒店中餐、西餐、宴会' },
  { name: '酒店住宿', desc: '客房+餐饮联动、酒管经营' },
  { name: 'KTV', desc: '量贩、商务 K、派对房经营' },
  { name: '酒吧 / 清吧', desc: '鸡尾酒、精酿、夜店周边' },
  { name: '茶馆 / 新中式', desc: '茶空间、新中式酒馆、慢消费' },
  { name: '夜宵档口', desc: '夜市、宵夜、外卖主攻' },
  { name: '景区餐饮', desc: '景区、街区、综合体配套' },
  { name: '团餐 / 食堂', desc: '企业团餐、学校、园区食堂' },
  { name: '连锁加盟', desc: '多店复制、加盟体系、标准化' },
  { name: '其他服务业', desc: '美容、娱乐、休闲等线下门店' }
]

/** L1 体验价 · 小程序与报价单共用口径 */
const L1_PROMOTION = {
  active: true,
  promoPrice: '9.9',
  originalPrice: '500',
  unit: '元/次',
  valueLabel: '价值 500 元',
  priceLabel: '9.9 元/次（价值 500 元）'
}

const PRODUCT_LEVELS = [
  {
    level: 'L1',
    name: '经营诊断',
    note: '按次 · 入门',
    priceRange: '9.9 元/次（价值 500 元）',
    priceFrom: '9.9 元/次',
    originalPrice: '500 元/次',
    billing: '按次',
    cycle: '3–7 个工作日',
    opcAlign: 'OPC · L1 经营诊断 / 神秘客',
    desc: '5 题问卷 + 基础沟通，输出问题清单与优先级建议，帮您决定下一步该做哪个模块。',
    deliverables: '现状摘要 · 问题清单 · 优先级建议 · 升单路径说明'
  },
  {
    level: 'L2',
    name: '筹备模块',
    note: '按项 · 单点',
    priceRange: '8,800 – 28,800 元/项',
    priceFrom: '8,800 元/项起',
    billing: '按项（A1–A12 任选）',
    cycle: '1–3 周/项',
    opcAlign: 'OPC · L2 筹备模块',
    desc: '选址、菜单、证照、动线、开业节奏等筹备期单模块方案与清单。',
    deliverables: '单模块方案 · 执行清单 · 验收标准'
  },
  {
    level: 'L3',
    name: '筹备全案',
    note: '项目制 · 从 0 到 1',
    priceRange: '88,000 – 268,000 元/店',
    priceFrom: '88,000 元/店起',
    billing: '项目制 · 里程碑',
    cycle: '8–16 周',
    opcAlign: 'OPC · L3 筹备全案',
    desc: '新店从选址到开业的一体化筹备方案，含里程碑节点与验收标准。',
    deliverables: 'A1–A12 整合方案 · M1–M7 里程碑 · 开业陪跑'
  },
  {
    level: 'L4',
    name: '经营模块',
    note: '按项 · 单点突破',
    priceRange: '6,800 – 22,800 元/项',
    priceFrom: '6,800 元/项起',
    billing: '按项',
    cycle: '1–3 周/项',
    opcAlign: 'OPC · B1 经营诊断模块 / 单点优化',
    desc: '定价毛利、人效薪酬、成本管控、排班 SOP 等经营期单模块优化。',
    deliverables: '单模块方案 · 表格工具包 · 落地清单'
  },
  {
    level: 'L5',
    name: '经营优化方案',
    note: '组合 · 短期',
    priceRange: '28,800 – 68,000 元/案',
    priceFrom: '28,800 元/案起',
    billing: '组合项目制',
    cycle: '8–12 周',
    opcAlign: 'OPC · 多模块组合（如 A4+A7+A8）',
    desc: '多模块组合（如定价+人效+成本），8–12 周落地节奏与复盘表。',
    deliverables: '组合方案 · 周节奏表 · 30/60/90 复盘模板'
  },
  {
    level: 'L6',
    name: '季度营销方案',
    note: '按季 · 节点',
    priceRange: '12,800 – 38,000 元/季',
    priceFrom: '12,800 元/季起',
    billing: '按季',
    cycle: '1 个自然季',
    opcAlign: 'OPC · L4/B2 季度营销',
    desc: '季度营销日历、大众点评/抖音合规运营、活动与转化链路设计。',
    deliverables: '营销日历 · 活动方案 · 合规运营 SOP'
  },
  {
    level: 'L7',
    name: '长期顾问 / 陪跑',
    note: '月费 / 周包',
    priceRange: '9,800 – 28,000 元/月',
    priceFrom: '9,800 元/月起',
    billing: '月费或 4–12 周包',
    cycle: '4–12 周起',
    opcAlign: 'OPC · L7 长期顾问 / 短期陪跑',
    desc: '按月或按周远程+现场陪跑，盯数据、纠偏、陪执行，适合已开业需持续纠偏。',
    deliverables: '周例会 · 数据看板 · 纠偏清单 · 现场陪跑（按约定）'
  },
  {
    level: 'L8',
    name: '多店体系化',
    note: '项目制 · 复制',
    priceRange: '128,000 – 580,000 元/体系',
    priceFrom: '128,000 元起',
    billing: '项目制 · 按里程碑',
    cycle: '3–6 个月',
    opcAlign: 'OPC · 多店复制 / 体系化（L8 扩展档）',
    desc: '标准化手册、店长培养、巡店机制、多店财务模型，支撑第二家店起复制。',
    deliverables: '标准手册 · 巡店机制 · 店长培养 · 多店财务模型'
  },
  {
    level: 'L9',
    name: '战略与品牌陪跑',
    note: '年度 · 顶层设计',
    priceRange: '188,000 – 880,000 元/年',
    priceFrom: '188,000 元/年起',
    billing: '年度顾问制',
    cycle: '12 个月',
    opcAlign: 'OPC · 战略层顾问（L9 扩展档）',
    desc: '品牌定位、扩张节奏、合伙/分润机制、组织与战略节奏，适合多店与品牌期老板。',
    deliverables: '战略节奏图 · 品牌定位 · 合伙机制 · 季度复盘'
  }
]

/** 报价政策 · 小程序与报价单共用口径 */
const PRICING_POLICY = {
  headline: '报价说明 · 以诊断沟通为准',
  l1PromoNote: 'L1 经营诊断：9.9 元/次（价值 500 元），以沟通确认为准。',
  disclaimer:
    'L2–L9 不在小程序展示参考价；夜场、酒店、艺术/音乐餐饮等复杂度另议，多店按规模另议。正式报价在 L1 诊断沟通后给出书面说明，不承诺保证盈利。',
  validDays: 15
}

/** 筹备期单模块 A1–A12 · 与 L2 对照 */
const PREP_MODULES = [
  { code: 'A1', name: '选址', range: '12,800 – 28,800 元' },
  { code: 'A2', name: '装修注意事项', range: '8,800 – 18,800 元' },
  { code: 'A3', name: '选品/供应链/餐具', range: '8,800 – 22,800 元' },
  { code: 'A4', name: '定价', range: '8,800 – 18,800 元' },
  { code: 'A5', name: '定位', range: '12,800 – 28,800 元' },
  { code: 'A6', name: '制度手册', range: '12,800 – 32,800 元' },
  { code: 'A7', name: '薪酬', range: '12,800 – 28,800 元' },
  { code: 'A8', name: '日常表格化', range: '6,800 – 15,800 元' },
  { code: 'A9', name: '管理人员筛选考核', range: '8,800 – 18,800 元' },
  { code: 'A10', name: '前期线上运营', range: '8,800 – 22,800 元' },
  { code: 'A11', name: '外卖团购开通', range: '6,800 – 15,800 元' },
  { code: 'A12', name: '开业活动', range: '12,800 – 32,800 元' }
]

const COMPLIANCE =
  '不承诺保证盈利；不提供刷单买评；正式方案仅发创始人审定版。与名人合影仅为交流学习记录，不代表官方代言或联合背书。'

export {
  BRAND,
  HOME_COMMUNITY,
  HOT_TOPICS,
  COMMUNITY_TOPICS,
  FOUNDER_TOPICS,
  TOPIC_CATEGORY_OPTIONS,
  TOPIC_SUBMIT_HINTS,
  COMMUNITY_FEED,
  IP_GRID_META,
  STATS,
  STAT_DETAILS,
  IP_COLUMNS,
  PORTRAITS,
  ENDORSEMENT_GROUPS,
  HERO_MAIN,
  HERO_BANNERS,
  SERVICE_CASES,
  GUEST_PROFILES,
  CREDENTIALS,
  SERVICE_SCOPES,
  PRODUCT_LEVELS,
  L1_PROMOTION,
  PRICING_POLICY,
  PREP_MODULES,
  COMPLIANCE
}
