import { LOCAL_GEO, geoMetaForPage } from './geo-config.js'
import { getSiteBase, pageUrl } from './utils.js'

const SCHEMA_ID = 'td-jsonld-local'

export function applyGeoSeo(page, sub) {
  const meta = geoMetaForPage(page, sub)
  document.title = meta.title

  setMeta('name', 'description', meta.description)
  setMeta('name', 'keywords', meta.keywords)
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:locale', 'zh_CN')
  setMeta('name', 'robots', meta.robots || 'index,follow')
  setMeta('name', 'geo.region', 'CN-SC')
  setMeta('name', 'geo.placename', LOCAL_GEO.primaryCity)

  const canonical = pageUrl(page === 'home' ? 'home' : page, sub || '')
  setLink('canonical', canonical)

  injectLocalBusinessSchema(page)
}

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function injectLocalBusinessSchema(page) {
  const base = getSiteBase()
  const { lng, lat } = LOCAL_GEO.coordinates
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${base}#organization`,
        name: LOCAL_GEO.brandName,
        url: base,
        description: geoMetaForPage('home').description,
        areaServed: LOCAL_GEO.serviceCities.map((city) => ({
          '@type': 'City',
          name: city,
          containedInPlace: { '@type': 'Country', name: '中国' }
        }))
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${base}#local-business`,
        name: LOCAL_GEO.brandName,
        description: `${LOCAL_GEO.primaryCity}餐饮·酒店·服务业经营咨询（个人 OPC）`,
        url: pageUrl('local'),
        telephone: LOCAL_GEO.phone || undefined,
        priceRange: LOCAL_GEO.priceRange,
        address: {
          '@type': 'PostalAddress',
          addressLocality: LOCAL_GEO.primaryCity,
          addressRegion: '四川省',
          addressCountry: 'CN',
          streetAddress: LOCAL_GEO.address
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: lat,
          longitude: lng
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '21:00'
        },
        areaServed: LOCAL_GEO.serviceCities,
        knowsAbout: LOCAL_GEO.industries
      },
      {
        '@type': 'WebSite',
        '@id': `${base}#website`,
        name: LOCAL_GEO.brandName,
        url: base,
        publisher: { '@id': `${base}#organization` },
        inLanguage: 'zh-CN'
      }
    ]
  }

  if (page === 'consult') {
    graph['@graph'].push({
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `${LOCAL_GEO.primaryCity}餐饮老板如何预约咨询？`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: '在官网填写 30 秒问卷（5 道经营题 + 基础信息），24 小时内头大大通过电话或微信联系您。'
          }
        },
        {
          '@type': 'Question',
          name: '服务哪些城市？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `主要服务${LOCAL_GEO.serviceCities.join('、')}等${LOCAL_GEO.regionLabel}城市，远程诊断 + 预约见面。`
          }
        }
      ]
    })
  }

  let node = document.getElementById(SCHEMA_ID)
  if (!node) {
    node = document.createElement('script')
    node.id = SCHEMA_ID
    node.type = 'application/ld+json'
    document.head.appendChild(node)
  }
  node.textContent = JSON.stringify(graph)
}
