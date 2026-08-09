import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authCopy } from '../../app/localisation/authCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { login } from '../../services/AuthService.js'
import { Button } from '../../shared/ui/Button.jsx'

export function Login({ lang }) {
  const t = authCopy[lang]
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const continueWith = (method) => {
    login(method)
    navigate(ROUTE_PATHS.account)
  }

  const submit = (event) => {
    event.preventDefault()
    continueWith('email')
  }

  return (
    <main className="auth-page section-shell">
      <div className="auth-card">
        <span className="eyebrow"><i/>{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>

        <form className="auth-form" onSubmit={submit}>
          <div className="auth-field">
            <label htmlFor="auth-email">{t.emailLabel}</label>
            <input id="auth-email" type="text" dir="ltr" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPlaceholder} />
          </div>
          <div className="auth-field">
            <label htmlFor="auth-password">{t.passwordLabel}</label>
            <input id="auth-password" type="password" dir="ltr" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.passwordPlaceholder} />
            <a className="auth-forgot" href="#">{t.forgotPassword}</a>
          </div>
          <Button className="auth-submit" onClick={submit}>{t.continue}</Button>
        </form>

        <div className="auth-divider">{t.orDivider}</div>
        <div className="auth-alt-actions">
          <button onClick={() => continueWith('UAE Pass')}>{t.uaePass}</button>
          <button onClick={() => continueWith('mobile OTP')}>{t.otp}</button>
        </div>

        <p className="auth-footer-note">{t.noAccount}<a href="#" onClick={(e) => { e.preventDefault(); navigate(ROUTE_PATHS.register) }}>{t.register}</a></p>
      </div>
    </main>
  )
}
