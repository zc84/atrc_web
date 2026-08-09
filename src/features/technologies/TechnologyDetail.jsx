import { Link, useParams } from 'react-router-dom'
import { copy } from '../../app/localisation/copy.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { ROUTE_PATHS, technologyDetailPath } from '../../app/routing/routes.js'
import { listPathways } from '../../services/CareerPathwayService.js'
import { getRelatedTechnologies, getTechnologyById } from '../../services/TechnologyContentService.js'
import { Button } from '../../shared/ui/Button.jsx'
import { ArrowIcon, TechGlyph } from '../../shared/ui/icons.jsx'

function localised(field, lang) {
  return field ? field[lang] : null
}

export function TechnologyDetail({ lang }) {
  const { technologyId } = useParams()
  const ui = uiCopy[lang]
  const technology = getTechnologyById(technologyId)

  if (!technology) {
    return (
      <main className="tech-detail-not-found section-shell">
        <h1>{ui.technologyNotFound}</h1>
        <p>{ui.technologyNotFoundText}</p>
        <Button to={ROUTE_PATHS.technologies}>{ui.backToCatalogue}</Button>
      </main>
    )
  }

  const detail = technology.detail
  const title = lang === 'ar' ? technology.arabic : technology.title
  const description = lang === 'ar' ? technology.arabicDescription : technology.description
  const category = lang === 'ar' ? technology.arabicCategory : technology.category
  const related = getRelatedTechnologies(technology.id)
  const relatedPathways = (detail?.relatedPathways || [])
    .map((pathwayId) => listPathways().find((pathway) => pathway.id === pathwayId))
    .filter(Boolean)

  return (
    <main className="tech-detail-page" style={{'--tech-tone': technology.color}}>
      <div className="section-shell tech-detail-top">
        <Link className="tech-detail-back" to={ROUTE_PATHS.technologies}><i><ArrowIcon/></i><span>{ui.backToCatalogue}</span></Link>
      </div>

      <section className="tech-detail-hero section-shell">
        <div className="catalogue-kicker"><span>{technology.number} / 08</span><span>{category}</span></div>
        <h1>{title}</h1>
        <p>{description}</p>
        {detail?.keySubjects && (
          <div className="tech-detail-chip-row">
            {localised(detail.keySubjects, lang).map((subject) => <span key={subject}>{subject}</span>)}
          </div>
        )}
      </section>

      {detail && (
        <>
          <section className="tech-detail-intro section-shell">
            <article>
              <span className="eyebrow"><i/>{ui.introduction}</span>
              <p>{localised(detail.introduction, lang)}</p>
            </article>
            <article>
              <span className="eyebrow"><i/>{ui.whyItMatters}</span>
              <p>{localised(detail.whyItMatters, lang)}</p>
            </article>
          </section>

          <section className="tech-detail-accordion section-shell">
            <details open>
              <summary>{ui.technologyDomains}</summary>
              <div className="tech-detail-accordion-body">
                <h4>{ui.technologyDomains}</h4>
                <ul>{localised(detail.domains, lang).map((domain) => <li key={domain}>{domain}</li>)}</ul>
                <h4>{ui.technologyGoals}</h4>
                <p>{localised(detail.goals, lang)}</p>
              </div>
            </details>

            <details>
              <summary>{ui.educationRequirements}</summary>
              <div className="tech-detail-accordion-body">
                <p>{localised(detail.educationRequirements, lang)}</p>
                <h4>{ui.qualificationLevels}</h4>
                <ul>{localised(detail.qualificationLevels, lang).map((level) => <li key={level}>{level}</li>)}</ul>
              </div>
            </details>

            <details>
              <summary>{ui.professions}</summary>
              <div className="tech-detail-accordion-body">
                <div className="tech-detail-professions">
                  {detail.professions.map((profession) => (
                    <article className="tech-detail-profession-card" key={localised(profession.title, 'en')}>
                      <h5>{localised(profession.title, lang)}</h5>
                      <p>{localised(profession.description, lang)}</p>
                      <h4>{ui.responsibilities}</h4>
                      <ul>{localised(profession.responsibilities, lang).map((item) => <li key={item}>{item}</li>)}</ul>
                      <h4>{ui.requiredQualifications}</h4>
                      <p>{localised(profession.requiredQualifications, lang)}</p>
                    </article>
                  ))}
                </div>
              </div>
            </details>

            <details>
              <summary>{ui.studyRoutes}</summary>
              <div className="tech-detail-accordion-body">
                <ul style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                  {localised(detail.studyRoutes, lang).map((step, index) => (
                    <li key={step} style={{border: 0, padding: '4px 0'}}>{index + 1}. {step}</li>
                  ))}
                </ul>
                <div className="tech-detail-accordion-columns">
                  <div>
                    <h4>{ui.universitiesUae}</h4>
                    <ul>{detail.universities.uae.map((u) => <li key={u}>{u}</li>)}</ul>
                  </div>
                  <div>
                    <h4>{ui.universitiesGlobal}</h4>
                    <ul>{detail.universities.global.map((u) => <li key={u}>{u}</li>)}</ul>
                  </div>
                </div>
              </div>
            </details>

            <details>
              <summary>{ui.recommendedProgrammes}</summary>
              <div className="tech-detail-accordion-body">
                <h4>{ui.recommendedProgrammes}</h4>
                <ul>{localised(detail.recommendedProgrammes, lang).map((item) => <li key={item}>{item}</li>)}</ul>
                <h4>{ui.competitions}</h4>
                <ul>{localised(detail.competitions, lang).map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </details>
          </section>
        </>
      )}

      {(related.length > 0 || relatedPathways.length > 0) && (
        <section className="tech-detail-related section-shell">
          {related.length > 0 && (
            <>
              <h2>{ui.relatedTechnologies}</h2>
              <div className="tech-detail-related-grid">
                {related.map((item) => (
                  <Link className="tech-detail-related-card" to={technologyDetailPath(item.id)} style={{'--tone': item.color}} key={item.id}>
                    <i><TechGlyph type={item.icon}/></i>
                    <span>{lang === 'ar' ? item.arabic : item.title}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
          {relatedPathways.length > 0 && (
            <>
              <h2>{ui.relatedPathways}</h2>
              <div className="tech-detail-pathway-chips">
                {relatedPathways.map((pathway) => (
                  <Link to={ROUTE_PATHS.pathways} key={pathway.id}>{lang === 'ar' ? pathway.arabicTitle : pathway.title}</Link>
                ))}
              </div>
            </>
          )}
        </section>
      )}

      <section className="technology-cta section-shell" style={{'--page-tone': technology.color}}>
        <span className="eyebrow"><i/>{ui.findMatch}</span>
        <h2>{ui.techQuestion}</h2>
        <Button to={ROUTE_PATHS.careerTest}>{copy[lang].quiz}</Button>
      </section>
    </main>
  )
}
