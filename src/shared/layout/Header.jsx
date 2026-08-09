import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { copy } from '../../app/localisation/copy.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { iphoneCopy } from '../../app/localisation/iphoneCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { rememberWebReturnPath } from '../../app/routing/experienceMode.js'
import { isAuthenticated } from '../../services/AuthService.js'
import { Logo } from '../ui/Logo.jsx'
import { Button } from '../ui/Button.jsx'
import { PhoneIcon } from '../ui/icons.jsx'

export function Header({ lang, setLang }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const t = copy[lang]
  const accountRoute = isAuthenticated() ? ROUTE_PATHS.account : ROUTE_PATHS.login
  const accountLabel = isAuthenticated() ? t.myAccount : t.login

  const openIphone = () => {
    rememberWebReturnPath(location.pathname + location.search)
    setOpen(false)
    navigate(ROUTE_PATHS.iphoneHome)
    window.scrollTo(0, 0)
  }

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <Logo lang={lang} />
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label={uiCopy[lang].mainNavigation}>
        {t.nav.map((item) => (
          <a
            key={item.route}
            className={location.pathname === ROUTE_PATHS[item.route] ? 'active' : ''}
            href={ROUTE_PATHS[item.route]}
            onClick={(e) => { e.preventDefault(); navigate(ROUTE_PATHS[item.route]); closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            {item.label}
          </a>
        ))}
        <div className="mobile-actions">
          <button className="mobile-phone-action" onClick={openIphone}><PhoneIcon/><span>{iphoneCopy[lang].open}</span></button>
          <Button variant="outline" to={accountRoute} onClick={closeMenu}>{accountLabel}</Button><Button to={ROUTE_PATHS.careerTest} onClick={closeMenu}>{t.quiz}</Button>
        </div>
      </nav>
      <div className="header-actions">
        <button className="language" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label={uiCopy[lang].switchLanguage}>{lang === 'en' ? 'AR' : 'EN'}</button>
        <button className="phone-launch" onClick={openIphone} aria-label={iphoneCopy[lang].open} title={iphoneCopy[lang].open}><PhoneIcon/></button>
        <Button variant="outline" to={accountRoute}>{accountLabel}</Button>
        <Button to={ROUTE_PATHS.careerTest}>{t.quiz}</Button>
        <button className={`menu-toggle ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={uiCopy[lang].toggleMenu}><i/><i/></button>
      </div>
    </header>
  )
}
