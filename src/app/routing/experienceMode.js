const RETURN_PATH_KEY = 'atrc.web.returnPath'

export function rememberWebReturnPath(path) {
  try {
    window.sessionStorage.setItem(RETURN_PATH_KEY, path)
  } catch {
    // sessionStorage unavailable — Return to Web falls back to home.
  }
}

export function getWebReturnPath(fallback = '/') {
  try {
    return window.sessionStorage.getItem(RETURN_PATH_KEY) || fallback
  } catch {
    return fallback
  }
}
