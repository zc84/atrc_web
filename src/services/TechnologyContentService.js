import { technologies } from '../data/index.js'

/**
 * Client-bundled implementation of the Technology content contract (Epic W16).
 * Backed by src/data/technologies.js for the current client-only stage;
 * a future TechnologyContentService implementation can source the same
 * shape from a CMS/API without changing callers.
 */
export function listTechnologies() {
  return technologies
}

export function getTechnologyById(technologyId) {
  return technologies.find((technology) => technology.id === technologyId) || null
}

export function getRelatedTechnologies(technologyId) {
  const technology = getTechnologyById(technologyId)
  const relatedIds = technology?.detail?.relatedTechnologies || []
  return relatedIds.map(getTechnologyById).filter(Boolean)
}
