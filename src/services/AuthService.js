/**
 * Client-only implementation of the Auth contract (Epic W5, Epic W16).
 *
 * Per Section 9.1: credential validation is intentionally not implemented in
 * the current client-only stage. Selecting Login/Continue always opens the
 * authenticated client area regardless of field contents, and no request is
 * sent to a backend authentication service. This module only tracks client
 * navigation/session state; a future connected AuthService can replace it
 * without redesigning the UI.
 */
const STORAGE_KEY = 'atrc.auth.v1'

function readState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Browser storage unavailable — session simply will not persist across visits.
  }
}

export function isAuthenticated() {
  return Boolean(readState()?.isAuthenticated)
}

export function login(method = 'email') {
  writeState({ isAuthenticated: true, method })
  return { isAuthenticated: true, method }
}

export function logout() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
}
