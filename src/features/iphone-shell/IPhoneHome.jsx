import { useLocation, useNavigate } from 'react-router-dom'
import { iphoneCopy } from '../../app/localisation/iphoneCopy.jsx'
import { copy as webCopy } from '../../app/localisation/copy.jsx'
import { pageContent } from '../../app/localisation/pageContent.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { getWebReturnPath } from '../../app/routing/experienceMode.js'
import { iphonePathwayPath, iphoneTechnologyPath, ROUTE_PATHS } from '../../app/routing/routes.js'
import { listPathways } from '../../services/CareerPathwayService.js'
import { isAuthenticated } from '../../services/AuthService.js'
import { getTechnologyById, listTechnologies } from '../../services/TechnologyContentService.js'
import { LogoMark } from '../../shared/ui/Logo.jsx'
import { ArrowIcon, HabitsIcon, HomeIcon, PathwayGlyph, PlannerIcon, SearchIcon, TechGlyph, UserIcon } from '../../shared/ui/icons.jsx'

const tabRoutes = ['/iphone/home', '/iphone/technologies', '/iphone/career-planner', '/iphone/habits', '/iphone/profile']
const tabIcons = [HomeIcon, SearchIcon, PlannerIcon, HabitsIcon, UserIcon]

function routeType(pathname) {
  if (pathname === '/iphone' || pathname === '/iphone/home' || pathname === '/iphone/dashboard') return 'home'
  if (pathname === '/iphone/technologies') return 'technologies'
  if (pathname.startsWith('/iphone/technologies/')) return 'technologyDetail'
  if (pathname === '/iphone/pathways') return 'pathways'
  if (pathname.startsWith('/iphone/pathways/')) return 'pathwayDetail'
  if (pathname.startsWith('/iphone/career-test')) return 'careerTest'
  if (pathname === '/iphone/login') return 'login'
  if (pathname.startsWith('/iphone/profile')) return 'profile'
  if (pathname === '/iphone/saved') return 'saved'
  if (pathname.startsWith('/iphone/reports')) return 'reports'
  if (pathname.startsWith('/iphone/programs')) return 'programs'
  if (pathname === '/iphone/search') return 'search'
  if (pathname.startsWith('/iphone/career-planner')) return 'planner'
  if (pathname.startsWith('/iphone/cv-builder')) return 'cv'
  if (pathname === '/iphone/ai-chat') return 'aiChat'
  if (pathname.startsWith('/iphone/habits') || pathname.startsWith('/iphone/goals') || pathname.startsWith('/iphone/routines')) return 'habits'
  if (pathname === '/iphone/settings') return 'settings'
  return 'notFound'
}

function routeId(pathname) {
  return pathname.split('/').filter(Boolean).at(-1)
}

export function IPhoneHome({ lang, setLang }) {
  const t = iphoneCopy[lang]
  const web = webCopy[lang]
  const navigate = useNavigate()
  const location = useLocation()
  const currentRoute = routeType(location.pathname)
  const technologies = listTechnologies()
  const pathways = listPathways()
  const selectedTechnology = currentRoute === 'technologyDetail' ? getTechnologyById(routeId(location.pathname)) : null
  const selectedPathway = currentRoute === 'pathwayDetail' ? pathways.find((pathway) => pathway.id === routeId(location.pathname)) : null
  const authenticated = isAuthenticated()
  const onReturn = () => navigate(getWebReturnPath('/'))
  const goHome = () => navigate('/iphone/home')
  const appBack = () => currentRoute === 'home' ? onReturn() : goHome()

  const titleFor = (technology) => lang === 'ar' ? technology.arabic : technology.title
  const textFor = (technology) => lang === 'ar' ? technology.arabicDescription : technology.description
  const pathwayTitle = (pathway) => lang === 'ar' ? pathway.arabicTitle : pathway.title
  const pathwayRole = (pathway) => lang === 'ar' ? pathway.arabicRole : pathway.role

  const previewCards = [
    [pageContent.opportunities.title[lang], pageContent.opportunities.lead[lang], '/iphone/programs', '03'],
    [pageContent.enablement.title[lang], pageContent.enablement.lead[lang], '/iphone/saved', '04'],
    [t.aiChat, t.unavailable, '/iphone/ai-chat', '05'],
  ]

  const renderHome = () => (
    <>
      <div className="iphone-mobile-visual" aria-hidden="true">
        <div className="iphone-orbit iphone-orbit--one"/>
        <div className="iphone-orbit iphone-orbit--two"/>
        <div className="iphone-orbit-core"><LogoMark className="iphone-core-mark"/></div>
        <i className="iphone-satellite iphone-satellite--one"/>
        <i className="iphone-satellite iphone-satellite--two"/>
        <i className="iphone-satellite iphone-satellite--three"/>
      </div>

      <div className="iphone-copy">
        <span className="iphone-kicker"><i/>{web.eyebrow}</span>
        <h1>{web.hero}</h1>
        <p>{web.intro}</p>
      </div>

      <section className="iphone-action-card">
        <span>{t.recommended}</span>
        <h2>{t.startCareerTest}</h2>
        <button onClick={() => navigate('/iphone/career-test')}>{t.openRoute}<ArrowIcon/></button>
      </section>

      <div className="iphone-build-status"><span>{t.signal}</span><i><b/></i><small>{t.buildStatus}</small></div>

      <div className="iphone-signal-list">
        <button onClick={() => navigate('/iphone/technologies')}>
          <span>01</span><div><h2>{t.technologies}</h2><p>{t.highlights[0][1]}</p></div><i/>
        </button>
        <button onClick={() => navigate('/iphone/pathways')}>
          <span>02</span><div><h2>{pageContent.pathways.title[lang]}</h2><p>{pageContent.pathways.lead[lang]}</p></div><i/>
        </button>
        {previewCards.map(([title, text, path, number]) => (
          <button key={path} onClick={() => navigate(path)}>
            <span>{number}</span><div><h2>{title}</h2><p>{text}</p></div><i/>
          </button>
        ))}
      </div>

      <small className="iphone-build-tag">{t.status}</small>
    </>
  )

  const renderList = (kind) => {
    const items = kind === 'technologies' ? technologies : pathways
    const title = kind === 'technologies' ? t.technologies : t.pathways
    return (
      <section className="iphone-route-panel">
        <span className="iphone-kicker"><i/>{title}</span>
        <h1>{title}</h1>
        <div className="iphone-card-list">
          {items.map((item) => (
            <button
              key={item.id}
              style={{'--item-tone': item.color}}
              onClick={() => navigate(kind === 'technologies' ? iphoneTechnologyPath(item.id) : iphonePathwayPath(item.id))}
            >
              <span>{kind === 'technologies' ? <TechGlyph type={item.icon}/> : <PathwayGlyph type={item.id}/>}</span>
              <b>{kind === 'technologies' ? titleFor(item) : pathwayTitle(item)}</b>
              <small>{kind === 'technologies' ? textFor(item) : pathwayRole(item)}</small>
              <ArrowIcon/>
            </button>
          ))}
        </div>
      </section>
    )
  }

  const renderTechnologyDetail = () => {
    if (!selectedTechnology) return renderNotFound()
    return (
      <section className="iphone-route-panel">
        <span className="iphone-kicker"><i/>{selectedTechnology.number} · {lang === 'ar' ? selectedTechnology.arabicCategory : selectedTechnology.category}</span>
        <h1>{titleFor(selectedTechnology)}</h1>
        <p>{textFor(selectedTechnology)}</p>
        <div className="iphone-detail-stack">
          <article><b>{lang === 'ar' ? 'لماذا يهم' : 'Why it matters'}</b><p>{selectedTechnology.detail.whyItMatters[lang]}</p></article>
          <article><b>{lang === 'ar' ? 'الموضوعات' : 'Key subjects'}</b><p>{selectedTechnology.detail.keySubjects[lang].join(' · ')}</p></article>
          <article><b>{lang === 'ar' ? 'المسارات الدراسية' : 'Study route'}</b><p>{selectedTechnology.detail.studyRoutes[lang].slice(0, 3).join(' · ')}</p></article>
        </div>
      </section>
    )
  }

  const renderPathwayDetail = () => {
    if (!selectedPathway) return renderNotFound()
    return (
      <section className="iphone-route-panel">
        <span className="iphone-kicker"><i/>{pathwayRole(selectedPathway)}</span>
        <h1>{pathwayTitle(selectedPathway)}</h1>
        <p>{selectedPathway.resultSummary[lang]}</p>
        <section className="iphone-action-card">
          <span>{t.recommended}</span>
          <h2>{t.startCareerTest}</h2>
          <button onClick={() => navigate('/iphone/career-test')}>{t.openRoute}<ArrowIcon/></button>
        </section>
      </section>
    )
  }

  const renderPreview = (title, actionPath = '/iphone/home', actionLabel = t.goDashboard) => (
    <section className="iphone-route-panel iphone-route-panel--center">
      <span className="iphone-kicker"><i/>{t.preview}</span>
      <h1>{title}</h1>
      <p>{title === t.profile ? (authenticated ? t.unavailable : `${t.login} · ${t.unavailable}`) : t.unavailable}</p>
      <button className="iphone-panel-action" onClick={() => navigate(actionPath)}>{actionLabel}<ArrowIcon/></button>
    </section>
  )

  const renderNotFound = () => (
    <section className="iphone-route-panel iphone-route-panel--center">
      <span className="iphone-kicker"><i/>{t.preview}</span>
      <h1>{t.notFound}</h1>
      <p>{t.notFoundText}</p>
      <button className="iphone-panel-action" onClick={goHome}>{t.goDashboard}<ArrowIcon/></button>
    </section>
  )

  const renderRoute = () => {
    if (currentRoute === 'home') return renderHome()
    if (currentRoute === 'technologies') return renderList('technologies')
    if (currentRoute === 'technologyDetail') return renderTechnologyDetail()
    if (currentRoute === 'pathways') return renderList('pathways')
    if (currentRoute === 'pathwayDetail') return renderPathwayDetail()
    if (currentRoute === 'careerTest') return renderPreview(t.startCareerTest, ROUTE_PATHS.careerTest, t.openRoute)
    if (currentRoute === 'login') return renderPreview(t.login, ROUTE_PATHS.login, t.openRoute)
    if (currentRoute === 'profile') return renderPreview(t.profile, authenticated ? ROUTE_PATHS.account : ROUTE_PATHS.login, t.openRoute)
    if (currentRoute === 'saved') return renderPreview(t.saved)
    if (currentRoute === 'reports') return renderPreview(t.reports)
    if (currentRoute === 'programs') return renderPreview(t.programs, ROUTE_PATHS.opportunities, t.openRoute)
    if (currentRoute === 'search') return renderPreview(t.search)
    if (currentRoute === 'planner') return renderPreview(t.planner, ROUTE_PATHS.planner, t.openRoute)
    if (currentRoute === 'cv') return renderPreview(t.cvBuilder)
    if (currentRoute === 'aiChat') return renderPreview(t.aiChat)
    if (currentRoute === 'habits') return renderPreview(t.habits)
    if (currentRoute === 'settings') return renderPreview(t.settings)
    return renderNotFound()
  }

  return (
    <main className="iphone-stage">
      <button className="iphone-return iphone-return--outer" onClick={onReturn}>
        <i><ArrowIcon/></i><span>{t.return}</span>
      </button>

      <section className="iphone-device" aria-label={t.open}>
        <div className="iphone-screen">
          <div className="iphone-status" aria-hidden="true">
            <b>9:41</b><span><i/><i/><i/> 5G&nbsp; ◒</span>
          </div>

          <header className="iphone-appbar">
            <button className="iphone-back" onClick={appBack} aria-label={currentRoute === 'home' ? t.return : t.goDashboard} title={currentRoute === 'home' ? t.return : t.goDashboard}><ArrowIcon/></button>
            <div className="iphone-appmark" aria-label={lang === 'ar' ? 'مواهب ATRC' : 'ATRC Talent'}><LogoMark className="iphone-appmark-icon"/><span>ATRC<br/><small>{lang === 'ar' ? 'مواهب' : 'TALENT'}</small></span></div>
            <button className="iphone-language" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label={uiCopy[lang].switchLanguage}>{lang === 'en' ? 'AR' : 'EN'}</button>
          </header>

          <div className="iphone-scroll">
            {renderRoute()}
          </div>

          <nav className="iphone-tabs" aria-label={lang === 'ar' ? 'معاينة تنقل تطبيق آيفون' : 'iPhone navigation preview'}>
            {t.tabs.map((label, index) => {
              const TabIcon = tabIcons[index]
              return (
              <button key={label} onClick={() => navigate(tabRoutes[index])} className={location.pathname.startsWith(tabRoutes[index]) || (index === 0 && currentRoute === 'home') ? 'active' : ''} aria-current={location.pathname.startsWith(tabRoutes[index]) || (index === 0 && currentRoute === 'home') ? 'page' : undefined}>
                <i className="iphone-tab-icon" aria-hidden="true"><TabIcon/></i>
                <span>{label}</span>
              </button>
            )})}
          </nav>
          <div className="iphone-home-indicator" aria-hidden="true"/>
        </div>
      </section>
    </main>
  )
}
