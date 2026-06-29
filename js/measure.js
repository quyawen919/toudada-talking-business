import { ROUNDS, GUIDE_PATHS, ROUND_DECO, CELL_BGS } from './store-valuator-data.js'
import { calcValuation, isHighResult, buildShareText } from './store-valuator-engine.js'
import { GAME_CATALOG, HUB_META } from './game-catalog.js'
import { esc, buildShareCode, copyText, getGameShareUrl, showToast } from './utils.js'

const GUIDE_MS = 520
const SHOP_TYPES = [
  { key: 'profit', title: '店在赚钱', desc: '按盈利模型估一估' },
  { key: 'loss', title: '店在亏钱', desc: '壳价 + 趣味折扣' },
  { key: 'prep', title: '还在筹备', desc: '预期值玩玩看' }
]

export function createMeasureController(root, { onClose }) {
  let state = {
    view: 'list',
    phase: 'intro',
    shopType: '',
    roundIndex: 0,
    guideCell: 0,
    pickedCell: -1,
    locked: false,
    timeLeft: 10,
    playCount: 0,
    result: null,
    shareText: '',
    shareCode: '',
    highResult: false,
    audioMuted: false
  }
  let answers = []
  let guidePath = []
  let guideStep = 0
  let timer = null
  let guideTimer = null

  function clearTimers() {
    if (timer) clearInterval(timer)
    if (guideTimer) clearInterval(guideTimer)
    timer = null
    guideTimer = null
  }

  function render() {
    if (state.view === 'list') {
      root.innerHTML = renderList()
      bindList()
      return
    }
    root.innerHTML = renderGame()
    bindGame()
  }

  function renderList() {
    const live = GAME_CATALOG.filter((g) => g.status === 'live').length
    const soon = GAME_CATALOG.filter((g) => g.status === 'soon').length
    const cards = GAME_CATALOG.map((item) => {
      const live = item.status === 'live'
      return `
        <article class="measure-card ${live ? '' : 'measure-card--soon'}" data-id="${item.id}" data-status="${item.status}">
          <div class="measure-card-accent" style="background:${item.color}"></div>
          <div class="measure-card-body">
            <div class="measure-card-top">
              <span class="measure-icon" style="background:${item.color}18;color:${item.color}">${item.emoji}</span>
              <span class="measure-status measure-status--${live ? 'live' : 'soon'}">${live ? '可测' : '即将上线'}</span>
            </div>
            <h3 class="measure-title">${esc(item.title)}</h3>
            <p class="measure-subtitle">${esc(item.subtitle)}</p>
            <p class="measure-desc">${esc(item.desc)}</p>
            <div class="measure-tags">${item.tags.map((t) => `<span class="measure-tag" style="color:${item.color};background:${item.color}14">${esc(t)}</span>`).join('')}</div>
            <p class="measure-cta ${live ? '' : 'measure-cta--muted'}">${live ? '立即开测 →' : '敬请期待'}</p>
          </div>
        </article>`
    }).join('')

    return `
      <div class="measure-panel">
        <div class="hub-hero">
          <span class="hub-badge">${esc(HUB_META.badge)}</span>
          <h2 class="hub-title">${esc(HUB_META.title)}</h2>
          <p class="hub-slogan">${esc(HUB_META.slogan)}</p>
          <p class="hub-stats">${live} 款可测 · ${soon} 款筹备中</p>
        </div>
        <h3 class="hub-section-label">全部测评</h3>
        <div class="measure-list">${cards}</div>
        <p class="hub-footnote">${esc(HUB_META.footnote)}</p>
      </div>`
  }

  function renderGame() {
    if (state.phase === 'intro') {
      const types = SHOP_TYPES.map(
        (t) => `
        <button type="button" class="type-btn type-btn--${t.key} ${state.shopType === t.key ? 'selected' : ''}" data-type="${t.key}">
          <strong>${esc(t.title)}</strong>
          <span>${esc(t.desc)}</span>
        </button>`
      ).join('')
      return `
        <div class="measure-panel sv-page">
          <button type="button" class="sv-back-hub" data-action="back-list">← 返回测测列表</button>
          <div class="sv-hero">
            <span class="sv-badge">纯属娱乐</span>
            <h2 class="sv-title">门店估值测评</h2>
            <p class="sv-sub">九宫格快测 · 10 轮选题 · 看准光框点停</p>
          </div>
          <div class="card sv-card">
            <p class="sv-label">先选你现在的店况：</p>
            <div class="type-list">${types}</div>
          </div>
          <button type="button" class="btn-primary sv-start" data-action="start" ${state.shopType ? '' : 'disabled'}>开始测算</button>
          <p class="sv-foot">本测试纯属娱乐，不构成转让、投资或定价建议。</p>
        </div>`
    }

    if (state.phase === 'play') {
      const round = ROUNDS[state.roundIndex]
      const cells = round.cells
        .map(
          (label, index) => `
          <button type="button" class="sv-cell ${state.guideCell === index ? 'guide' : ''} ${state.pickedCell === index ? 'picked' : ''} ${state.locked ? 'locked' : ''}"
            style="background:${CELL_BGS[index]}" data-index="${index}">
            <div class="sv-cell-head">
              <span class="sv-cell-num">${index + 1}</span>
              <span class="sv-cell-deco">${ROUND_DECO[state.roundIndex][index]}</span>
            </div>
            <span class="sv-cell-label">${esc(label)}</span>
          </button>`
        )
        .join('')
      const dots = Array.from({ length: 10 })
        .map((_, i) => `<span class="sv-dot ${i < state.roundIndex ? 'done' : i === state.roundIndex ? 'current' : ''}"></span>`)
        .join('')
      return `
        <div class="measure-panel sv-page sv-play">
          <div class="sv-play-top">
            <span class="sv-hint">看准转圈的光框 · 点停在哪算哪</span>
            <span class="sv-timer ${state.timeLeft <= 3 ? 'urgent' : ''}">${state.timeLeft}</span>
          </div>
          <div class="card sv-card">
            <p class="sv-question">${esc(round.q)}</p>
            <div class="sv-grid">${cells}</div>
            <div class="sv-dots">${dots}</div>
          </div>
        </div>`
    }

    const r = state.result
    const bars = r.dims
      .map((d) => `<div class="bar-row"><span class="bar-name">${esc(d.name)}</span><div class="bar-track"><div class="bar-fill" style="width:${d.v}%"></div></div></div>`)
      .join('')
    return `
      <div class="measure-panel sv-page sv-result">
        <div class="sv-hero">
          <span class="sv-badge">第 ${state.playCount} 次测算完成</span>
          <h2 class="sv-title">娱乐估值</h2>
        </div>
        <div class="card sv-card">
          <p class="result-label">你的店 · 娱乐估值约</p>
          <p class="result-range">${r.low} – ${r.high} <span class="result-unit">万</span></p>
          <p class="result-tag">${esc(r.tag)}</p>
          <p class="result-quote"><strong>头大大说：</strong>${esc(r.quote)}</p>
          <div class="bar-list">${bars}</div>
        </div>
        <div class="card sv-share-card">
          <p class="share-label">${state.highResult ? '这估值，值得晒给老板朋友' : '发给老板朋友，看看他的店值多少？'}</p>
          <p class="share-code">分享口令：<strong>${esc(state.shareCode)}</strong></p>
          <p class="share-text">${esc(state.shareText)}</p>
          <div class="share-actions">
            <button type="button" class="btn-primary" data-action="copy-share">复制分享文案</button>
            <button type="button" class="btn-secondary" data-action="copy-link">复制测测链接</button>
          </div>
          <p class="share-hint">粘贴到微信聊天 / 朋友圈即可；朋友打开链接就能玩</p>
        </div>
        <div class="sv-result-actions">
          <button type="button" class="btn-primary" data-action="replay">换选择重新测算</button>
          <button type="button" class="btn-secondary" data-action="back-list">返回测测列表</button>
          <button type="button" class="btn-secondary" data-action="close">关闭</button>
        </div>
        <p class="sv-foot">纯属娱乐 · 非正式评估报告</p>
      </div>`
  }

  function bindList() {
    root.querySelectorAll('.measure-card').forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.dataset.id
        const status = el.dataset.status
        if (status === 'live' && id === 'store') {
          state.view = 'game'
          state.phase = 'intro'
          render()
        } else {
          alert('该测评即将上线，敬请期待')
        }
      })
    })
  }

  function bindGame() {
    root.querySelector('[data-action="back-list"]')?.addEventListener('click', () => {
      clearTimers()
      state.view = 'list'
      state.phase = 'intro'
      state.shopType = ''
      render()
    })
    root.querySelector('[data-action="close"]')?.addEventListener('click', () => onClose())
    root.querySelector('[data-action="copy-share"]')?.addEventListener('click', async () => {
      const link = getGameShareUrl()
      const msg = `${state.shareText}\n口令：${state.shareCode}\n${link}`
      const ok = await copyText(msg)
      showToast(ok ? '已复制，去微信粘贴发送吧' : '复制失败，请长按文案手动复制')
    })
    root.querySelector('[data-action="copy-link"]')?.addEventListener('click', async () => {
      const ok = await copyText(getGameShareUrl())
      showToast(ok ? '链接已复制' : '复制失败，请手动复制链接')
    })
    root.querySelector('[data-action="replay"]')?.addEventListener('click', () => {
      clearTimers()
      answers = []
      state.phase = 'intro'
      state.shopType = ''
      state.roundIndex = 0
      state.result = null
      render()
    })
    root.querySelectorAll('[data-type]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.shopType = btn.dataset.type
        render()
      })
    })
    root.querySelector('[data-action="start"]')?.addEventListener('click', () => {
      if (!state.shopType) return
      answers = []
      state.roundIndex = 0
      enterRound()
    })
    root.querySelectorAll('[data-index]').forEach((cell) => {
      cell.addEventListener('click', () => pickCell(Number(cell.dataset.index), false))
    })
  }

  function enterRound() {
    clearTimers()
    const roundIndex = state.roundIndex
    const round = ROUNDS[roundIndex]
    guidePath = GUIDE_PATHS[roundIndex % GUIDE_PATHS.length].slice()
    guideStep = 0
    state.phase = 'play'
    state.guideCell = guidePath[0]
    state.pickedCell = -1
    state.locked = false
    state.timeLeft = 10
    render()
    guideTimer = setInterval(() => {
      if (state.locked) return
      guideStep = (guideStep + 1) % guidePath.length
      state.guideCell = guidePath[guideStep]
      const cell = root.querySelector('.sv-cell.guide')
      if (cell) {
        root.querySelectorAll('.sv-cell').forEach((c) => c.classList.remove('guide'))
        const next = root.querySelector(`[data-index="${state.guideCell}"]`)
        next?.classList.add('guide')
      }
    }, GUIDE_MS)
    timer = setInterval(() => {
      if (state.locked) return
      state.timeLeft -= 1
      const t = root.querySelector('.sv-timer')
      if (t) {
        t.textContent = state.timeLeft
        t.classList.toggle('urgent', state.timeLeft <= 3)
      }
      if (state.timeLeft <= 0) pickCell(state.guideCell, true)
    }, 1000)
  }

  function pickCell(index, auto) {
    if (state.locked) return
    clearTimers()
    const roundIndex = state.roundIndex
    const round = ROUNDS[roundIndex]
    answers.push({ round: roundIndex, cellIndex: index, label: round.cells[index], score: round.scores[index], auto })
    state.locked = true
    state.pickedCell = index
    state.guideCell = index
    render()
    setTimeout(() => {
      const next = roundIndex + 1
      if (next >= 10) finishGame()
      else {
        state.roundIndex = next
        enterRound()
      }
    }, auto ? 420 : 560)
  }

  function finishGame() {
    const result = calcValuation(state.shopType, answers)
    state.playCount += 1
    state.result = result
    state.shareText = buildShareText(state.shopType, result)
    state.shareCode = buildShareCode(result)
    state.highResult = isHighResult(state.shopType, result)
    state.phase = 'result'
    render()
  }

  return {
    openList() {
      state.view = 'list'
      render()
    },
    openStoreGame() {
      state.view = 'game'
      state.phase = 'intro'
      render()
    },
    destroy() {
      clearTimers()
    }
  }
}
