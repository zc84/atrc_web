import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { routeTitles } from './app/localisation/routeTitles.js'
import { getStoredLanguage, storeLanguage } from './app/localisation/languagePreference.js'
import { ROUTE_PATHS } from './app/routing/routes.js'
import { Header } from './shared/layout/Header.jsx'
import { Footer } from './shared/layout/Footer.jsx'
import { Home } from './features/home/Home.jsx'
import { Technologies } from './features/technologies/Technologies.jsx'
import { TechnologyDetail } from './features/technologies/TechnologyDetail.jsx'
import { InternalPage } from './features/overview/InternalPage.jsx'
import { IPhoneHome } from './features/iphone-shell/IPhoneHome.jsx'
import { CareerTestLanding } from './features/career-test/CareerTestLanding.jsx'
import { CareerTestQuestion } from './features/career-test/CareerTestQuestion.jsx'
import { CareerTestResult } from './features/career-test/CareerTestResult.jsx'
import { Login } from './features/account/Login.jsx'
import { Register } from './features/account/Register.jsx'
import { Account } from './features/account/Account.jsx'

function routeKeyFromPathname(pathname) {
  if (pathname === ROUTE_PATHS.pathways) return 'pathways'
  if (pathname === ROUTE_PATHS.opportunities) return 'opportunities'
  if (pathname === ROUTE_PATHS.enablement) return 'enablement'
  if (pathname === ROUTE_PATHS.planner) return 'planner'
  if (pathname.startsWith('/technologies/')) return 'technologyDetail'
  if (pathname === ROUTE_PATHS.technologies) return 'technologies'
  if (pathname.startsWith('/career-test')) return 'careerTest'
  if (pathname === ROUTE_PATHS.login) return 'login'
  if (pathname === ROUTE_PATHS.register) return 'register'
  if (pathname === ROUTE_PATHS.account) return 'account'
  if (pathname === ROUTE_PATHS.iphoneHome) return 'iphoneHome'
  return 'home'
}

function DocumentTitle({ lang }) {
  const location = useLocation()
  useEffect(() => {
    const key = routeKeyFromPathname(location.pathname)
    document.title = routeTitles[lang][key] || routeTitles[lang].home
  }, [location.pathname, lang])
  return null
}

function WebLayout({ lang, setLang, children }) {
  return (
    <div className="app">
      <Header lang={lang} setLang={setLang} />
      {children}
      <Footer lang={lang} />
    </div>
  )
}

export default function App() {
  const [lang, setLangState] = useState(getStoredLanguage)

  const setLang = (nextLang) => {
    storeLanguage(nextLang)
    setLangState(nextLang)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <>
      <DocumentTitle lang={lang} />
      <Routes>
        <Route path={ROUTE_PATHS.iphoneHome} element={<div className="app app--iphone"><IPhoneHome lang={lang} setLang={setLang} /></div>} />
        <Route path={ROUTE_PATHS.home} element={<WebLayout lang={lang} setLang={setLang}><Home lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.technologies} element={<WebLayout lang={lang} setLang={setLang}><Technologies lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.technologyDetail} element={<WebLayout lang={lang} setLang={setLang}><TechnologyDetail lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.pathways} element={<WebLayout lang={lang} setLang={setLang}><InternalPage type="pathways" lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.opportunities} element={<WebLayout lang={lang} setLang={setLang}><InternalPage type="opportunities" lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.enablement} element={<WebLayout lang={lang} setLang={setLang}><InternalPage type="enablement" lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.planner} element={<WebLayout lang={lang} setLang={setLang}><InternalPage type="planner" lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.careerTest} element={<WebLayout lang={lang} setLang={setLang}><CareerTestLanding lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.careerTestQuestions} element={<WebLayout lang={lang} setLang={setLang}><CareerTestQuestion lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.careerTestResult} element={<WebLayout lang={lang} setLang={setLang}><CareerTestResult lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.login} element={<WebLayout lang={lang} setLang={setLang}><Login lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.register} element={<WebLayout lang={lang} setLang={setLang}><Register lang={lang} /></WebLayout>} />
        <Route path={ROUTE_PATHS.account} element={<WebLayout lang={lang} setLang={setLang}><Account lang={lang} /></WebLayout>} />
        <Route path="*" element={<WebLayout lang={lang} setLang={setLang}><Home lang={lang} /></WebLayout>} />
      </Routes>
    </>
  )
}
