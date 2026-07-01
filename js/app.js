import {
  BRAND,
  HOME_COMMUNITY,
  FOUNDER_TOPICS,
  COMMUNITY_TOPICS,
  COMMUNITY_FEED,
  IP_COLUMNS,
  IP_GRID_META,
  SERVICE_CASES,
  PRODUCT_LEVELS,
  PORTRAITS,
  ENDORSEMENT_GROUPS,
  GUEST_PROFILES,
  CREDENTIALS,
  SERVICE_SCOPES,
  COMPLIANCE,
  TOPIC_SUBMIT_HINTS,
  TOPIC_CATEGORY_OPTIONS
} from './content.js'
import {
  QUESTIONS,
  INDUSTRY_TYPES,
  INVESTMENT_STATUS,
  INVESTMENT_RANGES,
  AGE_RANGES,
  GENDERS,
  PENDING_CONSULT_KEY,
  buildSummary
} from './constants.js'
import { createMeasureController } from './measure.js'
import { LOCAL_GEO, localMapLinks } from './geo-config.js'
import { applyGeoSeo } from './geo-seo.js'
import { validateLeadPayload, submitLeadRemote, submitLeadLocal, fetchWebLeads, getAdminToken, setAdminToken, clearAdminToken, formatLeadTime } from './leads-api.js'
import { leadsBackendReady, feishuBackendReady, LEADS_CONFIG } from './leads-config.js'
import { img, esc, formatReplyDeadline, getConsultUrl, getHomeShareUrl, getGameShareUrl, getSharePageUrl, pageUrl, goPage, parsePageQuery, copyText, showToast, onId, onSel, closestEl } from './utils.js'

const LEADS_KEY = 'toudada_web_leads'
let lastSubmitMode = 'local_only'
const app = document.getElementById('app')
const modalRoot = document.getElementById('modal-root')
let measureController = null
let expandedProduct = null

const draft = {
  answers: loadDraft(),
  basic: {},
  qIndex: 0,
  basicStep: 1
}

function loadDraft() {
  try {
    const raw = localStorage.getItem(PENDING_CONSULT_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (e) {
    return {}
  }
}

function saveDraft() {
  localStorage.setItem(PENDING_CONSULT_KEY, JSON.stringify(draft.answers))
}

function hotTopics() {
  const founder = FOUNDER_TOPICS.map((t) => ({ ...t, displayBadge: '阅读', displayCount: 0 }))
  const community = COMMUNITY_TOPICS.map((t) => ({ ...t, displayCount: t.voteCount }))
  return founder.concat(community)
}

function ipGridItems() {
  return IP_GRID_META.map((meta) => {
    const col = IP_COLUMNS.find((c) => c.key === meta.key)
    if (!col) return null
    const shortName = col.name.replace('头大大谈', '')
    return { ...col, shortName, color: meta.color }
  }).filter(Boolean)
}

function route() {
  const q = parsePageQuery()
  if (q.p) {
    const sub = q.sub || q.game || ''
    return { page: q.p, sub }
  }
  const hash = location.hash.replace(/^#/, '') || 'home'
  const parts = hash.split('/')
  return { page: parts[0] || 'home', sub: parts[1] || '' }
}

function setActiveNav(page) {
  const navPage = page === 'consult' || page === 'questionnaire' ? 'consult' : page
  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.classList.toggle('active', el.dataset.nav === navPage)
  })
}

function renderSharePage() {
  const q = parsePageQuery()
  const type = q.type || 'home'
  const targets = {
    home: { title: '邀请朋友来逛逛', desc: '朋友点开链接，进入头大大谈经营首页', url: getHomeShareUrl(), cta: '进入首页', go: '?p=home' },
    game: { title: '邀请朋友来测一测', desc: '朋友点开链接，直接玩门店估值小游戏', url: getGameShareUrl(), cta: '我也测一测', go: '?p=measure&game=store' },
    consult: { title: '邀请朋友来咨询', desc: '朋友点开链接，填写 30 秒咨询问卷', url: getConsultUrl(), cta: '我要咨询', go: '?p=consult&sub=start' }
  }
  const t = targets[type] || targets.home

  app.innerHTML = `
    <div class="share-page card">
      <p class="share-page-badge">转发 / 分享专用页</p>
      <h1 class="share-page-title">${esc(t.title)}</h1>
      <p class="share-page-desc">${esc(t.desc)}</p>
      <p class="share-page-tip">你可以把<strong>链接</strong>发给微信好友，或保存下方<strong>二维码</strong>发朋友圈 / 打印物料</p>
      <canvas id="share-qr-canvas" width="220" height="220"></canvas>
      <p class="share-page-url" id="share-page-url">${esc(t.url)}</p>
      <div class="share-actions">
        <button type="button" class="btn-primary" id="share-copy-link">复制链接发给朋友</button>
        <a href="${esc(t.go)}" class="btn-secondary share-page-go">${esc(t.cta)}</a>
      </div>
      <a href="?p=home" class="share-page-back">← 返回首页</a>
    </div>`

  const canvas = document.getElementById('share-qr-canvas')
  if (canvas && window.QRCode) {
    QRCode.toCanvas(canvas, t.url, { width: 220, margin: 2, color: { dark: '#1a3668' } }).catch(() => {})
  }

  onId('share-copy-link', 'click', function () {
    copyText(t.url).then(function (ok) {
      showToast(ok ? '链接已复制，去微信粘贴发送吧' : '复制失败，请长按链接手动复制')
    })
  })
}

function bindSiteNav() {
  document.addEventListener('click', function (e) {
    const el = closestEl(e.target, '[data-go]')
    if (!el) return
    e.preventDefault()
    const go = el.getAttribute('data-go')
    if (go === 'measure') goPage('measure', 'store')
    else goPage(go || 'home')
  }, false)
}

function renderHome() {
  const topics = hotTopics()
  const topicChips = topics
    .map(
      (t, i) => `
      <button type="button" class="topic-chip ${t.isFounder ? 'topic-chip--founder' : ''}" data-topic-index="${i}">
        ${t.isFounder ? '<span class="topic-chip-founder">头大大</span>' : ''}
        #${esc(t.label)}
        <span class="topic-chip-count">${t.isFounder ? t.displayBadge : t.displayCount + ' 人关注'}</span>
      </button>`
    )
    .join('')

  const ipCards = ipGridItems()
    .map(
      (item, i) => `
      <button type="button" class="ip-card" data-ip-key="${item.key}">
        <div class="ip-order">${i + 1}</div>
        <span class="ip-name" style="background:${item.color}22;color:${item.color}">${esc(item.shortName)}</span>
        <p class="ip-desc">${esc(item.desc)}</p>
      </button>`
    )
    .join('')

  const feeds = COMMUNITY_FEED.map(
    (f) => `
    <article class="feed-card">
      <div class="feed-head"><span class="feed-user">${esc(f.user)}</span><span class="feed-tag">${esc(f.tag)}</span></div>
      <p class="feed-text">${esc(f.text)}</p>
    </article>`
  ).join('')

  const featured = SERVICE_CASES[0]

  app.innerHTML = `
    <div class="page-wrap">
      <div>
        <section class="hero-banner">
          <div class="hero-banner-deco"></div>
          <span class="hero-badge">${esc(HOME_COMMUNITY.bannerBadge)}</span>
          <h1 class="hero-title">${esc(HOME_COMMUNITY.communitySlogan)}</h1>
          <p class="hero-slogan">${esc(BRAND.slogan)}</p>
          <p class="hero-tagline">${esc(BRAND.tagline)} · ${esc(BRAND.scope)}</p>
          <a href="?p=consult&sub=start" class="btn-primary hero-cta">${esc(HOME_COMMUNITY.ctaText)} →</a>
          <div class="avatar-row">
            ${['#E85D4C', '#F5A623', '#3DAA8C', '#1A3668'].map((c) => `<span class="avatar-dot" style="background:${c}"></span>`).join('')}
            <span>${esc(HOME_COMMUNITY.memberCount)}</span>
          </div>
        </section>

        <section class="measure-teaser" id="open-measure" data-go="measure" role="button" tabindex="0">
          <span class="measure-teaser-badge">纯属娱乐</span>
          <h2 class="measure-teaser-title">头大大 · 测测</h2>
          <p class="measure-teaser-desc">4 款测评 · 门店估值已可测</p>
          <p class="measure-teaser-cta">点开即测 →</p>
        </section>

        <section class="block">
          <div class="block-head">
            <h2 class="block-title">热门经营话题</h2>
            <span class="block-link" data-action="topic-submit">我要投稿</span>
          </div>
          <p class="topic-hint">头大大独到判断 · 老板投稿共鸣 · 点进阅读或勾选</p>
          <div class="topic-grid">${topicChips}</div>
        </section>

        <section class="block">
          <h2 class="block-title">头大大 · 五栏目</h2>
          <div class="ip-grid">${ipCards}</div>
        </section>

        <section class="block">
          <h2 class="block-title">圈子动态</h2>
          <div class="feed-list">${feeds}</div>
        </section>

        <section class="case-spotlight" data-go="about" role="button" tabindex="0">
          <p class="case-spotlight-label">案例速递</p>
          <h3 class="case-spotlight-title">${esc(featured.title)}</h3>
          <p class="text-muted">${esc(featured.progress)}</p>
        </section>
      </div>
    </div>`

  onId('open-measure', 'click', openMeasureModal)
  app.querySelectorAll('[data-topic-index]').forEach((el) => {
    el.addEventListener('click', () => openTopicModal(Number(el.dataset.topicIndex)))
  })
  app.querySelectorAll('[data-ip-key]').forEach((el) => {
    el.addEventListener('click', () => openIpModal(el.dataset.ipKey))
  })
  onSel('[data-action="topic-submit"]', 'click', openTopicSubmitModal, app)
  onSel('[data-nav="about"]', 'click', () => { goPage('about') }, app)
}

function renderConsult() {
  const { sub } = route()
  if (sub === 'start') return renderQuestionnaire()
  if (sub === 'basic') return renderBasicInfo()
  if (sub === 'success') return renderSuccess()
  if (sub === 'progress') return renderProgress()

  const hasDraft = Object.keys(draft.answers).length > 0
  const steps = [
    { num: 1, title: '5 道经营勾选题', desc: '深度了解门店现状与诉求' },
    { num: 2, title: '补充基础信息', desc: '城市、电话、业态与投资情况' },
    { num: 3, title: '24 小时内联系', desc: '头大大根据问卷初步沟通' }
  ]

  const products = PRODUCT_LEVELS.map((p) => {
    const expanded = expandedProduct === p.level
    return `
      <div class="product-row" data-level="${p.level}">
        <div class="product-level">${p.level}</div>
        <div>
          <p class="product-name">${esc(p.name)}</p>
          <p class="product-note text-muted">${esc(p.note)}${p.level === 'L1' ? ' · ' + esc(p.priceRange) : ''}</p>
          ${expanded ? `<p class="product-desc">${esc(p.desc)}</p>` : ''}
        </div>
        <div class="product-arrow">${expanded ? '−' : '+'}</div>
      </div>`
  }).join('')

  app.innerHTML = `
    <div class="page-wrap">
      <div>
        ${hasDraft ? `<div class="card" style="margin-bottom:16px;cursor:pointer" id="continue-draft"><strong>继续上次咨询</strong><p class="text-muted" style="margin:8px 0 0">点击继续填写</p></div>` : ''}
        <section class="page-hero-band">
          <p class="page-hero-badge">咨询 · 1 分钟问卷</p>
          <h1 class="page-hero-title">${esc(BRAND.slogan)}</h1>
          <p class="page-hero-desc">${esc(BRAND.tagline)} · ${esc(BRAND.scope)}</p>
        </section>
        <h2 class="block-title">咨询流程</h2>
        ${steps.map((s) => `<div class="card step-card"><div class="step-num">${s.num}</div><div><p class="step-title">${esc(s.title)}</p><p class="step-desc">${esc(s.desc)}</p></div></div>`).join('')}
        <div class="action-row">
          <a href="${pageUrl('consult', 'start')}" class="btn-primary">${hasDraft ? '重新开始' : '立即开聊'}</a>
          ${hasDraft ? `<a href="${pageUrl('consult', 'start')}" class="btn-accent" id="continue-draft-btn">继续填写</a>` : ''}
          <a href="${pageUrl('consult', 'progress')}" class="btn-secondary">查看我的进度</a>
        </div>
        <section class="card">
          <div class="block-head"><h2 class="block-title">L1–L9 咨询梯度</h2></div>
          ${products}
        </section>
      </div>
    </div>`

  onId('continue-draft', 'click', () => { goPage('consult', 'start') })
  onId('continue-draft-btn', 'click', (e) => {
    e.preventDefault()
    goPage('consult', 'start')
  })
  app.querySelectorAll('.product-row').forEach((row) => {
    row.addEventListener('click', () => {
      expandedProduct = expandedProduct === row.dataset.level ? null : row.dataset.level
      renderConsult()
    })
  })
}

function renderQuestionnaire() {
  const q = QUESTIONS[draft.qIndex]
  const progress = ((draft.qIndex + 1) / QUESTIONS.length) * 100
  const field = q.field
  const selected = draft.answers[field]
  const selectedArr = Array.isArray(selected) ? selected : selected ? [selected] : []

  const options = q.options
    .map((opt) => {
      const isSelected = q.type === 'multiple' ? selectedArr.includes(opt) : selected === opt
      return `<button type="button" class="option-item ${isSelected ? 'selected' : ''}" data-option="${esc(opt)}">${esc(opt)}</button>`
    })
    .join('')

  app.innerHTML = `
    <div class="card question-page" style="max-width:720px;margin:0 auto">
      <div class="progress-bar"><div class="progress-fill" style="width:${progress}%"></div></div>
      <p class="text-muted">第 ${draft.qIndex + 1} / ${QUESTIONS.length} 题</p>
      <h1 class="question-title">${esc(q.title)}</h1>
      <p class="question-sub">${esc(q.subtitle)}</p>
      <div class="option-list">${options}</div>
      <div class="form-nav">
        <button type="button" class="btn-secondary" id="q-prev">${draft.qIndex === 0 ? '返回咨询' : '上一题'}</button>
        <button type="button" class="btn-primary" id="q-next" disabled>下一题</button>
      </div>
    </div>`

  const canNext = q.type === 'multiple' ? selectedArr.length > 0 : !!selected
  document.getElementById('q-next').disabled = !canNext

  app.querySelectorAll('.option-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const opt = btn.dataset.option
      if (q.type === 'multiple') {
        let arr = [...selectedArr]
        const idx = arr.indexOf(opt)
        if (idx >= 0) arr.splice(idx, 1)
        else {
          if (arr.length >= (q.max || 3)) {
            alert('最多选 ' + (q.max || 3) + ' 项')
            return
          }
          arr.push(opt)
        }
        draft.answers[field] = arr
      } else {
        draft.answers[field] = opt
      }
      saveDraft()
      renderQuestionnaire()
    })
  })

  document.getElementById('q-prev').addEventListener('click', () => {
    if (draft.qIndex === 0) goPage('consult')
    else {
      draft.qIndex -= 1
      renderQuestionnaire()
    }
  })

  document.getElementById('q-next').addEventListener('click', () => {
    if (draft.qIndex >= QUESTIONS.length - 1) {
      goPage('consult', 'basic')
      return
    }
    draft.qIndex += 1
    renderQuestionnaire()
  })
}

function renderBasicInfo() {
  if (!draft.answers.q1_stage) {
    goPage('consult', 'start')
    return
  }

  const step = draft.basicStep
  const b = draft.basic
  let body = ''

  if (step === 1) {
    body = `
      <h1 class="question-title">业态与投资</h1>
      <p class="question-sub">先选业态与投资情况，便于匹配诊断口径</p>
      <p class="field-label">属于什么类型的服务业？ *</p>
      <div class="option-list">${INDUSTRY_TYPES.map((o) => `<button type="button" class="option-item ${b.industryType === o ? 'selected' : ''}" data-field="industryType" data-value="${esc(o)}">${esc(o)}</button>`).join('')}</div>
      <p class="field-label">投资情况 · 目前状态 *</p>
      <div class="option-list">${INVESTMENT_STATUS.map((o) => `<button type="button" class="option-item ${b.investmentStatus === o ? 'selected' : ''}" data-field="investmentStatus" data-value="${esc(o)}">${esc(o)}</button>`).join('')}</div>
      <p class="field-label">金额区间 *</p>
      <div class="option-list">${INVESTMENT_RANGES.map((o) => `<button type="button" class="option-item ${b.investmentRange === o ? 'selected' : ''}" data-field="investmentRange" data-value="${esc(o)}">${esc(o)}</button>`).join('')}</div>`
  } else {
    body = `
      <h1 class="question-title">联系方式</h1>
      <p class="question-sub">留下城市与电话，24 小时内与您联系</p>
      <label class="field-block"><span class="field-label">所在城市 *</span><input class="field-input" id="city" value="${esc(b.city || '')}" placeholder="如：成都、重庆" /></label>
      <label class="field-block"><span class="field-label">手机号码 *</span><input class="field-input" id="phone" value="${esc(b.phone || '')}" placeholder="11 位手机号" maxlength="11" /></label>
      <p class="field-label">年龄（选填）</p>
      <div class="option-list">${AGE_RANGES.map((o) => `<button type="button" class="option-item ${(b.age || '不填写') === o ? 'selected' : ''}" data-field="age" data-value="${esc(o)}">${esc(o)}</button>`).join('')}</div>
      <p class="field-label">性别（选填）</p>
      <div class="option-list">${GENDERS.map((o) => `<button type="button" class="option-item ${(b.gender || '不填写') === o ? 'selected' : ''}" data-field="gender" data-value="${esc(o)}">${esc(o)}</button>`).join('')}</div>
      <div class="privacy-row" id="privacy-toggle">
        <span class="privacy-check ${b.privacyAgreed ? 'checked' : ''}">${b.privacyAgreed ? '✓' : ''}</span>
        <span>我已阅读并同意 <span class="privacy-link" id="open-privacy">《隐私政策》</span>，授权用于咨询联系与进度通知</span>
      </div>`
  }

  app.innerHTML = `
    <div class="card question-page" style="max-width:720px;margin:0 auto">
      <p class="text-muted">第 ${step} / 2 步</p>
      ${body}
      <div class="form-nav">
        <button type="button" class="btn-secondary" id="basic-prev">${step === 1 ? '返回问卷' : '上一步'}</button>
        <button type="button" class="btn-primary" id="basic-next">${step === 2 ? '提交咨询' : '下一步'}</button>
      </div>
    </div>`

  app.querySelectorAll('[data-field]').forEach((btn) => {
    btn.addEventListener('click', () => {
      draft.basic[btn.dataset.field] = btn.dataset.value
      renderBasicInfo()
    })
  })

  onId('basic-prev', 'click', () => {
    if (step === 1) goPage('consult', 'start')
    else {
      draft.basicStep = 1
      renderBasicInfo()
    }
  })

  onId('city', 'input', (e) => {
    draft.basic.city = e.target.value
  })
  onId('phone', 'input', (e) => {
    draft.basic.phone = e.target.value
  })
  onId('privacy-toggle', 'click', (e) => {
    if (e.target.id === 'open-privacy') return
    draft.basic.privacyAgreed = !draft.basic.privacyAgreed
    renderBasicInfo()
  })
  onId('open-privacy', 'click', (e) => {
    e.stopPropagation()
    openPrivacyModal()
  })

  onId('basic-next', 'click', () => {
    const b = draft.basic
    if (step === 1) {
      if (!b.industryType || !b.investmentStatus || !b.investmentRange) {
        alert('请完善业态与投资信息')
        return
      }
      draft.basicStep = 2
      renderBasicInfo()
      return
    }
    const phone = (b.phone || '').trim()
    if (!(b.city && b.city.trim()) || !/^1\d{10}$/.test(phone)) {
      alert('请填写城市与有效手机号')
      return
    }
    if (!b.privacyAgreed) {
      alert('请先阅读并同意隐私政策')
      return
    }
    submitConsult()
  })
}

function submitConsult() {
  const record = {
    id: 'web_' + Date.now(),
    answers: { ...draft.answers },
    basicInfo: { ...draft.basic },
    summary: buildSummary(draft.answers, draft.basic),
    stage: '线索',
    createdAt: new Date().toISOString()
  }
  const err = validateLeadPayload(record)
  if (err) {
    alert(err)
    return
  }
  submitLeadRemote(record)
    .then(function (remote) {
      if (remote.ok) return remote
      return submitLeadLocal(record, LEADS_KEY)
    })
    .catch(function () {
      return submitLeadLocal(record, LEADS_KEY)
    })
    .then(function (result) {
      lastSubmitMode = result.reason || 'local_storage'
      localStorage.setItem('toudada_last_lead_id', record.id)
      localStorage.removeItem(PENDING_CONSULT_KEY)
      draft.answers = {}
      draft.basic = {}
      draft.qIndex = 0
      draft.basicStep = 1
      goPage('consult', 'success')
    })
}

function renderSuccess() {
  const deadline = formatReplyDeadline(24)
  const cloudOk = lastSubmitMode === 'cloud'
  const feishuOk = lastSubmitMode === 'feishu'
  let backendNote = '（演示模式：信息暂存在您本机浏览器；配置飞书 Webhook 后老板可在表格中查看。）'
  if (feishuOk) {
    backendNote = '您的信息已提交，头大大会在 24 小时内联系您。'
  } else if (cloudOk) {
    backendNote = '您的信息已安全提交，头大大会在后台收到并尽快联系您。'
  }

  app.innerHTML = `
    <div style="max-width:640px;margin:0 auto">
      <section class="success-hero">
        <div class="success-icon">✓</div>
        <h1 style="margin:0 0 8px">已收到您的咨询需求</h1>
        <p style="margin:0;opacity:0.9">我们将在 24 小时内与您联系</p>
      </section>
      <div class="card">
        <p><strong>预计回复</strong><br><span class="text-muted">24 小时内（不晚于 ${esc(deadline)}）</span></p>
        <hr style="border:none;border-top:1px solid var(--color-border);margin:16px 0" />
        <p><strong>下一步</strong><br><span class="text-muted">头大大将根据问卷与您初步沟通</span></p>
        <p class="text-muted" style="font-size:13px;margin-top:12px">${esc(backendNote)}</p>
      </div>
      <div class="action-row">
        <a href="${pageUrl('consult', 'progress')}" class="btn-primary">查看我的进度</a>
        <a href="${pageUrl('home')}" class="btn-secondary">返回首页</a>
      </div>
    </div>`
}

function renderProgress() {
  const id = localStorage.getItem('toudada_last_lead_id')
  const leads = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]')
  const lead = leads.find((l) => l.id === id) || leads[0]

  if (!lead) {
    app.innerHTML = `
      <div class="card" style="max-width:560px;margin:0 auto;text-align:center">
        <h2>暂无咨询记录</h2>
        <p class="text-muted">提交问卷后，可在此查看进度</p>
        <a href="${pageUrl('consult', 'start')}" class="btn-primary">立即开聊</a>
      </div>`
    return
  }

  const safeSummary = esc(lead.summary).replace(/1\d{10}/g, function (m) {
    return m.slice(0, 3) + '****' + m.slice(-4)
  })

  app.innerHTML = `
    <div class="card" style="max-width:640px;margin:0 auto">
      <h1 class="question-title">我的咨询进度</h1>
      <p class="text-muted">提交时间：${new Date(lead.createdAt).toLocaleString('zh-CN')}</p>
      <p style="font-size:18px;font-weight:700;color:var(--color-mint);margin:20px 0">当前阶段：${esc(lead.stage)}</p>
      <pre style="white-space:pre-wrap;font-size:13px;background:rgba(26,54,104,0.04);padding:16px;border-radius:12px;line-height:1.6">${safeSummary}</pre>
      <div class="action-row">
        <a href="${pageUrl('consult')}" class="btn-secondary">返回咨询</a>
        <a href="${pageUrl('home')}" class="btn-primary">回首页</a>
      </div>
    </div>`
}

function renderLocalPage() {
  const maps = localMapLinks()
  const cities = LOCAL_GEO.serviceCities
    .map((city) => `<span class="local-city-chip">${esc(city)}</span>`)
    .join('')
  const listings = LOCAL_GEO.mapListings
    .map(function (item) {
      const done = item.status === 'live'
      return `
      <div class="local-map-row">
        <span class="local-map-name">${esc(item.name)}</span>
        <span class="local-map-status ${done ? 'local-map-status--live' : ''}">${done ? '已入驻' : '待认领'}</span>
        <a href="${esc(item.claimUrl)}" class="local-map-link" target="_blank" rel="noopener noreferrer">认领指引</a>
      </div>`
    })
    .join('')

  app.innerHTML = `
    <div class="page-wrap local-page">
      <section class="page-hero-band local-hero">
        <p class="page-hero-badge">同城 · ${esc(LOCAL_GEO.regionLabel)}</p>
        <h1 class="page-hero-title">${esc(LOCAL_GEO.primaryCity)}餐饮门店经营咨询</h1>
        <p class="page-hero-desc">个人 OPC · 线上下单 · 预约对接 · 地图可找</p>
      </section>

      <section class="card">
        <h2 class="block-title">服务城市</h2>
        <div class="local-city-grid">${cities}</div>
        <p class="text-muted" style="margin-top:12px;line-height:1.6">主营 ${esc(LOCAL_GEO.industries.join('、'))} · ${esc(LOCAL_GEO.businessHours)}</p>
      </section>

      <section class="card local-map-card">
        <h2 class="block-title">地图找店 · 一键导航</h2>
        <p class="text-muted">${esc(LOCAL_GEO.address)}</p>
        <p class="text-muted" style="font-size:13px">${esc(LOCAL_GEO.wechatNote)}</p>
        <div class="local-map-actions">
          <a href="${esc(maps.amap)}" class="btn-primary local-map-btn" target="_blank" rel="noopener noreferrer">高德地图</a>
          <a href="${esc(maps.baidu)}" class="btn-secondary local-map-btn" target="_blank" rel="noopener noreferrer">百度地图</a>
          <a href="${esc(maps.tencent)}" class="btn-secondary local-map-btn" target="_blank" rel="noopener noreferrer">腾讯地图</a>
        </div>
        <a href="${esc(maps.amapNav)}" class="local-nav-link" target="_blank" rel="noopener noreferrer">驾车导航 →</a>
      </section>

      <section class="card">
        <h2 class="block-title">地图平台入驻（运营清单）</h2>
        <p class="text-muted" style="font-size:13px;margin-bottom:12px">Marketing 认领 POI 后，在 web/js/geo-config.js 把 status 改为 live</p>
        ${listings}
      </section>

      <section class="card local-copy-block">
        <h2 class="block-title">同城老板常见搜索</h2>
        <ul class="local-faq">
          <li>${esc(LOCAL_GEO.primaryCity)}餐饮经营咨询哪家好？</li>
          <li>${esc(LOCAL_GEO.primaryCity)}门店诊断 · 翻台率 · 人力成本</li>
          <li>${esc(LOCAL_GEO.primaryCity)}餐饮老板个人顾问 · 24 小时回复</li>
        </ul>
      </section>

      <div class="action-row">
        <a href="${pageUrl('consult', 'start')}" class="btn-primary">立即预约咨询</a>
        <a href="${pageUrl('share')}&type=consult" class="btn-secondary">分享给同城老板</a>
      </div>
    </div>`
}

function renderAdminLeads() {
  if (feishuBackendReady()) {
    const tableUrl = (LEADS_CONFIG.feishuTableUrl || '').trim()
    app.innerHTML = `
      <div class="card admin-page" style="max-width:640px;margin:0 auto">
        <h1 class="question-title">咨询线索 · 飞书表格</h1>
        <p class="text-muted" style="line-height:1.65">客户在你官网填表后，会自动写入<strong>飞书多维表格</strong>。请打开飞书 App 或电脑版查看。</p>
        ${tableUrl ? `<a href="${esc(tableUrl)}" class="btn-primary" style="display:inline-block;margin:12px 0" target="_blank" rel="noopener noreferrer">打开飞书客户表</a>` : '<p class="text-muted">提示：可在 leads-config.js 填写 feishuTableUrl，方便一键打开表格。</p>'}
        <p class="text-muted" style="font-size:13px">表格列：提交时间、城市、手机、业态、投资、问卷摘要等。</p>
        <a href="${pageUrl('home')}" class="btn-secondary">返回首页</a>
      </div>`
    return
  }

  const token = getAdminToken()
  const backendOn = leadsBackendReady()

  if (!backendOn) {
    app.innerHTML = `
      <div class="card admin-page" style="max-width:640px;margin:0 auto">
        <h1 class="question-title">线索后台</h1>
        <p class="text-muted">尚未配置飞书 Webhook 或微信云后台。请见 <strong>docs/FEISHU-SETUP.md</strong></p>
        <a href="${pageUrl('home')}" class="btn-secondary">返回首页</a>
      </div>`
    return
  }

  if (!token) {
    app.innerHTML = `
      <div class="card admin-page" style="max-width:480px;margin:0 auto">
        <h1 class="question-title">线索后台 · 登录</h1>
        <p class="text-muted">输入你在云开发里设置的 <strong>WEB_LEAD_SECRET</strong>（管理密码）</p>
        <input type="password" class="field-input" id="admin-token-input" placeholder="管理密码" autocomplete="off" />
        <div class="form-nav" style="margin-top:16px">
          <button type="button" class="btn-primary" id="admin-login-btn">进入后台</button>
          <a href="${pageUrl('home')}" class="btn-secondary">返回</a>
        </div>
        <p class="text-muted" style="font-size:12px;margin-top:16px">此页不显示在导航里，请收藏链接：<br>${esc(pageUrl('admin'))}</p>
      </div>`
    onId('admin-login-btn', 'click', function () {
      const input = document.getElementById('admin-token-input')
      const val = input && input.value ? input.value.trim() : ''
      if (!val) {
        alert('请输入管理密码')
        return
      }
      fetchWebLeads(val)
        .then(function () {
          setAdminToken(val)
          renderAdminLeads()
        })
        .catch(function () {
          alert('密码错误或云函数未部署，请检查 WEB-LEADS-SETUP 文档')
        })
    })
    return
  }

  app.innerHTML = `
    <div class="admin-page" style="max-width:960px;margin:0 auto">
      <div class="admin-head">
        <h1 class="question-title">官网咨询线索</h1>
        <div class="admin-head-actions">
          <button type="button" class="btn-secondary" id="admin-refresh">刷新</button>
          <button type="button" class="btn-secondary" id="admin-logout">退出</button>
        </div>
      </div>
      <p class="text-muted" id="admin-status">加载中…</p>
      <div id="admin-leads-list"></div>
    </div>`

  function loadLeads() {
    const status = document.getElementById('admin-status')
    const list = document.getElementById('admin-leads-list')
    if (status) status.textContent = '加载中…'
    fetchWebLeads()
      .then(function (data) {
        const leads = (data && data.leads) || []
        if (status) status.textContent = '共 ' + leads.length + ' 条（最近 100 条）'
        if (!list) return
        if (!leads.length) {
          list.innerHTML = '<div class="card"><p class="text-muted">暂无提交。把咨询链接发给客户后，他们填完会出现在这里。</p></div>'
          return
        }
        list.innerHTML = leads
          .map(function (lead) {
            const b = lead.basicInfo || {}
            return `
            <article class="card admin-lead-card">
              <div class="admin-lead-head">
                <strong>${esc(b.city || '—')}</strong>
                <span>${esc(b.phone || '—')}</span>
                <span class="text-muted">${esc(formatLeadTime(lead))}</span>
              </div>
              <p class="text-muted" style="font-size:13px;margin:8px 0">
                ${esc(b.industryType || '')} ${b.investmentStatus ? '· ' + esc(b.investmentStatus) : ''} ${b.investmentRange ? '· ' + esc(b.investmentRange) : ''}
              </p>
              <pre class="admin-lead-summary">${esc(lead.summary || '')}</pre>
            </article>`
          })
          .join('')
      })
      .catch(function () {
        if (status) status.textContent = '加载失败，请重新登录'
        clearAdminToken()
      })
  }

  onId('admin-refresh', 'click', loadLeads)
  onId('admin-logout', 'click', function () {
    clearAdminToken()
    renderAdminLeads()
  })
  loadLeads()
}

function renderAbout() {
  const scopes = SERVICE_SCOPES.slice(0, 6)
    .map((s) => `<div class="scope-item"><span class="scope-name">${esc(s.name)}</span>${esc(s.desc)}</div>`)
    .join('')

  const portraits = PORTRAITS.map(
    (p) => `
    <div class="portrait-thumb">
      <img src="${img(p.image)}" alt="${esc(p.caption)}" loading="lazy" />
      <p class="portrait-thumb-caption">${esc(p.caption)}</p>
    </div>`
  ).join('')

  const endorsements = ENDORSEMENT_GROUPS.map(
    (g) => `
    <article class="endorse-card">
      <img src="${img(g.cover)}" alt="${esc(g.guest)}" loading="lazy" />
      <div class="endorse-card-body">
        <p class="endorse-guest">${esc(g.guest)}</p>
        <p class="endorse-tag">${esc(g.tag)} · ${esc(g.title)}</p>
      </div>
    </article>`
  ).join('')

  const creds = CREDENTIALS.map(
    (c) => `<div class="card step-card"><div class="step-num">·</div><div><p class="step-title">${esc(c.year)} · ${esc(c.title)}</p><p class="step-desc">${esc(c.desc)}</p></div></div>`
  ).join('')

  app.innerHTML = `
    <div class="page-wrap">
      <div>
        <section class="about-hero">
          <img src="${img('/images/portraits/portrait-main.jpg')}" alt="${esc(BRAND.name)}" />
          <div class="about-hero-overlay"></div>
          <div class="about-hero-content">
            <h1 class="about-hero-name">${esc(BRAND.name)}</h1>
            <p>${esc(BRAND.slogan)}</p>
            <p style="opacity:0.85">${esc(BRAND.tagline)}</p>
          </div>
        </section>
        <div class="card">
          <p>${esc(BRAND.intro)}</p>
          <p><strong>擅长：</strong>${esc(BRAND.expertiseSummary)}</p>
          <p class="text-muted">${esc(BRAND.scope)}</p>
        </div>
        <section class="block"><h2 class="block-title">个人形象</h2><div class="portrait-scroll">${portraits}</div></section>
        <section class="block"><h2 class="block-title">行业交流 · 坐而论道</h2><div class="endorse-scroll">${endorsements}</div></section>
        <section class="block">
          <h2 class="block-title">前辈背书 · 与我何干</h2>
          ${['yu', 'feng']
            .map((key) => {
              const g = GUEST_PROFILES[key]
              return `<div class="card"><p><strong>${esc(g.name)}</strong> · ${esc(g.tag)}</p>${g.lines.map((l) => `<p class="text-muted" style="line-height:1.65;margin-top:10px">${esc(l)}</p>`).join('')}</div>`
            })
            .join('')}
        </section>
        <section class="card">
          <h2 class="block-title">18 个服务业态</h2>
          <div class="scope-grid">${scopes}</div>
          <p class="text-muted" style="margin-top:12px">等共 ${SERVICE_SCOPES.length} 类 · 详见小程序</p>
        </section>
        <section class="block"><h2 class="block-title">行业资历</h2>${creds}</section>
        <div class="card"><p class="text-muted" style="font-size:13px;line-height:1.65">${esc(COMPLIANCE)}</p></div>
        <div class="action-row"><a href="${pageUrl('consult', 'start')}" class="btn-primary">${esc(HOME_COMMUNITY.ctaText)} →</a></div>
      </div>
    </div>`
}

function openMeasureModal(initialGame) {
  closeModal()
  modalRoot.innerHTML = `
    <div class="modal-mask" id="measure-mask">
      <div class="modal" style="max-width:520px;padding-top:48px">
        <button type="button" class="modal-close" id="measure-close">×</button>
        <div id="measure-root"></div>
      </div>
    </div>`
  const root = document.getElementById('measure-root')
  if (measureController) measureController.destroy()
  measureController = createMeasureController(root, {
    onClose: closeModal
  })
  if (initialGame === 'store') measureController.openStoreGame()
  else measureController.openList()
  document.getElementById('measure-close').addEventListener('click', closeModal)
  document.getElementById('measure-mask').addEventListener('click', (e) => {
    if (e.target.id === 'measure-mask') closeModal()
  })
}

function openTopicModal(index) {
  const topics = hotTopics()
  const topic = topics[index]
  if (!topic) return
  closeModal()

  if (topic.isFounder) {
    modalRoot.innerHTML = `
      <div class="modal-mask" data-close-mask>
        <div class="modal">
          <button type="button" class="modal-close" data-close>×</button>
          <span class="hero-badge" style="display:inline-block;background:rgba(26,54,104,0.08);color:var(--color-primary);padding:4px 12px;border-radius:999px;font-size:12px">头大大投稿</span>
          <h2 class="modal-title">${esc(topic.title)}</h2>
          <p class="modal-meta">${esc(topic.submitter)} · 头大大谈经营</p>
          <div class="modal-body">${topic.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
          <a href="${pageUrl('consult', 'start')}" class="btn-primary" style="width:100%;margin-top:16px" data-close-link>有类似困惑 · 立即开聊</a>
        </div>
      </div>`
  } else {
    modalRoot.innerHTML = `
      <div class="modal-mask" data-close-mask>
        <div class="modal">
          <button type="button" class="modal-close" data-close>×</button>
          <span class="hero-badge" style="display:inline-block;background:rgba(232,93,76,0.1);color:var(--color-coral);padding:4px 12px;border-radius:999px;font-size:12px">老板投稿</span>
          <h2 class="modal-title">#${esc(topic.label)}</h2>
          <p class="modal-meta">${esc(topic.submitter)} · ${topic.displayCount} 位老板关注</p>
          <p class="modal-body">${esc(topic.intro)}</p>
          <a href="${pageUrl('consult', 'start')}" class="btn-primary" style="width:100%;margin-top:16px" data-close-link>带着困惑去咨询</a>
        </div>
      </div>`
  }
  bindModalClose()
}

function openIpModal(key) {
  const col = IP_COLUMNS.find((c) => c.key === key)
  if (!col) return
  closeModal()
  modalRoot.innerHTML = `
    <div class="modal-mask" data-close-mask>
      <div class="modal">
        <button type="button" class="modal-close" data-close>×</button>
        <h2 class="modal-title">${esc(col.name)}</h2>
        <p class="modal-meta">${esc(col.desc)}</p>
        <ul class="modal-body" style="padding-left:20px">${col.points.map((p) => `<li style="margin-bottom:10px">${esc(p)}</li>`).join('')}</ul>
        <button type="button" class="btn-primary" style="width:100%;margin-top:12px" data-close>知道了</button>
      </div>
    </div>`
  bindModalClose()
}

function openTopicSubmitModal() {
  closeModal()
  modalRoot.innerHTML = `
    <div class="modal-mask" data-close-mask>
      <div class="modal">
        <button type="button" class="modal-close" data-close>×</button>
        <h2 class="modal-title">说出你的经营困惑</h2>
        <p class="text-muted">${esc(TOPIC_SUBMIT_HINTS[0])}</p>
        <p class="field-label">一句话标题</p>
        <input class="field-input" id="submit-label" maxlength="16" placeholder="例如：商场店人流大但不转化" />
        <p class="field-label">所属方向</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
          ${TOPIC_CATEGORY_OPTIONS.map((c) => `<button type="button" class="option-item" style="width:auto;padding:8px 14px" data-cat="${c.key}">${esc(c.label)}</button>`).join('')}
        </div>
        <p class="field-label">具体困境</p>
        <textarea class="field-input" id="submit-intro" rows="4" maxlength="200" placeholder="描述你的现状"></textarea>
        <div class="form-nav" style="margin-top:16px">
          <button type="button" class="btn-secondary" data-close>取消</button>
          <button type="button" class="btn-primary" id="submit-topic">发布投稿</button>
        </div>
      </div>
    </div>`
  bindModalClose()
  onId('submit-topic', 'click', () => {
    alert('投稿已收到（网页演示版），感谢分享！')
    closeModal()
  })
}

function openPrivacyModal() {
  modalRoot.innerHTML = `
    <div class="modal-mask" data-close-mask>
      <div class="modal">
        <button type="button" class="modal-close" data-close>×</button>
        <h2 class="modal-title">隐私政策</h2>
        <div class="modal-body">
          <p>为响应您的咨询需求，我们可能收集：问卷答案、业态与投资情况、所在城市、手机号码，以及您自愿填写的年龄、性别等画像信息。</p>
          <p>上述信息仅用于初步沟通、经营诊断匹配、项目进度通知与交付跟进。不会用于与咨询无关的营销推送。</p>
          <p>您有权查询、更正或要求删除您的咨询信息。主体：头大大谈经营（个人）。</p>
        </div>
        <button type="button" class="btn-primary" style="width:100%;margin-top:12px" data-close>知道了</button>
      </div>
    </div>`
  bindModalClose()
}

function bindModalClose() {
  modalRoot.querySelectorAll('[data-close], [data-close-mask]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (el.dataset.closeMask && e.target !== el) return
      closeModal()
    })
  })
  modalRoot.querySelectorAll('[data-close-link]').forEach((el) => {
    el.addEventListener('click', closeModal)
  })
}

function closeModal() {
  if (measureController) measureController.destroy()
  measureController = null
  modalRoot.innerHTML = ''
}

function render() {
  const { page, sub } = route()
  setActiveNav(page === 'consult' || page === 'questionnaire' ? 'consult' : page)

  try {
    applyGeoSeo(page === '' ? 'home' : page, sub)
  } catch (seoErr) {
    console.warn('geo seo', seoErr)
  }

  if (page === 'home' || page === '') renderHome()
  else if (page === 'consult') renderConsult()
  else if (page === 'about') renderAbout()
  else if (page === 'local') renderLocalPage()
  else if (page === 'admin') renderAdminLeads()
  else if (page === 'share') renderSharePage()
  else if (page === 'measure') {
    renderHome()
    setTimeout(() => openMeasureModal(sub === 'store' ? 'store' : null), 0)
  } else if (page === 'questionnaire') {
    goPage('consult', 'start')
  } else renderHome()
}

window.addEventListener('hashchange', render)

bindSiteNav()

document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.site-logo-img')
  if (logo && window.__SITE_IMG_BASE) {
    logo.src = window.__SITE_IMG_BASE + '/brand/toudada-talk-business-logo.png'
  }
})

try {
  render()
} catch (bootErr) {
  console.error(bootErr)
  const appEl = document.getElementById('app')
  if (appEl) {
    appEl.innerHTML =
      '<div class="card" style="padding:24px"><h2>页面加载失败</h2><p>' +
      (bootErr.message || bootErr) +
      '</p><p class="text-muted">请用本地服务器打开：python3 -m http.server 8765 → http://localhost:8765/web/</p></div>'
  }
}
