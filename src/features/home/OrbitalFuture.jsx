import { Link } from 'react-router-dom'
import { technologyDetailPath } from '../../app/routing/routes.js'
import { TechGlyph } from '../../shared/ui/icons.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { listTechnologies } from '../../services/TechnologyContentService.js'

export function OrbitalFuture({ onOpen, t, lang }) {
  const nodes = listTechnologies()
  return (
    <div className="future-orbit" aria-label={uiCopy[lang].orbitAria}>
      <div className="orbit-ring orbit-ring--outer"/><div className="orbit-ring orbit-ring--inner"/>
      {Array.from({length: nodes.length}, (_, index) => <span className="orbit-tick" style={{'--index': index, '--count': nodes.length}} key={index}/>)}
      <svg className="orbit-curve" viewBox="0 0 200 200" aria-hidden="true">
        <path id="orbitCurvePath" d="M71.7,128.3 A40,40 0 1 1 128.3,128.3" fill="none"/>
        <text textAnchor="middle"><textPath href="#orbitCurvePath" startOffset="50%">{t.orbitLabel}</textPath></text>
      </svg>
      <button className="orbit-core" onClick={onOpen} aria-label={t.exploreFuture}><i/></button>
      {nodes.map((tech, index) => {
        const title = lang === 'ar' ? tech.arabic : tech.title
        return (
          <Link className="orbit-node" to={technologyDetailPath(tech.id)} aria-label={`${uiCopy[lang].exploreTechnology}: ${title}`} style={{'--index': index, '--count': nodes.length, '--tone': tech.color}} key={tech.id}>
            <TechGlyph type={tech.icon}/>
          </Link>
        )
      })}
    </div>
  )
}
