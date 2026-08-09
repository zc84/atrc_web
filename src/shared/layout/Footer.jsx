import { useNavigate } from 'react-router-dom'
import { copy } from '../../app/localisation/copy.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { Logo } from '../ui/Logo.jsx'
import { ArrowIcon } from '../ui/icons.jsx'

export function Footer({ lang }) {
  const ui = uiCopy[lang]
  const navigate = useNavigate()
  const footerLinks = copy[lang].nav.slice(0, 4).map(({ label, route }) => [label, route])
  const supportLinks = [[ui.about, 'enablement'], [ui.contact, 'opportunities'], [ui.faq, 'planner'], [ui.usefulMaterials, 'technologies']]
  const legalLinks = [[ui.privacy, 'https://www.atrc.gov.ae/'], [ui.terms, 'https://www.atrc.gov.ae/'], [ui.accessibility, 'https://www.atrc.gov.ae/']]
  const goTo = (event, route) => { event.preventDefault(); navigate(ROUTE_PATHS[route]); window.scrollTo(0, 0) }
  return (
    <footer className="site-footer section-shell">
      <div className="footer-desktop">
        <div className="footer-bar">
          <Logo lang={lang}/>
          <nav className="footer-essential-links" aria-label={ui.footerNavigation}>
            {footerLinks.map(([label, route]) => <a key={route} href={ROUTE_PATHS[route]} onClick={(e) => goTo(e, route)}>{label}</a>)}
          </nav>
          <a className="footer-atrc-link" href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer"><span>{ui.ecosystem}</span><i><ArrowIcon diagonal/></i></a>
        </div>
        <div className="footer-meta">
          <span>{lang === 'ar' ? '© منصة مواهب ATRC 2026' : '© ATRC Talent Platform 2026'}</span>
          <span>{ui.location}</span>
          <div>{legalLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}</div>
        </div>
      </div>

      <div className="footer-mobile">
        <div className="footer-top"><Logo lang={lang}/><p>{ui.footerTagline}</p><a href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer">{ui.visitAtrc} <ArrowIcon diagonal/></a></div>
        <div className="footer-links"><div><small>{ui.exploreGroup}</small>{footerLinks.map(([label, route]) => <a key={route} href={ROUTE_PATHS[route]} onClick={(e) => goTo(e, route)}>{label}</a>)}</div><div><small>{ui.supportGroup}</small>{supportLinks.map(([label, route]) => <a key={label} href={ROUTE_PATHS[route]} onClick={(e) => goTo(e, route)}>{label}</a>)}</div><div><small>{ui.legalGroup}</small>{legalLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>)}</div></div>
        <div className="footer-bottom"><span>{lang === 'ar' ? '© منصة مواهب ATRC 2026' : '© ATRC Talent Platform 2026'}</span><span>{ui.location}</span></div>
      </div>
    </footer>
  )
}
