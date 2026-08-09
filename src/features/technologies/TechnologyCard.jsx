import { useState } from 'react'
import { Link } from 'react-router-dom'
import { technologyDetailPath } from '../../app/routing/routes.js'
import { ArrowIcon, TechGlyph } from '../../shared/ui/icons.jsx'

export function TechnologyCard({ technology, index, lang, ui }) {
  const [saved, setSaved] = useState(false)
  const title = lang === 'ar' ? technology.arabic : technology.title
  const careers = lang === 'ar' ? technology.arabicCareers : technology.careers
  return (
    <article className="technology-card" style={{'--tech-tone': technology.color, '--delay': `${index * 55}ms`}}>
      <div className="tech-card-top"><span>{technology.number} / 08</span><button className={saved ? 'saved' : ''} onClick={() => setSaved(!saved)} aria-label={`${saved ? ui.remove : ui.save} ${title}`}><svg viewBox="0 0 24 24"><path d="M6 4h12v17l-6-4-6 4V4Z"/></svg></button></div>
      <div className="glyph-wrap"><TechGlyph type={technology.icon}/></div>
      <span className="tech-category">{lang === 'ar' ? technology.arabicCategory : technology.category}</span>
      <h2>{title}</h2>
      <p>{lang === 'ar' ? technology.arabicDescription : technology.description}</p>
      <div className="career-tags">{careers.map(career => <span key={career}>{career}</span>)}</div>
      <Link to={technologyDetailPath(technology.id)} aria-label={`${ui.exploreTechnology}: ${title}`}><span>{ui.exploreTechnology}</span><i><ArrowIcon diagonal/></i></Link>
    </article>
  )
}
