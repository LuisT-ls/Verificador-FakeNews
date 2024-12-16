export const CONFIG = {
  MAX_TEXT_LENGTH: 500,
  API_KEYS: {
    GOOGLE_FACT_CHECK: process.env.GOOGLE_FACT_CHECK_API_KEY,
    NEWS_API: process.env.NEWS_API_KEY
  },
  SUSPICIOUS_PATTERNS: [
    /inacredit[áa]vel/i,
    /segredo revelado/i,
    /urgente/i,
    /voc[êe] n[ãa]o vai acreditar/i,
    /verdade oculta/i,
    /exclusivo/i,
    /segredo/i,
    /milagre/i,
    /impactante/i
  ],
  VERIFICATION_RATINGS: {
    default: {
      Falso: { class: 'false-rating', risk: 'high' },
      Verdadeiro: { class: 'true-rating', risk: 'low' },
      'Parcialmente Verdadeiro': { class: 'partial-rating', risk: 'medium' }
    }
  }
}
