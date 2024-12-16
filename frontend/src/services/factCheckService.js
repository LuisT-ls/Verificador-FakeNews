import { CONFIG } from '../config.js'

export class FactCheckService {
  static async checkFact(text) {
    try {
      const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(
        text
      )}&key=${CONFIG.API_KEYS.GOOGLE_FACT_CHECK}`
      const response = await fetch(url)
      const data = await response.json()

      return data.claims ? this.processFactCheckResults(data.claims) : null
    } catch (error) {
      console.error('Fact Check Error:', error)
      return null
    }
  }

  static processFactCheckResults(claims) {
    return claims.map(claim => ({
      type: 'fact_check',
      text: claim.text,
      rating: claim.claimReview[0]?.textualRating || 'Não verificado',
      source: claim.claimReview[0]?.publisher?.name || 'Fonte desconhecida'
    }))
  }
}
