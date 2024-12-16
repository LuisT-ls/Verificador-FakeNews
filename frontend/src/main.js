import { CONFIG } from './config.js'
import { DOMUtils } from './utils/domUtils.js'
import { TextUtils } from './utils/textUtils.js'
import { VerificationService } from './services/verificationService.js'

class FakeNewsVerifier {
  constructor() {
    this.initializeElements()
    this.attachEventListeners()
  }

  initializeElements() {
    this.newsInput = document.getElementById('newsInput')
    this.charCountSpan = document.getElementById('charCount')
    this.checkButton = document.getElementById('checkButton')
    this.resultDiv = document.getElementById('result')
    this.loadingSpinner = document.getElementById('loadingSpinner')
    this.sourceListElement = document.getElementById('source-list')
  }

  attachEventListeners() {
    this.newsInput.addEventListener('input', () =>
      DOMUtils.updateCharCount(this.newsInput, this.charCountSpan)
    )

    this.checkButton.addEventListener('click', () => this.verifyNews())
  }

  async verifyNews() {
    const text = TextUtils.sanitizeText(this.newsInput.value)

    try {
      if (!text) {
        throw new Error('Por favor, insira uma informação para verificar.')
      }

      if (TextUtils.hasRedFlags(text)) {
        DOMUtils.showResult(
          this.resultDiv,
          'Texto contém palavras típicas de fake news. Verifique com cautela.',
          'warning'
        )
      }

      DOMUtils.toggleLoading(this.loadingSpinner, this.checkButton, true)

      const verificationResults = await VerificationService.verifyContent(text)

      if (verificationResults.length > 0) {
        const resultHTML = this.formatVerificationResults(verificationResults)
        DOMUtils.showResult(this.resultDiv, resultHTML, 'success')
        this.updateSourcesList(verificationResults)
      } else {
        DOMUtils.showResult(
          this.resultDiv,
          'Nenhuma informação verificada. Sugere-se verificação manual adicional.',
          'warning'
        )
      }
    } catch (error) {
      DOMUtils.showResult(this.resultDiv, error.message, 'error')
    } finally {
      DOMUtils.toggleLoading(this.loadingSpinner, this.checkButton, false)
    }
  }

  formatVerificationResults(results) {
    return results
      .map(result => {
        switch (result.type) {
          case 'fact_check':
            return `
            <div class="verification-result">
              <strong>Classificação:</strong> 
              <span class="${
                CONFIG.VERIFICATION_RATINGS.default[result.rating]?.class ||
                'warning-rating'
              }">
                ${result.rating}
              </span>
              <p><strong>Informação:</strong> ${result.text}</p>
              <p><strong>Fonte:</strong> ${result.source}</p>
            </div>
          `
          case 'news_correlation':
            return `
            <div class="verification-result">
              <strong>Correlação de Notícias:</strong> 
              <p>Encontradas ${result.data.length} notícias relacionadas</p>
            </div>
          `
          default:
            return ''
        }
      })
      .join('')
  }

  updateSourcesList(results) {
    const sources = results.map(result => ({
      type:
        result.type === 'fact_check' ? 'Fact Check' : 'Correlação de Notícias',
      name: result.type === 'fact_check' ? result.source : 'Fonte de Notícias'
    }))

    DOMUtils.updateSourcesList(this.sourceListElement, sources)
  }
}

document.addEventListener('DOMContentLoaded', () => new FakeNewsVerifier())
