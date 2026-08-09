import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerCopy } from '../../app/localisation/registerCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { curricula, emirates, grades } from '../../data/registrationOptions.js'
import { login } from '../../services/AuthService.js'
import { saveProfile } from '../../services/ProfileService.js'
import { Button } from '../../shared/ui/Button.jsx'

const ROLES = ['student', 'parent', 'educator', 'other']

export function Register({ lang }) {
  const t = registerCopy[lang]
  const navigate = useNavigate()
  const [role, setRole] = useState(null)
  const [gender, setGender] = useState(null)

  const roleLabel = { student: t.roleStudent, parent: t.roleParent, educator: t.roleEducator, other: t.roleOther }
  const roleText = { student: t.roleStudentText, parent: t.roleParentText, educator: t.roleEducatorText, other: t.roleOtherText }

  const submit = (event) => {
    event.preventDefault()
    const form = new FormData(event.target.closest('form'))
    saveProfile({
      role,
      gender,
      firstName: form.get('firstName') || '',
      lastName: form.get('lastName') || '',
      birthYear: form.get('birthYear') || '',
      email: form.get('email') || '',
      mobile: form.get('mobile') || '',
      nationality: form.get('nationality') || '',
      emirate: form.get('emirate') || '',
      grade: form.get('grade') || '',
      curriculum: form.get('curriculum') || '',
    })
    login('registration')
    navigate(ROUTE_PATHS.account)
  }

  if (!role) {
    return (
      <main className="register-page section-shell">
        <div className="register-hero">
          <span className="eyebrow"><i/>{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.intro}</p>
        </div>
        <div className="register-roles-grid">
          {ROLES.map((roleId) => (
            <article
              key={roleId}
              className={`register-role-card ${roleId === 'student' ? '' : 'is-disabled'}`}
              onClick={roleId === 'student' ? () => setRole(roleId) : undefined}
              role={roleId === 'student' ? 'button' : undefined}
              tabIndex={roleId === 'student' ? 0 : undefined}
            >
              <h3>{roleLabel[roleId]}</h3>
              <p>{roleText[roleId]}</p>
              {roleId !== 'student' && <small>{t.comingSoon}</small>}
            </article>
          ))}
        </div>
        <p className="auth-footer-note" style={{ marginTop: 40 }}>{t.alreadyHaveAccount}<a href="#" onClick={(e) => { e.preventDefault(); navigate(ROUTE_PATHS.login) }}>{t.login}</a></p>
      </main>
    )
  }

  return (
    <main className="register-page section-shell">
      <form className="register-form-card" onSubmit={submit}>
        <div className="register-hero" style={{ marginBottom: 0 }}>
          <span className="eyebrow"><i/>{roleLabel[role]}</span>
          <h1>{t.title}</h1>
        </div>

        <h2 className="register-section-title">{t.accountInfoTitle}</h2>
        <div className="register-grid">
          <div className="auth-field"><label>{t.firstName}</label><input name="firstName" dir="auto" /></div>
          <div className="auth-field"><label>{t.lastName}</label><input name="lastName" dir="auto" /></div>
          <div className="auth-field"><label>{t.birthYear}</label><input name="birthYear" type="number" dir="ltr" /></div>
          <div className="auth-field"><label>{t.mobile}</label><input name="mobile" type="tel" dir="ltr" /></div>
          <div className="auth-field span-2"><label>{t.email}</label><input name="email" type="email" dir="ltr" /></div>
          <div className="auth-field span-2"><label>{t.password}</label><input name="password" type="password" dir="ltr" /></div>
        </div>

        <h2 className="register-section-title">{t.studentInfoTitle}</h2>
        <div className="register-grid">
          <div className="auth-field span-2">
            <label>{t.gender}</label>
            <div className="register-radio-row">
              <button type="button" className={gender === 'male' ? 'is-selected' : ''} onClick={() => setGender('male')}>{t.genderMale}</button>
              <button type="button" className={gender === 'female' ? 'is-selected' : ''} onClick={() => setGender('female')}>{t.genderFemale}</button>
            </div>
          </div>
          <div className="auth-field"><label>{t.nationality}</label><input name="nationality" dir="auto" /></div>
          <div className="auth-field">
            <label>{t.emirate}</label>
            <select name="emirate" defaultValue="">
              <option value="" disabled></option>
              {emirates.map((item) => <option key={item.id} value={item.id}>{item[lang]}</option>)}
            </select>
          </div>
          <div className="auth-field">
            <label>{t.grade}</label>
            <select name="grade" defaultValue="">
              <option value="" disabled></option>
              {grades.map((item) => <option key={item.id} value={item.id}>{item[lang]}</option>)}
            </select>
          </div>
          <div className="auth-field">
            <label>{t.curriculum}</label>
            <select name="curriculum" defaultValue="">
              <option value="" disabled></option>
              {curricula.map((item) => <option key={item.id} value={item.id}>{item[lang]}</option>)}
            </select>
          </div>
        </div>

        <label className="register-consent"><input type="checkbox" name="consent" />{t.consent}</label>

        <Button className="auth-submit" onClick={submit}>{t.createAccount}</Button>
        <a className="register-back" href="#" onClick={(e) => { e.preventDefault(); setRole(null) }}>{t.backToRoles}</a>
      </form>
    </main>
  )
}
