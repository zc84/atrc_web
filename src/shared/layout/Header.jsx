import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { copy } from '../../app/localisation/copy.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { iphoneCopy } from '../../app/localisation/iphoneCopy.jsx'
import { ROUTE_PATHS, iphonePathForWebPath } from '../../app/routing/routes.js'
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
    navigate(iphonePathForWebPath(location.pathname))
    window.scrollTo(0, 0)
  }

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="header-primary">
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
            <Button variant="outline" to={accountRoute} onClick={closeMenu} showIcon={false}>{accountLabel}</Button>
            <Button to={ROUTE_PATHS.careerTest} onClick={closeMenu} showIcon={false}>{t.quiz}</Button>
          </div>
        </nav>
      </div>
      <div className="header-actions">
        <div className="header-utility" aria-label={lang === 'ar' ? 'أدوات الموقع' : 'Site utilities'}>
          <button className="phone-launch" onClick={openIphone} aria-label={iphoneCopy[lang].open} title={iphoneCopy[lang].open}><PhoneIcon/></button>
        </div>
        <Button className="header-account" variant="outline" to={accountRoute} showIcon={false}>{accountLabel}</Button>
        <Button className="header-cta" to={ROUTE_PATHS.careerTest} showIcon={false}>{t.quiz}</Button>
        <button className={`menu-toggle ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={uiCopy[lang].toggleMenu}><i/><i/></button>
        <button className="language header-language" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label={uiCopy[lang].switchLanguage}>{lang === 'en' ? 'AR' : 'EN'}</button>
      </div>
    </header>
  )
}
