export const DOMUtils = {
  MAX_TEXT_LENGTH: 500,
  updateCharCount(input, countElement) {
    const currentLength = input.value.length
    countElement.textContent = `${currentLength}/${this.MAX_TEXT_LENGTH}`
    countElement.style.color = currentLength > 450 ? 'red' : ''
  },

  showResult(resultElement, message, type = 'info') {
    const typeStyles = {
      success: 'green',
      warning: 'orange',
      error: 'red',
      info: 'black'
    }

    resultElement.innerHTML = message
    resultElement.style.color = typeStyles[type] || 'black'
    resultElement.setAttribute('aria-live', 'polite')
  },

  toggleLoading(loadingSpinner, checkButton, isLoading) {
    loadingSpinner.style.display = isLoading ? 'block' : 'none'
    checkButton.disabled = isLoading
  },

  updateSourcesList(sourceListElement, sources) {
    sourceListElement.innerHTML = sources
      .map(source => `<li>${source.type}: ${source.name}</li>`)
      .join('')
  }
}
