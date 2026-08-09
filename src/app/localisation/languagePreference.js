const STORAGE_KEY = 'atrc.language.v1'

export function getStoredLanguage(fallback = 'en') {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'en' || stored === 'ar' ? stored : fallback
  } catch {
    return fallback
  }
}

export function storeLanguage(lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Preference simply won't persist across visits if storage is unavailable.
  }
}
