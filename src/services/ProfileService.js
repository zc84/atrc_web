/**
 * Client-only implementation of the Profile contract (Epic W6, Epic W16).
 * Registration and profile data are stored in versioned browser storage with
 * no backend call, per Section 4.2 rules 3 and 14. A future connected
 * ProfileService can replace this module without redesigning the UI.
 */
const STORAGE_KEY = 'atrc.profile.v1'

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
    // Browser storage unavailable — profile simply will not persist across visits.
  }
}

export function getProfile() {
  return readState()
}

export function saveProfile(profile) {
  writeState(profile)
  return profile
}

export function clearProfile() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
}
