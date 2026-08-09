import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { authCopy } from '../../app/localisation/authCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { isAuthenticated, logout } from '../../services/AuthService.js'
import { Button } from '../../shared/ui/Button.jsx'

export function Account({ lang }) {
  const t = authCopy[lang]
  const navigate = useNavigate()
  const [authed] = useState(isAuthenticated)

  if (!authed) {
    return <Navigate to={ROUTE_PATHS.login} replace />
  }

  const signOut = () => {
    logout()
    navigate(ROUTE_PATHS.home)
  }

  return (
    <main className="auth-page section-shell">
      <div className="auth-card">
        <span className="eyebrow"><i/>{t.accountEyebrow}</span>
        <h1>{t.accountTitle}</h1>
        <p>{t.accountText}</p>

        <div className="auth-actions-row">
          <Button to={ROUTE_PATHS.home}>{t.backHome}</Button>
          <button className="career-test-link" onClick={signOut}>{t.logout}</button>
        </div>
      </div>
    </main>
  )
}
