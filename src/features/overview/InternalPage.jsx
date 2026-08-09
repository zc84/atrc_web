import { copy } from '../../app/localisation/copy.jsx'
import { pageContent } from '../../app/localisation/pageContent.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { useReveal } from '../../shared/hooks/useReveal.js'
import { Button } from '../../shared/ui/Button.jsx'
import { ArrowIcon, TechGlyph } from '../../shared/ui/icons.jsx'
import { InternalHero } from './InternalHero.jsx'

export function InternalPage({ type, lang }) {
  const page = pageContent[type]
  const ui = uiCopy[lang]
  const [featureRef, featureVisible] = useReveal()
  return (
    <main className={`inner-page inner-page--${type}`} style={{'--page-tone': page.tone}}>
      <InternalHero page={page} lang={lang}/>

      <section className={`inner-feature section-shell reveal-section ${featureVisible ? 'is-visible' : ''}`} ref={featureRef}>
        <div className="mission-visual inner-feature-visual" aria-hidden="true">
          <span/><i/>
          <b>{page.symbol}</b>
        </div>
        <div className="mission-copy">
          <span className="eyebrow"><i/>{page.eyebrow[lang]}</span>
          <h2>{page.focus[lang]}</h2>
          <p>{ui.innerIntro}</p>
          <Button variant="outline">{ui.startExploring}</Button>
        </div>
      </section>

      <section className="inner-card-section section-shell">
        <div className="section-heading">
          <div><span className="eyebrow"><i/>{ui.whatYouFind}</span><h2>{ui.chooseSignal}</h2></div>
        </div>
        <div className="inner-card-grid">
          {page.tiles.map((tile) => (
            <article className="inner-card" key={tile.title.en} style={{'--card-tone': tile.color}}>
              <div className="inner-card-head"><span>{tile.meta?.[lang] || tile.meta}</span><i><TechGlyph type={tile.icon}/></i></div>
              <div>
                <small>{tile.label[lang]}</small>
                <h3>{tile.title[lang]}</h3>
                <p>{tile.text[lang]}</p>
              </div>
              <a href="#"><span>{ui.explore}</span><ArrowIcon diagonal/></a>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline-band section-shell">
        <div>
          <span className="eyebrow"><i/>{ui.howItWorks}</span>
          <h2>{ui.clearPath}</h2>
        </div>
        <ol>
          {page.steps[lang].map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}
        </ol>
      </section>

      <section className="technology-cta section-shell" style={{'--page-tone': page.tone}}>
        <span className="eyebrow"><i/>{ui.findMatch}</span>
        <h2>{ui.pathQuestion}</h2>
        <Button to={ROUTE_PATHS.careerTest}>{copy[lang].quiz}</Button>
      </section>
    </main>
  )
}
