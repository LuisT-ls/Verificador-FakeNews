import { FactCheckService } from './factCheckService.js'
import { NewsService } from './newsService.js'
import { TextUtils } from '../utils/textUtils.js'

export class VerificationService {
  static async verifyContent(text) {
    if (!TextUtils.validateTextLength(text)) {
      throw new Error('Texto excede o limite de caracteres')
    }

    const verificationSources = [
      FactCheckService.checkFact,
      NewsService.findRelatedNews
    ]

    const results = await Promise.allSettled(
      verificationSources.map(source => source(text))
    )

    return results
      .filter(result => result.status === 'fulfilled' && result.value !== null)
      .map(result => result.value)
  }
}
