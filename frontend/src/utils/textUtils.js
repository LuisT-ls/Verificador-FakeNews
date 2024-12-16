import { CONFIG } from '../config.js'

export const TextUtils = {
  sanitizeText(text) {
    return text.trim().replace(/<[^>]+>/g, '')
  },

  hasRedFlags(text) {
    return CONFIG.SUSPICIOUS_PATTERNS.some(pattern => pattern.test(text))
  },

  validateTextLength(text, maxLength = CONFIG.MAX_TEXT_LENGTH) {
    return text.length <= maxLength
  }
}
