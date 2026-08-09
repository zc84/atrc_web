import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { careerTestCopy } from '../../app/localisation/careerTestCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { getResultPathway, getSavedResult, resetTest, startOrResumeTest } from '../../services/CareerTestService.js'
import { Button } from '../../shared/ui/Button.jsx'
import { PathwayGlyph } from '../../shared/ui/icons.jsx'

export function CareerTestResult({ lang }) {
  const t = careerTestCopy[lang]
  const navigate = useNavigate()
  const [result] = useState(getSavedResult)

  if (!result || !result.primaryId) {
    return (
      <main className="career-test-empty section-shell">
        <h1>{t.noResultTitle}</h1>
        <p>{t.noResultText}</p>
        <Button to={ROUTE_PATHS.careerTest}>{t.backToTest}</Button>
      </main>
    )
  }

  const primary = getResultPathway(result.primaryId)
  const secondary = result.secondaryIds.map(getResultPathway).filter(Boolean)

  const retake = (event) => {
    event.preventDefault()
    resetTest()
    startOrResumeTest()
    navigate(ROUTE_PATHS.careerTestQuestions)
  }

  return (
    <main className="career-test-page section-shell">
      <section className="career-test-result-hero">
        <span className="eyebrow"><i/>{t.resultEyebrow}</span>
        <h2>{t.resultTitle}</h2>
      </section>

      <article className="career-test-result-card" style={{'--tone': primary.color}}>
        <b><PathwayGlyph type={primary.id}/></b>
        <span>{lang === 'ar' ? primary.arabicRole : primary.role}</span>
        <h3>{lang === 'ar' ? primary.arabicTitle : primary.title}</h3>
        <p>{primary.resultSummary[lang]}</p>
        <Button to={ROUTE_PATHS.pathways}>{t.viewPathway}</Button>
      </article>

      {secondary.length > 0 && (
        <section className="career-test-secondary">
          <h4>{t.secondaryTitle}</h4>
          <div className="career-test-secondary-grid">
            {secondary.map((pathway) => (
              <a href={ROUTE_PATHS.pathways} style={{'--tone': pathway.color}} key={pathway.id} onClick={(e) => { e.preventDefault(); navigate(ROUTE_PATHS.pathways) }}>
                <small>{lang === 'ar' ? pathway.arabicRole : pathway.role}</small>
                <p>{lang === 'ar' ? pathway.arabicTitle : pathway.title}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="career-test-result-actions">
        <Button to={ROUTE_PATHS.technologies}>{t.exploreTechnologies}</Button>
        <button className="career-test-link" onClick={retake}>{t.retakeTest}</button>
      </div>
    </main>
  )
}
