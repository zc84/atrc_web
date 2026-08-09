import { useState } from 'react'
import { announcements } from '../../data/index.js'
import { ArrowIcon, TechGlyph } from '../../shared/ui/icons.jsx'

export function AnnouncementCard({ lang, t }) {
  const [index, setIndex] = useState(0)
  const current = announcements[index]
  const step = (delta) => setIndex((index + delta + announcements.length) % announcements.length)
  return (
    <div className="announce-card">
      <div className="announce-body">
        <span className="eyebrow"><i/>{t.announcement}</span>
        <p>{lang === 'ar' ? current.arabicText : current.text}</p>
      </div>
      <div className="announce-media" style={{'--tone': current.color}} aria-hidden="true"><TechGlyph type={current.icon}/></div>
      <div className="announce-nav">
        <button onClick={() => step(-1)} aria-label={t.announcePrev}><ArrowIcon/></button>
        <button className="is-active" onClick={() => step(1)} aria-label={t.announceNext}><ArrowIcon/></button>
      </div>
    </div>
  )
}
