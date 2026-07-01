export function img(path) {
  const base = getImgBase()
  if (!path) return `${base}/portraits/portrait-main.jpg`
  if (path.startsWith('/images/')) return base + path.slice('/images'.length)
  return base + path
}

function getImgBase() {
  if (typeof window !== 'undefined' && window.__SITE_IMG_BASE) {
    return window.__SITE_IMG_BASE
  }
  if (typeof window !== 'undefined') {
    const p = window.location.pathname || ''
    return /\/web(\/|$)/.test(p) ? '../images' : 'images'
  }
  return '../images'
}

export function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function formatReplyDeadline(hours) {
  const d = new Date(Date.now() + hours * 3600000)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getMonth() + 1}月${d.getDate()}日 ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function getSiteBase() {
  return window.location.href.split('#')[0].split('?')[0]
}

/** 微信里用 ?p= 比 # 更可靠 */
export function pageUrl(page, sub) {
  const base = getSiteBase()
  const p = page || 'home'
  if (p === 'home' && !sub) return `${base}?p=home`
  if (p === 'measure' && sub === 'store') return `${base}?p=measure&game=store`
  if (sub) return `${base}?p=${encodeURIComponent(p)}&sub=${encodeURIComponent(sub)}`
  return `${base}?p=${encodeURIComponent(p)}`
}

export function goPage(page, sub) {
  const url = pageUrl(page, sub)
  try {
    if (window.history && window.history.pushState) {
      window.history.pushState({ tdPage: page, tdSub: sub || '' }, '', url)
      if (typeof window.__tdRender === 'function') {
        window.__tdRender()
        return
      }
    }
  } catch (e) {
    /* full navigation fallback */
  }
  window.location.href = url
}

export function parsePageQuery() {
  const out = {}
  const search = window.location.search || ''
  if (!search) return out
  if (typeof URLSearchParams !== 'undefined') {
    const params = new URLSearchParams(search)
    params.forEach((v, k) => {
      out[k] = v
    })
    return out
  }
  search.replace(/^\?/, '').split('&').forEach((pair) => {
    if (!pair) return
    const i = pair.indexOf('=')
    const k = decodeURIComponent(i >= 0 ? pair.slice(0, i) : pair)
    const v = decodeURIComponent(i >= 0 ? pair.slice(i + 1) : '')
    out[k] = v
  })
  return out
}

export function getConsultUrl() {
  return pageUrl('consult')
}

export function getHomeShareUrl() {
  return pageUrl('home')
}

export function getGameShareUrl() {
  return pageUrl('measure', 'store')
}

export function getSharePageUrl(type) {
  const t = type || 'home'
  return `${getSiteBase()}?p=share&type=${encodeURIComponent(t)}`
}

export function buildShareCode(result) {
  const n = result && result.mid ? Math.round(result.mid) : 0
  return 'TD' + String((n * 7 + (Date.now() % 10000)) % 10000).padStart(4, '0')
}

export function copyText(text) {
  return new Promise(function (resolve) {
    function fallback() {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;left:-9999px;top:0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      resolve(!!ok)
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          resolve(true)
        }).catch(fallback)
        return
      }
    } catch (_) { /* use fallback */ }
    fallback()
  })
}

export function showToast(msg) {
  let el = document.getElementById('td-toast')
  if (!el) {
    el = document.createElement('div')
    el.id = 'td-toast'
    el.className = 'td-toast'
    document.body.appendChild(el)
  }
  el.textContent = msg
  el.classList.add('visible')
  clearTimeout(el._hideTimer)
  el._hideTimer = setTimeout(function () {
    el.classList.remove('visible')
  }, 2400)
}

export function onId(id, event, fn) {
  const el = document.getElementById(id)
  if (el) el.addEventListener(event, fn)
}

export function onSel(sel, event, fn, root) {
  const el = (root || document).querySelector(sel)
  if (el) el.addEventListener(event, fn)
}

export function closestEl(node, selector) {
  let el = node
  while (el && el.nodeType === 1) {
    if (el.matches && el.matches(selector)) return el
    el = el.parentElement
  }
  return null
}
