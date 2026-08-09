import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { careerTestCopy } from '../../app/localisation/careerTestCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { getProgress, getSavedResult, resetTest, startOrResumeTest } from '../../services/CareerTestService.js'
import { Button } from '../../shared/ui/Button.jsx'

export function CareerTestLanding({ lang }) {
  const t = careerTestCopy[lang]
  const navigate = useNavigate()
  const [progress] = useState(getProgress)
  const [savedResult] = useState(getSavedResult)

  const startTest = (event) => {
    event.preventDefault()
    startOrResumeTest()
    navigate(ROUTE_PATHS.careerTestQuestions)
  }

  const startOver = (event) => {
    event.preventDefault()
    resetTest()
    startOrResumeTest()
    navigate(ROUTE_PATHS.careerTestQuestions)
  }

  return (
    <main className="career-test-page section-shell">
      <section className="career-test-hero">
        <span className="eyebrow"><i/>{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </section>

      <ol className="career-test-instructions">
        {t.instructions.map((step) => <li key={step}>{step}</li>)}
      </ol>

      <div className="career-test-actions">
        <Button onClick={startTest}>{progress ? t.resumeTest : t.startTest}</Button>
        {progress && <button className="career-test-link" onClick={startOver}>{t.startOver}</button>}
        {savedResult && <Button variant="outline" to={ROUTE_PATHS.careerTestResult}>{t.viewLastResult}</Button>}
      </div>
    </main>
  )
}
