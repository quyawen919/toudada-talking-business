import { ROUNDS, TAGS, LOSS_TAGS } from './store-valuator-data.js'

const REVENUE_ANNUAL = [24, 72, 150, 300, 540, 840, 1320, 2640, 4200]
const AREA_ASSET = [6, 12, 22, 38, 58, 95, 150, 260, 420]
const RENT_MARGIN = [0.03, 0.025, 0.015, 0, -0.01, -0.025, -0.04, -0.06, -0.09]
const TEAM_MARGIN = [-0.025, -0.015, -0.008, 0, 0.006, 0.012, 0.018, 0.01, -0.012]

function tier3(idx) {
  return idx < 3 ? 0 : idx < 6 ? 1 : 2
}

function cellIdxFrom(allAnswers, roundIdx) {
  const a = allAnswers.find((x) => x.round === roundIdx)
  return a ? a.cellIndex : 4
}

function buildRA(type) {
  const table = []
  for (let r = 0; r < 9; r++) {
    for (let ab = 0; ab < 3; ab++) {
      const R = REVENUE_ANNUAL[r]
      const A = AREA_ASSET[ab * 3 + 1]
      let v
      if (type === 'profit') {
        const margin = [0.07, 0.1, 0.13][ab]
        const mult = [2.2, 2.6, 3.0][Math.min(2, Math.floor(r / 3))]
        v = Math.max(R * margin * mult, R * [0.18, 0.24, 0.3][ab] + A * [0.32, 0.4, 0.48][ab])
      } else if (type === 'loss') {
        const salvage = A * [0.38, 0.52, 0.62][ab]
        const revTrap = R * [0.11, 0.08, 0.05][ab]
        const ops = Math.max(R * -0.02 * 1.4, -revTrap)
        v = Math.max(salvage + ops, R * 0.04 + A * 0.22)
      } else {
        v = A * [0.72, 0.88, 1.05][ab] + R * [0.04, 0.07, 0.1][ab] + [8, 14, 22][ab]
      }
      table.push(v)
    }
  }
  return table
}

function buildCtx(type) {
  const table = []
  for (let c = 0; c < 3; c++) {
    for (let l = 0; l < 3; l++) {
      for (let p = 0; p < 3; p++) {
        let v
        if (type === 'profit') {
          v = 0.62 + c * 0.11 + l * 0.13 + p * 0.1
          if (c === 2 && l === 2) v += 0.06
          if (p === 2 && l >= 1) v += 0.04
        } else if (type === 'loss') {
          v = 0.48 + l * 0.16 + c * 0.07 + p * 0.05
          if (l === 2) v += 0.05
        } else {
          v = 0.55 + c * 0.14 + l * 0.12 + p * 0.06
          if (c >= 1 && l >= 1) v += 0.05
        }
        table.push(v)
      }
    }
  }
  return table
}

const RA = { profit: buildRA('profit'), loss: buildRA('loss'), prep: buildRA('prep') }
const CTX = { profit: buildCtx('profit'), loss: buildCtx('loss'), prep: buildCtx('prep') }

function fineTune(type, allAnswers) {
  const biz = cellIdxFrom(allAnswers, 1)
  const rent = cellIdxFrom(allAnswers, 5)
  const age = cellIdxFrom(allAnswers, 6)
  const team = cellIdxFrom(allAnswers, 8)
  const xfer = cellIdxFrom(allAnswers, 9)
  const bizM = ROUNDS[1].scores[biz]
  const rentM = ROUNDS[5].scores[rent]
  const ageM = ROUNDS[6].scores[age]
  const teamM = ROUNDS[8].scores[team]
  const xferM = ROUNDS[9].scores[xfer]
  if (type === 'profit') {
    const margin = 0.1 + RENT_MARGIN[rent] + TEAM_MARGIN[team]
    return (bizM * 0.22 + rentM * 0.28 + ageM * 0.18 + teamM * 0.18 + xferM * 0.14) * (0.88 + Math.max(0, margin - 0.08) * 1.2)
  }
  if (type === 'loss') {
    return rentM * 0.35 + xferM * 0.25 + bizM * 0.15 + ageM * 0.15 + teamM * 0.1
  }
  return bizM * 0.28 + ageM * 0.26 + rentM * 0.2 + teamM * 0.14 + xferM * 0.12
}

function calcValuation(shopType, answers) {
  const rev = cellIdxFrom(answers, 4)
  const area = cellIdxFrom(answers, 2)
  const city = cellIdxFrom(answers, 0)
  const loc = cellIdxFrom(answers, 3)
  const rep = cellIdxFrom(answers, 7)
  const ri = rev * 3 + tier3(area)
  const ci = tier3(city) * 9 + tier3(loc) * 3 + tier3(rep)
  let mid = RA[shopType][ri] * CTX[shopType][ci] * fineTune(shopType, answers)
  if (shopType === 'loss') mid *= 0.68
  if (shopType === 'prep') mid *= 0.82
  if (!answers.some((a) => a.auto)) mid *= 1.03
  mid = Math.max(5, Math.min(6000, mid))
  const spread = mid < 40 ? 4 : mid < 120 ? 8 : mid < 400 ? 15 : mid < 1000 ? 30 : 50
  const low = Math.max(3, Math.round(mid - spread))
  const high = Math.round(mid + spread)
  const tagList = shopType === 'loss' ? LOSS_TAGS : TAGS
  const hit = tagList.find((t) => mid >= t.min && mid < t.max) || tagList[tagList.length - 1]
  const dims = [
    { name: '位置', v: avgScores(answers, [3, 9]) },
    { name: '模型', v: avgScores(answers, [4, 5, 8]) },
    { name: '成本', v: avgScores(answers, [5, 6]) },
    { name: '线上', v: avgScores(answers, [7]) },
    { name: '团队', v: avgScores(answers, [8]) }
  ]
  return {
    low,
    high,
    mid: Math.round(mid),
    tag: hit.tag,
    quote: hit.quote,
    dims
  }
}

function avgScores(answers, indices) {
  const vals = indices.map((i) => {
    const a = answers.find((x) => x.round === i)
    return a ? a.score : 1
  })
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length
  return Math.min(100, Math.round((avg / 1.2) * 100))
}

function isHighResult(shopType, result) {
  if (!result) return false
  if (shopType === 'profit') return result.mid >= 350
  if (shopType === 'prep') return result.mid >= 200
  return result.mid >= 120
}

function buildShareText(shopType, result) {
  const range = result.low + '–' + result.high
  if (result.mid >= 800) {
    return '我的店娱乐估值约 ' + range + ' 万！（纯属娱乐）老板，你的店值多少？也来测一测 → 头大大'
  }
  if (isHighResult(shopType, result)) {
    return '刚测完，我的店娱乐估值约 ' + range + ' 万（娱乐向）。你也来测测 → 头大大 · 门店估值测评'
  }
  return '我刚测完，我的店娱乐估值约 ' + range + ' 万（纯属娱乐）。老板，你的店值多少？也来测一测 → 头大大 · 门店估值测评'
}

export { calcValuation, isHighResult, buildShareText }
