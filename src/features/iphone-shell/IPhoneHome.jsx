import { useNavigate } from 'react-router-dom'
import { iphoneCopy } from '../../app/localisation/iphoneCopy.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { getWebReturnPath } from '../../app/routing/experienceMode.js'
import { ArrowIcon, SearchIcon, TechGlyph } from '../../shared/ui/icons.jsx'

export function IPhoneHome({ lang, setLang }) {
  const t = iphoneCopy[lang]
  const navigate = useNavigate()
  const onReturn = () => navigate(getWebReturnPath('/'))

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
            <button className="iphone-back" onClick={onReturn} aria-label={t.return} title={t.return}><ArrowIcon/></button>
            <div className="iphone-appmark" aria-label={lang === 'ar' ? 'مواهب ATRC' : 'ATRC Talent'}><i/><span>ATRC<br/><small>{lang === 'ar' ? 'مواهب' : 'TALENT'}</small></span></div>
            <button className="iphone-language" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label={uiCopy[lang].switchLanguage}>{lang === 'en' ? 'AR' : 'EN'}</button>
          </header>

          <div className="iphone-scroll">
            <div className="iphone-mobile-visual" aria-hidden="true">
              <div className="iphone-orbit iphone-orbit--one"/>
              <div className="iphone-orbit iphone-orbit--two"/>
              <div className="iphone-orbit-core">A</div>
              <i className="iphone-satellite iphone-satellite--one"/>
              <i className="iphone-satellite iphone-satellite--two"/>
              <i className="iphone-satellite iphone-satellite--three"/>
            </div>

            <div className="iphone-copy">
              <span className="iphone-kicker"><i/>{t.eyebrow}</span>
              <h1>{t.title}</h1>
              <p>{t.lead}</p>
            </div>

            <div className="iphone-build-status"><span>{t.signal}</span><i><b/></i><small>24%</small></div>

            <div className="iphone-signal-list">
              {t.highlights.map(([title, text, number], index) => (
                <article key={number} style={{'--signal-index': index}}>
                  <span>{number}</span><div><h2>{title}</h2><p>{text}</p></div><i/>
                </article>
              ))}
            </div>

            <small className="iphone-build-tag">{t.status}</small>
          </div>

          <nav className="iphone-tabs" aria-label={lang === 'ar' ? 'معاينة تنقل تطبيق آيفون' : 'iPhone navigation preview'}>
            {t.tabs.map((label, index) => (
              <button key={label} className={index === 0 ? 'active' : ''} disabled={index !== 0} aria-current={index === 0 ? 'page' : undefined}>
                <i className={`iphone-tab-icon iphone-tab-icon--${index}`} aria-hidden="true">{index === 1 && <SearchIcon/>}{index === 3 && <TechGlyph type="energy"/>}</i>
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="iphone-home-indicator" aria-hidden="true"/>
        </div>
      </section>
    </main>
  )
}
