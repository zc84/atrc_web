import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowIcon, SearchIcon, SoundIcon, StatGlyph, TechGlyph } from './icons.jsx'
import { announcements, pathways, stats, technologies } from './data.js'

const copy = {
  en: {
    nav: ['Career Pathways', 'Advanced Technologies', 'Opportunities Center', 'Talent Enablement', 'Career Planner'],
    quiz: 'Take the Career Test',
    login: 'Login',
    eyebrow: 'Your future starts here',
    hero: <>Design your future.<br/><span>Build what’s next.</span></>,
    intro: 'Discover the technologies, pathways and opportunities shaping the UAE — and find where your curiosity can take you.',
    explorePath: 'Explore your path', discoverTech: 'Discover technologies', exploreFuture: 'EXPLORE YOUR FUTURE', orbitLabel: 'DISCOVER YOUR CAREER PATH',
    announcement: 'Announcement', announcePrev: 'Previous announcement', announceNext: 'Next announcement',
  },
  ar: {
    nav: ['المسارات المهنية', 'التقنيات المتقدمة', 'مركز الفرص', 'تمكين المواهب', 'مخطط المسار المهني'],
    quiz: 'ابدأ اختبار المسار',
    login: 'تسجيل الدخول',
    eyebrow: 'مستقبلك يبدأ من هنا',
    hero: <>صمّم مستقبلك.<br/><span>وابنِ القادم.</span></>,
    intro: 'اكتشف التقنيات والمسارات والفرص التي ترسم مستقبل دولة الإمارات، واعرف إلى أين يقودك فضولك.',
    explorePath: 'استكشف مسارك', discoverTech: 'اكتشف التقنيات', exploreFuture: 'استكشف مستقبلك', orbitLabel: 'اكتشف مسارك المهني',
    announcement: 'إعلان', announcePrev: 'الإعلان السابق', announceNext: 'الإعلان التالي',
  },
}

const filmCaptions = {
  en: [
    { eyebrow: 'Inside the intelligence age', heading: <>Where ambition<br/>becomes impact.</> },
    { eyebrow: 'Innovation for the intelligence age', heading: <>Built in Abu Dhabi.<br/>Built for the world.</> },
    { eyebrow: 'A global tech R&D platform', heading: <>Research becomes<br/>real-world reach.</> },
    { eyebrow: 'Talent, unlocked', heading: <>Curiosity is where<br/>every career starts.</> },
    { eyebrow: 'Shaping the knowledge economy', heading: <>Ideas move fast<br/>when talent leads.</> },
  ],
  ar: [
    { eyebrow: 'داخل عصر الذكاء', heading: <>حيث يتحوّل الطموح<br/>إلى أثر.</> },
    { eyebrow: 'الابتكار لعصر الذكاء', heading: <>وُلد في أبوظبي.<br/>صُنع للعالم.</> },
    { eyebrow: 'منصة عالمية للبحث والتطوير', heading: <>البحث يتحوّل إلى<br/>تأثير حقيقي.</> },
    { eyebrow: 'المواهب بلا حدود', heading: <>الفضول هو حيث<br/>تبدأ كل مسيرة.</> },
    { eyebrow: 'نبني اقتصاد المعرفة', heading: <>الأفكار تتسارع<br/>حين تقود المواهب.</> },
  ],
}

const logoDots = [
  [82.2, 33.2, 7.1], [83.6, 54.2, 9], [76.9, 69.2, 2.8], [33.5, 65.7, 2.6], [42.9, 68.4, 3.7], [54.2, 66.2, 4.6], [63.5, 57.3, 6],
  [33, 27.6, 2.6], [25.9, 34.5, 3.7], [22.3, 45.2, 4.6], [25.3, 57.7, 6], [66.5, 46.7, 2.7], [64.4, 37.1, 3.8], [56.9, 28.4, 4.6],
  [44.2, 24.6, 5.9], [48.8, 6.8, 2.9], [60.1, 9.8, 4.2], [72.6, 18, 5.8], [8.1, 62.6, 2.8], [4.7, 51.1, 4.1], [5.7, 36.2, 5.7],
  [14.2, 20.4, 6.9], [31.8, 8.8, 8.7], [68.7, 77.7, 4], [54.9, 84.3, 5.8], [36.7, 85.1, 7.1], [17.8, 75.7, 8.9],
]

function Logo() {
  return (
    <a className="brand" href="/" aria-label="ATRC Talent home">
      <svg className="brand-orbit" viewBox="0 0 93 93" aria-hidden="true">
        {logoDots.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}
      </svg>
      <span className="brand-copy"><b>ADVANCED<br/>TECHNOLOGY</b><small>RESEARCH COUNCIL</small></span>
    </a>
  )
}

function useReveal(threshold = 0.25) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold })
    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])
  return [ref, visible]
}

function Button({ children, variant = 'primary', href = '#', onClick, className = '' }) {
  return <a className={`button button--${variant} ${className}`} href={href} onClick={onClick}><span>{children}</span><i><ArrowIcon diagonal={variant === 'text'} /></i></a>
}

function AnnouncementCard({ lang, t }) {
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

function Header({ lang, setLang, route, setRoute }) {
  const [open, setOpen] = useState(false)
  const t = copy[lang]
  const go = (event, next) => { event.preventDefault(); setRoute(next); setOpen(false); window.scrollTo({top: 0, behavior: 'smooth'}) }
  return (
    <header className="site-header">
      <Logo />
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
        {t.nav.map((item, index) => <a key={item} className={(index === 1 && route === 'technologies') ? 'active' : ''} href={index === 1 ? '/technologies' : '#'} onClick={index === 1 ? (e) => go(e, 'technologies') : undefined}>{item}</a>)}
        <div className="mobile-actions"><Button variant="outline">{t.login}</Button><Button>{t.quiz}</Button></div>
      </nav>
      <div className="header-actions">
        <button className="language" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label="Switch language">{lang === 'en' ? 'AR' : 'EN'}</button>
        <Button variant="outline">{t.login}</Button>
        <Button>{t.quiz}</Button>
        <button className={`menu-toggle ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><i/><i/></button>
      </div>
    </header>
  )
}

function OrbitalFuture({ onOpen, t }) {
  const nodes = technologies
  return (
    <div className="future-orbit" aria-label="Explore future technologies">
      <div className="orbit-ring orbit-ring--outer"/><div className="orbit-ring orbit-ring--inner"/>
      {Array.from({length: nodes.length}, (_, index) => <span className="orbit-tick" style={{'--index': index, '--count': nodes.length}} key={index}/>)}
      <svg className="orbit-curve" viewBox="0 0 200 200" aria-hidden="true">
        <path id="orbitCurvePath" d="M71.7,128.3 A40,40 0 1 1 128.3,128.3" fill="none"/>
        <text textAnchor="middle"><textPath href="#orbitCurvePath" startOffset="50%">{t.orbitLabel}</textPath></text>
      </svg>
      <button className="orbit-core" onClick={onOpen}><i><ArrowIcon /></i></button>
      {nodes.map((tech, index) => <div className="orbit-node" style={{'--index': index, '--count': nodes.length, '--tone': tech.color}} key={tech.id}><TechGlyph type={tech.icon}/></div>)}
    </div>
  )
}

function VideoFeature({ lang }) {
  const frameRef = useRef(null)
  const videoRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [captionIndex, setCaptionIndex] = useState(0)
  const captions = filmCaptions[lang]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect() }
    }, { rootMargin: '240px' })
    if (frameRef.current) observer.observe(frameRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setInterval(() => setCaptionIndex(index => (index + 1) % captions.length), 5500)
    return () => clearInterval(id)
  }, [shouldLoad, captions.length])

  const togglePlayback = async () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) { await videoRef.current.play(); setPlaying(true) }
    else { videoRef.current.pause(); setPlaying(false) }
  }

  const toggleSound = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setMuted(videoRef.current.muted)
  }

  const startWhenReady = () => {
    videoRef.current?.play().catch(() => setPlaying(false))
  }

  const caption = captions[captionIndex % captions.length]

  return (
    <section className="video-feature section-shell" ref={frameRef} aria-label={lang === 'ar' ? 'فيلم مجلس أبحاث التكنولوجيا المتطورة' : 'ATRC film'}>
      <div className="video-frame">
        {shouldLoad && <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" onCanPlay={startWhenReady} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
          <source src="https://prod-atrc-backend-webfiles-bmg3gcf9fwf2f9es.a02.azurefd.net/static/atrc.mp4" type="video/mp4" />
        </video>}
        <div className="video-vignette" />
        <div className="video-caption" key={captionIndex}>
          <span className="eyebrow"><i/>{caption.eyebrow}</span>
          <h2>{caption.heading}</h2>
          <a href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer">{lang === 'ar' ? 'اكتشف منظومة ATRC' : 'Discover the ATRC ecosystem'} <ArrowIcon diagonal /></a>
        </div>
        <div className="video-controls">
          <button onClick={togglePlayback} disabled={!shouldLoad} aria-label={playing ? 'Pause film' : 'Play film'}>{playing ? 'Ⅱ' : '▶'}</button>
          <button onClick={toggleSound} disabled={!shouldLoad} aria-label={muted ? 'Unmute film' : 'Mute film'}><SoundIcon muted={muted}/></button>
        </div>
      </div>
    </section>
  )
}

function Home({ setRoute, lang }) {
  const t = copy[lang]
  const [missionRef, missionVisible] = useReveal()
  return (
    <main id="home">
      <section className="hero-section section-shell">
        <div className="hero-glow"/><div className="hero-grid"/>
        <div className="hero-copy reveal">
          <span className="eyebrow"><i/>{t.eyebrow}</span>
          <h1>{t.hero}</h1>
          <p>{t.intro}</p>
          <div className="hero-ctas"><Button href="#pathways">{t.explorePath}</Button><Button variant="text" href="/technologies" onClick={(e) => {e.preventDefault(); setRoute('technologies'); window.scrollTo(0,0)}}>{t.discoverTech}</Button></div>
          <AnnouncementCard lang={lang} t={t} />
        </div>
        <OrbitalFuture t={t} onOpen={() => {setRoute('technologies'); window.scrollTo(0,0)}} />
      </section>

      <section className="signal-section section-shell">
        <div className="section-intro"><span className="eyebrow"><i/>Signals of the future</span><h2>The future is already<br/><span>in motion.</span></h2></div>
        <div className="stats-grid">
          {stats.map((stat) => <article className="stat" key={stat.value}><StatGlyph type={stat.icon}/><strong>{stat.value}</strong><p>{stat.label}</p><small>{stat.source}</small></article>)}
        </div>
      </section>

      <VideoFeature lang={lang} />

      <section className={`mission-section section-shell reveal-section ${missionVisible ? 'is-visible' : ''}`} ref={missionRef}>
        <div className="mission-visual" aria-hidden="true">
          <span/><i/>
          <svg className="mission-mark" viewBox="0 0 93 93">{logoDots.map(([cx, cy, r], index) => <circle key={index} cx={cx} cy={cy} r={r}/>)}</svg>
        </div>
        <div className="mission-copy">
          <span className="eyebrow"><i/>Our mission</span>
          <h2>Empowering the next generation of innovators to <span>shape the future world.</span></h2>
          <p>Your ideas matter. Your curiosity has power. ATRC Talent connects you with the knowledge and opportunities to turn both into impact.</p>
          <Button variant="outline">About ATRC Talent</Button>
        </div>
      </section>

      <section className="pathways-section section-shell" id="pathways">
        <div className="section-heading"><div><span className="eyebrow"><i/>Find your direction</span><h2>More than a career.<br/><span>A pathway to impact.</span></h2></div><Button variant="text">View all pathways</Button></div>
        <div className="pathway-grid">
          {pathways.map((path, index) => <a href="#" className="pathway-card" key={path.title} style={{'--card-tone': path.color}}><span>0{index + 1}</span><b>{path.mark}</b><div><h3>{path.title}</h3><p>{path.role}</p></div><i><ArrowIcon diagonal/></i></a>)}
        </div>
      </section>

      <section className="quiz-band section-shell">
        <div><span className="eyebrow"><i/>Not sure where to start?</span><h2>Your future might be<br/>one question away.</h2></div>
        <Button>Take the career test</Button>
      </section>
    </main>
  )
}

function TechnologyCard({ technology, index, lang }) {
  const [saved, setSaved] = useState(false)
  return (
    <article className="technology-card" style={{'--tech-tone': technology.color, '--delay': `${index * 55}ms`}}>
      <div className="tech-card-top"><span>{technology.number} / 08</span><button className={saved ? 'saved' : ''} onClick={() => setSaved(!saved)} aria-label={`${saved ? 'Remove' : 'Save'} ${technology.title}`}><svg viewBox="0 0 24 24"><path d="M6 4h12v17l-6-4-6 4V4Z"/></svg></button></div>
      <div className="glyph-wrap"><TechGlyph type={technology.icon}/><i/><i/><i/></div>
      <span className="tech-category">{technology.category}</span>
      <h2>{lang === 'ar' ? technology.arabic : technology.title}</h2>
      <p>{lang === 'ar' ? technology.arabicDescription : technology.description}</p>
      <div className="career-tags">{technology.careers.map(career => <span key={career}>{career}</span>)}</div>
      <a href={`#${technology.id}`} aria-label={`Explore ${technology.title}`}><span>Explore technology</span><i><ArrowIcon diagonal/></i></a>
    </article>
  )
}

function Technologies({ lang }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...new Set(technologies.map(item => item.category))]
  const visible = useMemo(() => technologies.filter(item => (filter === 'All' || item.category === filter) && `${item.title} ${item.description} ${item.careers.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [filter, query])
  return (
    <main id="technologies" className="technologies-page">
      <section className="catalogue-hero section-shell">
        <div className="catalogue-kicker"><span>01 — 08</span><span>{lang === 'ar' ? 'استكشف ركائز عالم الغد' : 'Explore the building blocks of tomorrow'}</span></div>
        <h1>{lang === 'ar' ? <>التقنيات<br/><span>المتقدمة</span></> : <>Advanced<br/><span>Technologies</span></>}</h1>
        <p>{lang === 'ar' ? 'من الأنظمة الكمية إلى الآلات الذكية، استكشف المجالات التي تعيد تعريف الممكن والأشخاص الذين سيقودونها.' : 'From quantum systems to intelligent machines, explore the fields redefining what’s possible — and the people who will lead them.'}</p>
        <div className="catalogue-art" aria-hidden="true"><i/><i/><i/><span>∞</span></div>
      </section>
      <section className="catalogue-controls section-shell">
        <label className="search-box"><SearchIcon/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={lang === 'ar' ? 'ابحث في التقنيات أو المهن' : 'Search technologies or careers'}/><span>{visible.length.toString().padStart(2, '0')} {lang === 'ar' ? 'نتائج' : 'results'}</span></label>
        <div className="filter-row" role="group" aria-label="Filter technologies">{categories.map(category => <button className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}</div>
      </section>
      <section className="technology-grid section-shell" aria-live="polite">
        {visible.map((tech, index) => <TechnologyCard key={tech.id} technology={tech} index={index} lang={lang}/>)}
        {visible.length === 0 && <div className="no-results"><strong>No signal found.</strong><p>Try another technology, career or category.</p><button onClick={() => {setQuery('');setFilter('All')}}>Reset search</button></div>}
      </section>
      <section className="technology-cta section-shell"><span className="eyebrow"><i/>Find your match</span><h2>Which future technology<br/>fits the way you think?</h2><Button>Take the career test</Button></section>
    </main>
  )
}

function Footer({ setRoute }) {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-desktop">
        <div className="footer-bar">
          <Logo/>
          <nav className="footer-essential-links" aria-label="Footer navigation">
            <a href="#">Career Pathways</a>
            <a href="/technologies" onClick={(e)=>{e.preventDefault();setRoute('technologies');window.scrollTo(0,0)}}>Technologies</a>
            <a href="#">Opportunities</a>
            <a href="#">Talent Enablement</a>
          </nav>
          <a className="footer-atrc-link" href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer"><span>ATRC ecosystem</span><i><ArrowIcon diagonal/></i></a>
        </div>
        <div className="footer-meta">
          <span>© ATRC Talent Platform 2026</span>
          <span>Abu Dhabi, United Arab Emirates</span>
          <div><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Accessibility</a></div>
        </div>
      </div>

      <div className="footer-mobile">
        <div className="footer-top"><Logo/><p>Talent. Technology.<br/>Transformation.</p><a href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer">Visit ATRC.gov.ae <ArrowIcon diagonal/></a></div>
        <div className="footer-links"><div><small>EXPLORE</small><a href="#">Career Pathways</a><a href="/technologies" onClick={(e)=>{e.preventDefault();setRoute('technologies');window.scrollTo(0,0)}}>Advanced Technologies</a><a href="#">Talent Enablement</a></div><div><small>SUPPORT</small><a href="#">About</a><a href="#">Contact</a><a href="#">FAQ</a></div><div><small>LEGAL</small><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Accessibility</a></div></div>
        <div className="footer-bottom"><span>© ATRC Talent Platform 2026</span><span>Abu Dhabi, United Arab Emirates</span></div>
      </div>
    </footer>
  )
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.pathname === '/technologies' ? 'technologies' : 'home')
  const [lang, setLang] = useState('en')
  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr' }, [lang])
  useEffect(() => { window.history.replaceState(null, '', route === 'technologies' ? '/technologies' : '/'); document.title = route === 'technologies' ? 'Advanced Technologies — ATRC Talent' : 'ATRC Talent — Design your future' }, [route])
  return <div className="app"><Header lang={lang} setLang={setLang} route={route} setRoute={setRoute}/>{route === 'home' ? <Home setRoute={setRoute} lang={lang}/> : <Technologies lang={lang}/>}<Footer setRoute={setRoute}/></div>
}
