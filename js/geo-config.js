/**
 * 同城 GEO / 本地搜索运营配置（Marketing 可改此文件，无需动业务逻辑）
 * 坐标请在高德/百度地图选点后台复制；留空则仅显示文字地址与外链入驻指引
 */
export const LOCAL_GEO = {
  brandName: '头大大谈经营',
  legalName: '头大大管理咨询（个人）',
  /** 主战场城市（同城 SEO 核心词） */
  primaryCity: '成都',
  /** 辐射城市（页面标签 & 文案） */
  serviceCities: ['成都', '重庆', '绵阳', '德阳', '乐山', '宜宾'],
  /** 行业同城词 */
  industries: ['餐饮', '酒店', '夜场', '服务业', '门店经营'],
  regionLabel: '西南',
  address: '四川省成都市（咨询预约后告知详细见面/线上方式）',
  /** 高德 GCJ-02：lng,lat — 入驻地图前请替换为真实坐标 */
  coordinates: { lng: 104.066541, lat: 30.572269 },
  phone: '',
  wechatNote: '微信咨询请通过官网问卷留下手机号，24 小时内联系',
  businessHours: '预约制 · 咨询时段 9:00–21:00',
  priceRange: '$$',
  /** 地图平台认领状态（运营打勾用） */
  mapListings: [
    { id: 'amap', name: '高德地图', status: 'pending', claimUrl: 'https://lbs.amap.com/console/show/poiinfo' },
    { id: 'baidu', name: '百度地图', status: 'pending', claimUrl: 'https://map.baidu.com/' },
    { id: 'tencent', name: '腾讯地图', status: 'pending', claimUrl: 'https://map.qq.com/' },
    { id: 'dianping', name: '大众点评（商户）', status: 'pending', claimUrl: 'https://www.dianping.com/' }
  ]
}

/** 按页面生成 Title / Description / Keywords */
export function geoMetaForPage(page, sub) {
  const c = LOCAL_GEO.primaryCity
  const cities = LOCAL_GEO.serviceCities.slice(0, 3).join('、')
  const base = {
    home: {
      title: `${LOCAL_GEO.brandName} · ${c}餐饮门店经营咨询 | ${cities}同城`,
      description: `${c}、${cities}餐饮·酒店·服务业老板经营诊断、运营优化、30秒问卷预约，24小时内联系。个人OPC · 头大大谈经营。`,
      keywords: `${c}餐饮咨询,${c}门店诊断,${c}经营顾问,餐饮运营优化,同城经营咨询,头大大`
    },
    consult: {
      title: `预约咨询 · ${c}门店经营问卷 | ${LOCAL_GEO.brandName}`,
      description: `${c}及${LOCAL_GEO.regionLabel}地区餐饮老板 1 分钟问卷，5 道经营题 + 基础信息，24 小时内头大大联系您。`,
      keywords: `${c}餐饮咨询预约,门店经营问卷,餐饮诊断预约`
    },
    about: {
      title: `关于头大大 · ${c}个人经营咨询顾问 | ${LOCAL_GEO.brandName}`,
      description: `头大大，${LOCAL_GEO.industries.join('、')}个人管理咨询 OPC，${cities}同城可预约。`,
      keywords: `头大大,${c}管理咨询,个人经营顾问`
    },
    local: {
      title: `同城服务 · ${c}地图找店 | ${LOCAL_GEO.brandName}`,
      description: `${c}同城餐饮经营咨询 · 地图入驻指引 · 线上下单线下对接。`,
      keywords: `${c}地图商户,同城获客,餐饮咨询${c}`
    },
    measure: {
      title: `门店估值测测 · ${LOCAL_GEO.brandName}娱乐测评`,
      description: `${c}餐饮老板娱乐向门店估值小游戏，纯属娱乐，可转发邀请同城老板一起测。`,
      keywords: `门店估值,餐饮测一测,${c}餐饮`
    },
    share: {
      title: `邀请朋友 · ${LOCAL_GEO.brandName}`,
      description: `分享链接或二维码，邀请同城老板来测一测、来咨询。`,
      keywords: `分享,邀请,${c}餐饮`
    },
    admin: {
      title: `线索后台 · ${LOCAL_GEO.brandName}`,
      description: `官网咨询线索管理（不公开索引）`,
      keywords: '',
      robots: 'noindex,nofollow'
    }
  }
  if (page === 'consult' && sub === 'start') {
    return {
      title: `填写问卷 · ${c}经营咨询 | ${LOCAL_GEO.brandName}`,
      description: `5 道经营勾选题，深度了解${c}门店现状，24 小时内联系。`,
      keywords: base.consult.keywords
    }
  }
  return base[page] || base.home
}

export function localMapLinks() {
  const { lng, lat } = LOCAL_GEO.coordinates
  const name = encodeURIComponent(LOCAL_GEO.brandName)
  const addr = encodeURIComponent(LOCAL_GEO.address)
  return {
    amap: `https://uri.amap.com/marker?position=${lng},${lat}&name=${name}&src=toudada&coordinate=gaode&callnative=1`,
    amapNav: `https://uri.amap.com/navigation?to=${lng},${lat},${name}&mode=car&coordinate=gaode&callnative=1`,
    baidu: `https://api.map.baidu.com/marker?location=${lat},${lng}&title=${name}&content=${addr}&output=html`,
    tencent: `https://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${lng};title:${name};addr:${addr}&referer=toudada`
  }
}
