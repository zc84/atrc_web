import { TechGlyph } from '../../shared/ui/icons.jsx'
import { listTechnologies } from '../../services/TechnologyContentService.js'

export function InternalHero({ page, lang }) {
  const technologies = listTechnologies()
  return (
    <section className="inner-hero section-shell" style={{'--page-tone': page.tone}}>
      <div className="inner-hero-copy">
        <div className="catalogue-kicker"><span>{page.symbol} — {lang === 'ar' ? 'مواهب ATRC' : 'ATRC TALENT'}</span><span>{page.kicker[lang]}</span></div>
        <h1>{page.title[lang]}</h1>
        <p>{page.lead[lang]}</p>
      </div>
      <div className="inner-constellation" aria-hidden="true">
        <div className="constellation-core">{page.symbol}</div>
        {technologies.slice(0, 6).map((tech, index) => (
          <span key={tech.id} style={{'--index': index, '--count': 6, '--tone': tech.color}}>
            <TechGlyph type={tech.icon}/>
          </span>
        ))}
        <i/><i/><i/>
      </div>
    </section>
  )
}
