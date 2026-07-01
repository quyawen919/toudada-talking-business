/**
 * 线索后台配置
 * 飞书方案：填 feishuWebhookUrl（自动化 Webhook 地址）+ feishuTableUrl（表格链接）
 */
export const LEADS_CONFIG = {
  /** 飞书群机器人 Webhook（客户填表 → 群里收消息） */
  feishuWebhookUrl:
    'https://open.feishu.cn/open-apis/bot/v2/hook/dcacfb10-6a9f-4ea7-ab3c-d0727e9af6b1',
  feishuTableUrl:
    'https://my.feishu.cn/wiki/P34cwa6fPiFuHSkwjc5cGddfnRD?table=tblnczMzQaLlLGqj&view=vewe7uujDk',

  submitUrl: '',
  adminListUrl: '',
  accessToken: ''
}

export function feishuBackendReady() {
  return !!(LEADS_CONFIG.feishuWebhookUrl && LEADS_CONFIG.feishuWebhookUrl.trim())
}

export function cloudBackendReady() {
  return !!(LEADS_CONFIG.submitUrl && LEADS_CONFIG.accessToken)
}

export function leadsBackendReady() {
  return feishuBackendReady() || cloudBackendReady()
}
