import { useNavigate } from 'react-router-dom'
import { copy } from '../../app/localisation/copy.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { stats } from '../../data/index.js'
import { listPathways } from '../../services/CareerPathwayService.js'
import { useReveal } from '../../shared/hooks/useReveal.js'
import { Button } from '../../shared/ui/Button.jsx'
import { LogoMark } from '../../shared/ui/Logo.jsx'
import { ArrowIcon, PathwayGlyph, StatGlyph } from '../../shared/ui/icons.jsx'
import { AnnouncementCard } from './AnnouncementCard.jsx'
import { OrbitalFuture } from './OrbitalFuture.jsx'
import { VideoFeature } from './VideoFeature.jsx'

export function Home({ lang }) {
  const t = copy[lang]
  const ui = uiCopy[lang]
  const pathways = listPathways()
  const navigate = useNavigate()
  const [missionRef, missionVisible] = useReveal()
  const goToTechnologies = () => { navigate(ROUTE_PATHS.technologies); window.scrollTo(0, 0) }
  return (
    <main id="home">
      <section className="hero-section section-shell">
        <div className="hero-glow"/><div className="hero-grid"/>
        <div className="hero-copy reveal">
          <span className="eyebrow"><i/>{t.eyebrow}</span>
          <h1>{t.hero}</h1>
          <p>{t.intro}</p>
          <div className="hero-ctas"><Button href="#pathways">{t.explorePath}</Button><Button variant="text" to={ROUTE_PATHS.technologies} onClick={() => window.scrollTo(0, 0)}>{t.discoverTech}</Button></div>
          <AnnouncementCard lang={lang} t={t} />
        </div>
        <OrbitalFuture t={t} lang={lang} onOpen={goToTechnologies} />
      </section>

      <section className="signal-section section-shell">
        <div className="section-intro"><span className="eyebrow"><i/>{ui.signalsEyebrow}</span><h2>{ui.signalsTitle}</h2></div>
        <div className="stats-grid">
          {stats.map((stat) => <article className="stat" key={stat.value}><StatGlyph type={stat.icon}/><strong>{stat.value}</strong><p>{lang === 'ar' ? stat.arabicLabel : stat.label}</p><small>{lang === 'ar' ? stat.arabicSource : stat.source}</small></article>)}
        </div>
      </section>

      <VideoFeature lang={lang} />

      <section className={`mission-section section-shell reveal-section ${missionVisible ? 'is-visible' : ''}`} ref={missionRef}>
        <div className="mission-visual" aria-hidden="true">
          <span/><i/>
          <LogoMark className="mission-mark" />
        </div>
        <div className="mission-copy">
          <span className="eyebrow"><i/>{ui.missionEyebrow}</span>
          <h2>{ui.missionTitle}</h2>
          <p>{ui.missionText}</p>
          <Button variant="outline" to={ROUTE_PATHS.enablement}>{ui.missionCta}</Button>
        </div>
      </section>

      <section className="pathways-section section-shell" id="pathways">
        <div className="section-heading"><div><span className="eyebrow"><i/>{ui.directionEyebrow}</span><h2>{ui.directionTitle}</h2></div><Button variant="text" to={ROUTE_PATHS.pathways}>{ui.directionCta}</Button></div>
        <div className="pathway-grid">
          {pathways.map((path, index) => <a href={ROUTE_PATHS.pathways} onClick={(e) => { e.preventDefault(); navigate(ROUTE_PATHS.pathways); window.scrollTo(0, 0) }} className="pathway-card" key={path.title} style={{'--card-tone': path.color}}><span>0{index + 1}</span><b><PathwayGlyph type={path.id}/></b><div><h3>{lang === 'ar' ? path.arabicTitle : path.title}</h3><p>{lang === 'ar' ? path.arabicRole : path.role}</p></div><i><ArrowIcon diagonal/></i></a>)}
        </div>
      </section>

      <section className="quiz-band section-shell">
        <div><span className="eyebrow"><i/>{ui.quizEyebrow}</span><h2>{ui.quizTitle}</h2></div>
        <Button to={ROUTE_PATHS.careerTest}>{t.quiz}</Button>
      </section>
    </main>
  )
}
