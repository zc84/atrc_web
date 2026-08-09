import { careerTestQuestions } from '../data/index.js'
import { getPathwayById, listPathways } from './CareerPathwayService.js'

/**
 * Client-only implementation of the Career Test contract (Epic W4, Epic W16).
 * Questions, scoring and result presentation are computed entirely from
 * client-bundled data and versioned browser storage; a future
 * CareerTestService implementation backed by an external provider can
 * replace this module without changing the UI (Section 4.2, rule 4).
 */
const STORAGE_KEY = 'atrc.careerTest.v1'

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
    // Browser storage unavailable — progress simply will not persist across visits.
  }
}

export function listQuestions() {
  return careerTestQuestions
}

export function getProgress() {
  const state = readState()
  if (!state || state.completed) return null
  return { answers: state.answers || {}, currentIndex: state.currentIndex || 0 }
}

export function getSavedResult() {
  const state = readState()
  return state?.completed ? state.result : null
}

export function startOrResumeTest() {
  const existing = readState()
  if (existing && !existing.completed) return { answers: existing.answers || {}, currentIndex: existing.currentIndex || 0 }
  const fresh = { answers: {}, currentIndex: 0, completed: false, result: null }
  writeState(fresh)
  return { answers: fresh.answers, currentIndex: fresh.currentIndex }
}

export function saveAnswer(questionId, optionId) {
  const state = readState() || { answers: {}, currentIndex: 0, completed: false, result: null }
  const nextState = { ...state, answers: { ...state.answers, [questionId]: optionId }, completed: false, result: null }
  writeState(nextState)
  return nextState.answers
}

export function goToIndex(index) {
  const state = readState() || { answers: {}, currentIndex: 0, completed: false, result: null }
  const nextState = { ...state, currentIndex: Math.max(0, Math.min(index, careerTestQuestions.length - 1)) }
  writeState(nextState)
  return nextState.currentIndex
}

function scoreAnswers(answers) {
  const scores = {}
  for (const question of careerTestQuestions) {
    const optionId = answers[question.id]
    const option = question.options.find((item) => item.id === optionId)
    if (!option) continue
    for (const [pathwayId, points] of Object.entries(option.scores)) {
      scores[pathwayId] = (scores[pathwayId] || 0) + points
    }
  }
  return scores
}

export function completeTest() {
  const state = readState() || { answers: {} }
  const scores = scoreAnswers(state.answers)
  const ranked = listPathways()
    .map((pathway) => ({ pathwayId: pathway.id, score: scores[pathway.id] || 0 }))
    .sort((a, b) => b.score - a.score)

  const result = {
    primaryId: ranked[0]?.pathwayId || null,
    secondaryIds: ranked.slice(1, 3).map((item) => item.pathwayId),
    scores,
    completedAt: state.completedAt || null,
  }

  writeState({ ...state, completed: true, result })
  return result
}

export function resetTest() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
}

export function getResultPathway(pathwayId) {
  return getPathwayById(pathwayId)
}
