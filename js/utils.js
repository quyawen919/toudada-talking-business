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

export function getConsultUrl() {
  const base = window.location.href.split('#')[0].split('?')[0]
  return `${base}?p=consult`
}

export function getHomeShareUrl() {
  const base = window.location.href.split('#')[0].split('?')[0]
  return `${base}?p=home`
}

export function getGameShareUrl() {
  const base = window.location.href.split('#')[0].split('?')[0]
  return `${base}?p=measure&game=store`
}

export function getSharePageUrl(type) {
  const base = window.location.href.split('#')[0].split('?')[0]
  const t = type || 'home'
  return `${base}?p=share&type=${t}`
}

/** 娱乐向分享口令（便于朋友圈/群聊复制） */
export function buildShareCode(result) {
  const n = result && result.mid ? Math.round(result.mid) : 0
  return 'TD' + String((n * 7 + (Date.now() % 10000)) % 10000).padStart(4, '0')
}

export async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch (_) { /* fallback below */ }
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.cssText = 'position:fixed;left:-9999px;top:0'
  document.body.appendChild(ta)
  ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta)
  return ok
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
  el._hideTimer = setTimeout(() => el.classList.remove('visible'), 2400)
}

export function onId(id, event, fn) {
  const el = document.getElementById(id)
  if (el) el.addEventListener(event, fn)
}

export function onSel(sel, event, fn, root) {
  const el = (root || document).querySelector(sel)
  if (el) el.addEventListener(event, fn)
}
