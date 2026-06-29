/**
 * 门店估值测评 H5 地址
 * 部署 prototypes/store-valuator-game/ 到已备案域名后填入，并在小程序后台配置业务域名
 */
import { getGameById } from './game-catalog.js'

const GAME_H5_URL = ''

const GAME_SHARE_DEFAULT = {
  title: '头大大 · 测测 · 你的店值多少？',
  timelineTitle: '头大大测测 · 门店估值等娱乐测评',
  imageUrl: '/images/about/portrait.jpg'
}

function buildShareFromResult(payload) {
  if (!payload || !payload.mid) {
    const store = getGameById('store')
    return {
      title: store ? store.title + ' · 纯属娱乐' : GAME_SHARE_DEFAULT.title,
      timelineTitle: GAME_SHARE_DEFAULT.timelineTitle,
      imageUrl: GAME_SHARE_DEFAULT.imageUrl
    }
  }
  const mid = payload.mid
  const range = payload.low + '–' + payload.high
  if (mid >= 800) {
    return {
      title: '我的店娱乐估值约 ' + range + ' 万！你也来测测？',
      timelineTitle: '我的店估值 ' + range + ' 万（娱乐）· 老板你的店值多少？',
      imageUrl: GAME_SHARE_DEFAULT.imageUrl
    }
  }
  if (mid >= 350) {
    return {
      title: '刚测完，我的店约 ' + range + ' 万 · 纯属娱乐，你也来？',
      timelineTitle: '门店娱乐估值 ' + range + ' 万 · 点进来测你的店',
      imageUrl: GAME_SHARE_DEFAULT.imageUrl
    }
  }
  return {
    title: '测测你的店值多少？我刚估完约 ' + range + ' 万（娱乐）',
    timelineTitle: GAME_SHARE_DEFAULT.timelineTitle,
    imageUrl: GAME_SHARE_DEFAULT.imageUrl
  }
}

export {
  GAME_H5_URL,
  GAME_SHARE_DEFAULT,
  buildShareFromResult
}
