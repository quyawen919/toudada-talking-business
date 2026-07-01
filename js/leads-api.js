import { LEADS_CONFIG, leadsBackendReady, feishuBackendReady, cloudBackendReady } from './leads-config.js'
import { esc } from './utils.js'

const ADMIN_TOKEN_KEY = 'td_admin_token'

export function validateLeadPayload(record) {
  const phone = (record.basicInfo && record.basicInfo.phone) || ''
  const city = (record.basicInfo && record.basicInfo.city) || ''
  if (!city.trim()) return '请填写城市'
  if (!/^1\d{10}$/.test(String(phone).trim())) return '请填写有效手机号'
  if (!record.basicInfo.privacyAgreed) return '请同意隐私政策'
  return null
}

function buildRemotePayload(record) {
  const b = record.basicInfo || {}
  const submittedAt = new Date().toLocaleString('zh-CN', { hour12: false })
  const payload = {
    source: '官网',
    submittedAt: submittedAt,
    city: b.city || '',
    phone: b.phone || '',
    industryType: b.industryType || '',
    investmentStatus: b.investmentStatus || '',
    investmentRange: b.investmentRange || '',
    age: b.age && b.age !== '不填写' ? b.age : '',
    gender: b.gender && b.gender !== '不填写' ? b.gender : '',
    summary: record.summary || '',
    answers: record.answers || {}
  }
  payload.content = [
    '【官网新咨询】',
    '时间：' + submittedAt,
    '城市：' + payload.city,
    '手机：' + payload.phone,
    '业态：' + payload.industryType,
    '投资：' + payload.investmentStatus + (payload.investmentRange ? ' · ' + payload.investmentRange : ''),
    '画像：' + (payload.age || payload.gender ? [payload.age, payload.gender].filter(Boolean).join(' · ') : '未填'),
    '',
    payload.summary
  ].join('\n')
  return payload
}

function isFeishuBotWebhook(url) {
  return /bot\/v2\/hook/i.test(url)
}

/** 飞书：多维表格 Webhook 或群机器人 Webhook */
export function submitLeadFeishu(record) {
  const url = LEADS_CONFIG.feishuWebhookUrl.trim()
  const payload = buildRemotePayload(record)
  let body
  if (isFeishuBotWebhook(url)) {
    body = JSON.stringify({
      msg_type: 'text',
      content: { text: payload.content }
    })
  } else {
    body = JSON.stringify(payload)
  }
  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: body
  }).then(function () {
    return { ok: true, reason: 'feishu' }
  })
}

export function submitLeadCloud(record) {
  const payload = {
    source: 'web',
    ts: Date.now(),
    answers: record.answers,
    basicInfo: record.basicInfo,
    summary: record.summary
  }
  return fetch(LEADS_CONFIG.submitUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + LEADS_CONFIG.accessToken
    },
    body: JSON.stringify(payload),
    credentials: 'omit',
    mode: 'cors'
  }).then(function (res) {
    if (!res.ok) throw new Error('submit failed ' + res.status)
    return res.json().then(function () {
      return { ok: true, reason: 'cloud' }
    })
  })
}

export function submitLeadRemote(record) {
  if (!leadsBackendReady()) {
    return Promise.resolve({ ok: false, reason: 'local_only' })
  }
  if (feishuBackendReady()) {
    return submitLeadFeishu(record)
  }
  if (cloudBackendReady()) {
    return submitLeadCloud(record)
  }
  return Promise.resolve({ ok: false, reason: 'local_only' })
}

export function submitLeadLocal(record, storageKey) {
  const leads = JSON.parse(localStorage.getItem(storageKey) || '[]')
  leads.unshift(record)
  localStorage.setItem(storageKey, JSON.stringify(leads.slice(0, 50)))
  return Promise.resolve({ ok: true, reason: 'local_storage' })
}

export function getAdminToken() {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY) || ''
  } catch (e) {
    return ''
  }
}

export function setAdminToken(token) {
  try {
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token)
  } catch (e) {
    /* ignore */
  }
}

export function clearAdminToken() {
  try {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY)
  } catch (e) {
    /* ignore */
  }
}

export function fetchWebLeads(token) {
  const listUrl = LEADS_CONFIG.adminListUrl
  if (!listUrl) {
    return Promise.reject(new Error('adminListUrl not configured'))
  }
  const authToken = token || getAdminToken() || LEADS_CONFIG.accessToken
  if (!authToken) {
    return Promise.reject(new Error('need token'))
  }
  return fetch(listUrl, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + authToken },
    credentials: 'omit',
    mode: 'cors'
  }).then(function (res) {
    if (res.status === 401) throw new Error('unauthorized')
    if (!res.ok) throw new Error('fetch failed ' + res.status)
    return res.json()
  })
}

export function maskPhone(phone) {
  const p = String(phone || '')
  if (p.length < 7) return esc(p)
  return esc(p.slice(0, 3) + '****' + p.slice(-4))
}

export function formatLeadTime(lead) {
  const t = lead.createdAt
  if (!t) return '—'
  if (typeof t === 'string') return new Date(t).toLocaleString('zh-CN')
  if (t.$date) return new Date(t.$date).toLocaleString('zh-CN')
  return '—'
}
