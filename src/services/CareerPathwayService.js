import { pathways } from '../data/index.js'

/**
 * Client-bundled implementation of the Career Pathway content contract (Epic W16).
 * Backed by src/data/pathways.js for the current client-only stage.
 */
export function listPathways() {
  return pathways
}

export function getPathwayById(pathwayId) {
  return pathways.find((pathway) => pathway.id === pathwayId) || null
}
