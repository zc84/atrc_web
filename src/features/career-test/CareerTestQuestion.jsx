import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { careerTestCopy } from '../../app/localisation/careerTestCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { completeTest, getProgress, goToIndex, listQuestions, saveAnswer, startOrResumeTest } from '../../services/CareerTestService.js'

export function CareerTestQuestion({ lang }) {
  const t = careerTestCopy[lang]
  const navigate = useNavigate()
  const questions = listQuestions()
  const [progress, setProgress] = useState(() => getProgress() || startOrResumeTest())

  const { currentIndex, answers } = progress
  const question = questions[currentIndex]
  const selectedOptionId = answers[question.id]
  const isLast = currentIndex === questions.length - 1

  const selectOption = (optionId) => {
    const nextAnswers = saveAnswer(question.id, optionId)
    setProgress({ ...progress, answers: nextAnswers })
  }

  const goPrevious = () => {
    const nextIndex = goToIndex(currentIndex - 1)
    setProgress({ ...progress, currentIndex: nextIndex })
  }

  const goNext = () => {
    if (isLast) {
      completeTest()
      navigate(ROUTE_PATHS.careerTestResult)
      return
    }
    const nextIndex = goToIndex(currentIndex + 1)
    setProgress({ ...progress, currentIndex: nextIndex })
  }

  return (
    <main className="career-test-page section-shell">
      <div className="career-test-progress">
        <div className="career-test-progress-label">
          <span>{t.questionProgress(currentIndex + 1, questions.length)}</span>
        </div>
        <div className="career-test-progress-bar"><i style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}/></div>
      </div>

      <section className="career-test-question">
        <h2>{question.prompt[lang]}</h2>
        <div className="career-test-options" role="group" aria-label={question.prompt[lang]}>
          {question.options.map((option) => (
            <button
              key={option.id}
              className={selectedOptionId === option.id ? 'is-selected' : ''}
              aria-pressed={selectedOptionId === option.id}
              onClick={() => selectOption(option.id)}
            >
              {option.label[lang]}
            </button>
          ))}
        </div>

        <div className="career-test-nav">
          <button onClick={goPrevious} disabled={currentIndex === 0}>{t.previous}</button>
          <button onClick={goNext} disabled={!selectedOptionId}>{isLast ? t.seeResults : t.next}</button>
        </div>
      </section>
    </main>
  )
}
