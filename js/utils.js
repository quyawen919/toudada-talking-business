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
  const base = window.location.href.split('#')[0]
  return `${base}#consult`
}
