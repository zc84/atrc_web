import { useMemo, useState } from 'react'
import { copy } from '../../app/localisation/copy.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { ROUTE_PATHS } from '../../app/routing/routes.js'
import { listTechnologies } from '../../services/TechnologyContentService.js'
import { Button } from '../../shared/ui/Button.jsx'
import { SearchIcon, TechGlyph } from '../../shared/ui/icons.jsx'
import { TechnologyCard } from './TechnologyCard.jsx'

export function Technologies({ lang }) {
  const technologies = listTechnologies()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...new Set(technologies.map(item => item.category))]
  const ui = uiCopy[lang]
  const visible = useMemo(() => technologies.filter(item => {
    const searchText = `${item.title} ${item.description} ${item.category} ${item.careers.join(' ')} ${item.arabic} ${item.arabicDescription} ${item.arabicCategory} ${item.arabicCareers.join(' ')}`
    return (filter === 'All' || item.category === filter) && searchText.toLowerCase().includes(query.trim().toLowerCase())
  }), [technologies, filter, query])
  const categoryLabel = (category) => category === 'All' ? ui.all : (technologies.find(item => item.category === category)?.[lang === 'ar' ? 'arabicCategory' : 'category'] || category)
  return (
    <main id="technologies" className="technologies-page">
      <section className="catalogue-hero section-shell">
        <div className="catalogue-kicker"><span>01 — 08</span><span>{ui.techKicker}</span></div>
        <h1>{ui.techTitle}</h1>
        <p>{ui.techLead}</p>
        <div className="catalogue-art" aria-hidden="true"><i/><i/><i/><span><TechGlyph type="orbit"/></span></div>
      </section>
      <section className="catalogue-controls section-shell">
        <label className="search-box"><SearchIcon/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={ui.techSearch}/><span>{visible.length.toString().padStart(2, '0')} {ui.results}</span></label>
        <div className="filter-row" role="group" aria-label={ui.filterAria}>{categories.map(category => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{categoryLabel(category)}</button>)}</div>
      </section>
      <section className="technology-grid section-shell" aria-live="polite">
        {visible.map((tech, index) => <TechnologyCard key={tech.id} technology={tech} index={index} lang={lang} ui={ui}/>)}
        {visible.length === 0 && <div className="no-results"><strong>{ui.noSignal}</strong><p>{ui.noSignalText}</p><button onClick={() => {setQuery('');setFilter('All')}}>{ui.resetSearch}</button></div>}
      </section>
      <section className="tech-signal-band section-shell">
        <div>
          <span className="eyebrow"><i/>{ui.techSignalEyebrow}</span>
          <h2>{ui.techSignalTitle}</h2>
        </div>
        <div className="tech-signal-grid">
          {ui.techSignals.map(([title, text, number]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>
      <section className="technology-cta section-shell"><span className="eyebrow"><i/>{ui.findMatch}</span><h2>{ui.techQuestion}</h2><Button to={ROUTE_PATHS.careerTest}>{copy[lang].quiz}</Button></section>
    </main>
  )
}
