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
import { img, esc, formatReplyDeadline, getConsultUrl, getGameShareUrl, buildShareCode, copyText, showToast } from './utils.js'

const LEADS_KEY = 'toudada_web_leads'
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
  const params = new URLSearchParams(location.search)
  const fromQuery = params.get('p')
  if (fromQuery) {
    const sub = params.get('sub') || params.get('game') || ''
    return { page: fromQuery, sub }
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

function renderQrTargets() {
  const url = getConsultUrl()
  const urlEl = document.getElementById('qr-url')
  if (urlEl) urlEl.textContent = url
  const draw = (canvas, size) => {
    if (!canvas || !window.QRCode) return
    QRCode.toCanvas(canvas, url, { width: size, margin: 2, color: { dark: '#1a3668' } }).catch(() => {
      canvas.insertAdjacentHTML('afterend', `<p class="qr-fallback">二维码加载失败，请复制链接：<a href="${url}">${url}</a></p>`)
    })
  }
  draw(document.getElementById('qr-canvas'), 200)
  document.querySelectorAll('[data-qr-canvas]').forEach((c) => draw(c, 180))
  document.querySelectorAll('[data-qr-url]').forEach((el) => {
    el.textContent = url
  })
}

function qrCardHtml() {
  return `
    <div class="card qr-card">
      <h2 class="qr-card-title">扫码给我咨询</h2>
      <p class="qr-card-desc">微信扫一扫下方二维码，打开网页版咨询页。30 秒问卷 · 24 小时内联系。</p>
      <canvas data-qr-canvas width="180" height="180"></canvas>
      <p class="qr-card-url" data-qr-url></p>
      <a href="#consult/start" class="btn-primary" style="width:100%">或直接开始填写</a>
    </div>`
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
    <div class="two-col">
      <div>
        <section class="hero-banner">
          <div class="hero-banner-deco"></div>
          <span class="hero-badge">${esc(HOME_COMMUNITY.bannerBadge)}</span>
          <h1 class="hero-title">${esc(HOME_COMMUNITY.communitySlogan)}</h1>
          <p class="hero-slogan">${esc(BRAND.slogan)}</p>
          <p class="hero-tagline">${esc(BRAND.tagline)} · ${esc(BRAND.scope)}</p>
          <a href="#consult/start" class="btn-primary hero-cta">${esc(HOME_COMMUNITY.ctaText)} →</a>
          <div class="avatar-row">
            ${['#E85D4C', '#F5A623', '#3DAA8C', '#1A3668'].map((c) => `<span class="avatar-dot" style="background:${c}"></span>`).join('')}
            <span>${esc(HOME_COMMUNITY.memberCount)}</span>
          </div>
        </section>

        <section class="measure-teaser" id="open-measure">
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

        <section class="case-spotlight" data-nav="about">
          <p class="case-spotlight-label">案例速递</p>
          <h3 class="case-spotlight-title">${esc(featured.title)}</h3>
          <p class="text-muted">${esc(featured.progress)}</p>
        </section>
      </div>
      ${qrCardHtml()}
    </div>`

  document.getElementById('open-measure')?.addEventListener('click', openMeasureModal)
  app.querySelectorAll('[data-topic-index]').forEach((el) => {
    el.addEventListener('click', () => openTopicModal(Number(el.dataset.topicIndex)))
  })
  app.querySelectorAll('[data-ip-key]').forEach((el) => {
    el.addEventListener('click', () => openIpModal(el.dataset.ipKey))
  })
  app.querySelector('[data-action="topic-submit"]')?.addEventListener('click', openTopicSubmitModal)
  app.querySelector('[data-nav="about"]')?.addEventListener('click', () => {
    location.hash = 'about'
  })
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
    <div class="two-col">
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
          <a href="#consult/start" class="btn-primary">${hasDraft ? '重新开始' : '立即开聊'}</a>
          ${hasDraft ? '<a href="#consult/start" class="btn-accent" id="continue-draft-btn">继续填写</a>' : ''}
          <a href="#consult/progress" class="btn-secondary">查看我的进度</a>
        </div>
        <section class="card">
          <div class="block-head"><h2 class="block-title">L1–L9 咨询梯度</h2></div>
          ${products}
        </section>
      </div>
      ${qrCardHtml()}
    </div>`

  document.getElementById('continue-draft')?.addEventListener('click', () => {
    location.hash = 'consult/start'
  })
  document.getElementById('continue-draft-btn')?.addEventListener('click', (e) => {
    e.preventDefault()
    location.hash = 'consult/start'
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
    if (draft.qIndex === 0) location.hash = 'consult'
    else {
      draft.qIndex -= 1
      renderQuestionnaire()
    }
  })

  document.getElementById('q-next').addEventListener('click', () => {
    if (draft.qIndex >= QUESTIONS.length - 1) {
      location.hash = 'consult/basic'
      return
    }
    draft.qIndex += 1
    renderQuestionnaire()
  })
}

function renderBasicInfo() {
  if (!draft.answers.q1_stage) {
    location.hash = 'consult/start'
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

  document.getElementById('basic-prev')?.addEventListener('click', () => {
    if (step === 1) location.hash = 'consult/start'
    else {
      draft.basicStep = 1
      renderBasicInfo()
    }
  })

  document.getElementById('city')?.addEventListener('input', (e) => {
    draft.basic.city = e.target.value
  })
  document.getElementById('phone')?.addEventListener('input', (e) => {
    draft.basic.phone = e.target.value
  })
  document.getElementById('privacy-toggle')?.addEventListener('click', (e) => {
    if (e.target.id === 'open-privacy') return
    draft.basic.privacyAgreed = !draft.basic.privacyAgreed
    renderBasicInfo()
  })
  document.getElementById('open-privacy')?.addEventListener('click', (e) => {
    e.stopPropagation()
    openPrivacyModal()
  })

  document.getElementById('basic-next')?.addEventListener('click', () => {
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
    if (!b.city?.trim() || !/^1\d{10}$/.test(phone)) {
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
  const leads = JSON.parse(localStorage.getItem(LEADS_KEY) || '[]')
  leads.unshift(record)
  localStorage.setItem(LEADS_KEY, JSON.stringify(leads))
  localStorage.setItem('toudada_last_lead_id', record.id)
  localStorage.removeItem(PENDING_CONSULT_KEY)
  draft.answers = {}
  draft.basic = {}
  draft.qIndex = 0
  draft.basicStep = 1
  location.hash = 'consult/success'
}

function renderSuccess() {
  const deadline = formatReplyDeadline(24)
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
      </div>
      <div class="action-row">
        <a href="#consult/progress" class="btn-primary">查看我的进度</a>
        <a href="#home" class="btn-secondary">返回首页</a>
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
        <a href="#consult/start" class="btn-primary">立即开聊</a>
      </div>`
    return
  }

  app.innerHTML = `
    <div class="card" style="max-width:640px;margin:0 auto">
      <h1 class="question-title">我的咨询进度</h1>
      <p class="text-muted">提交时间：${new Date(lead.createdAt).toLocaleString('zh-CN')}</p>
      <p style="font-size:18px;font-weight:700;color:var(--color-mint);margin:20px 0">当前阶段：${esc(lead.stage)}</p>
      <pre style="white-space:pre-wrap;font-size:13px;background:rgba(26,54,104,0.04);padding:16px;border-radius:12px;line-height:1.6">${esc(lead.summary)}</pre>
      <div class="action-row">
        <a href="#consult" class="btn-secondary">返回咨询</a>
        <a href="#home" class="btn-primary">回首页</a>
      </div>
    </div>`
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
    <div class="two-col">
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
        <div class="action-row"><a href="#consult/start" class="btn-primary">${esc(HOME_COMMUNITY.ctaText)} →</a></div>
      </div>
      ${qrCardHtml()}
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
  measureController?.destroy()
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
          <a href="#consult/start" class="btn-primary" style="width:100%;margin-top:16px" data-close-link>有类似困惑 · 立即开聊</a>
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
          <a href="#consult/start" class="btn-primary" style="width:100%;margin-top:16px" data-close-link>带着困惑去咨询</a>
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
  document.getElementById('submit-topic')?.addEventListener('click', () => {
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
  measureController?.destroy()
  measureController = null
  modalRoot.innerHTML = ''
}

function render() {
  const { page, sub } = route()
  setActiveNav(page === 'consult' || page === 'questionnaire' ? 'consult' : page)

  if (page === 'home' || page === '') renderHome()
  else if (page === 'consult') renderConsult()
  else if (page === 'about') renderAbout()
  else if (page === 'measure') {
    renderHome()
    setTimeout(() => openMeasureModal(sub === 'store' ? 'store' : null), 0)
  } else renderHome()

  renderQrTargets()
}

window.addEventListener('hashchange', render)

document.getElementById('qr-toggle')?.addEventListener('click', () => {
  const panel = document.getElementById('qr-panel')
  const open = panel.hidden
  panel.hidden = !open
  document.getElementById('qr-toggle').setAttribute('aria-expanded', String(open))
  if (open) renderQrTargets()
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
