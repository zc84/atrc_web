import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowIcon, SearchIcon, TechGlyph } from './icons.jsx'
import { pathways, stats, technologies } from './data.js'

const copy = {
  en: {
    nav: ['Career Pathways', 'Advanced Technologies', 'Talent Enablement', 'Career Planner'],
    quiz: 'Take the Career Test',
    login: 'Login',
    eyebrow: 'Your future starts here',
    hero: <>Design your future.<br/><span>Build what’s next.</span></>,
    intro: 'Discover the technologies, pathways and opportunities shaping the UAE — and find where your curiosity can take you.',
    explorePath: 'Explore your path', discoverTech: 'Discover technologies', exploreFuture: 'EXPLORE YOUR FUTURE', orbitLabel: '10 pathways • endless possibilities',
  },
  ar: {
    nav: ['المسارات المهنية', 'التقنيات المتقدمة', 'تمكين المواهب', 'مخطط المسار المهني'],
    quiz: 'ابدأ اختبار المسار',
    login: 'تسجيل الدخول',
    eyebrow: 'مستقبلك يبدأ من هنا',
    hero: <>صمّم مستقبلك.<br/><span>وابنِ القادم.</span></>,
    intro: 'اكتشف التقنيات والمسارات والفرص التي ترسم مستقبل دولة الإمارات، واعرف إلى أين يقودك فضولك.',
    explorePath: 'استكشف مسارك', discoverTech: 'اكتشف التقنيات', exploreFuture: 'استكشف مستقبلك', orbitLabel: '١٠ مسارات • إمكانات بلا حدود',
  },
}

function Logo() {
  return (
    <a className="brand" href="/" aria-label="ATRC Talent home">
      <span className="brand-orbit" aria-hidden="true">{Array.from({length: 12}, (_, i) => <i key={i} />)}</span>
      <span className="brand-copy"><b>ADVANCED<br/>TECHNOLOGY</b><small>RESEARCH COUNCIL</small></span>
    </a>
  )
}

function Button({ children, variant = 'primary', href = '#', onClick, className = '' }) {
  return <a className={`button button--${variant} ${className}`} href={href} onClick={onClick}><span>{children}</span><i><ArrowIcon diagonal={variant === 'text'} /></i></a>
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
  const nodes = technologies.slice(0, 6)
  return (
    <div className="future-orbit" aria-label="Explore future technologies">
      <div className="orbit-ring orbit-ring--outer"/><div className="orbit-ring orbit-ring--inner"/>
      <button className="orbit-core" onClick={onOpen}><span>{t.exploreFuture}</span><i><ArrowIcon /></i></button>
      {nodes.map((tech, index) => <div className="orbit-node" style={{'--index': index, '--tone': tech.color}} key={tech.id}><TechGlyph type={tech.icon}/></div>)}
      <span className="orbit-label">{t.orbitLabel}</span>
    </div>
  )
}

function VideoFeature({ lang }) {
  const frameRef = useRef(null)
  const videoRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect() }
    }, { rootMargin: '240px' })
    if (frameRef.current) observer.observe(frameRef.current)
    return () => observer.disconnect()
  }, [])

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

  return (
    <section className="video-feature section-shell" ref={frameRef} aria-label={lang === 'ar' ? 'فيلم مجلس أبحاث التكنولوجيا المتطورة' : 'ATRC film'}>
      <div className="video-frame">
        {shouldLoad && <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" onCanPlay={startWhenReady} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
          <source src="https://prod-atrc-backend-webfiles-bmg3gcf9fwf2f9es.a02.azurefd.net/static/atrc.mp4" type="video/mp4" />
        </video>}
        <div className="video-vignette" />
        <div className="video-caption">
          <span className="eyebrow"><i/>{lang === 'ar' ? 'داخل عصر الذكاء' : 'Inside the intelligence age'}</span>
          <h2>{lang === 'ar' ? <>حيث يتحوّل الطموح<br/>إلى أثر.</> : <>Where ambition<br/>becomes impact.</>}</h2>
          <a href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer">{lang === 'ar' ? 'اكتشف منظومة ATRC' : 'Discover the ATRC ecosystem'} <ArrowIcon diagonal /></a>
        </div>
        <div className="video-controls">
          <button onClick={togglePlayback} disabled={!shouldLoad} aria-label={playing ? 'Pause film' : 'Play film'}>{playing ? 'Ⅱ' : '▶'}</button>
          <button onClick={toggleSound} disabled={!shouldLoad} aria-label={muted ? 'Unmute film' : 'Mute film'}>{muted ? 'SOUND OFF' : 'SOUND ON'}</button>
        </div>
        <span className="video-index">FILM 01 / ATRC</span>
      </div>
    </section>
  )
}

function Home({ setRoute, lang }) {
  const t = copy[lang]
  return (
    <main id="home">
      <section className="hero-section section-shell">
        <div className="hero-glow"/><div className="hero-grid"/>
        <div className="hero-copy reveal">
          <span className="eyebrow"><i/>{t.eyebrow}</span>
          <h1>{t.hero}</h1>
          <p>{t.intro}</p>
          <div className="hero-ctas"><Button href="#pathways">{t.explorePath}</Button><Button variant="text" href="/technologies" onClick={(e) => {e.preventDefault(); setRoute('technologies'); window.scrollTo(0,0)}}>{t.discoverTech}</Button></div>
        </div>
        <OrbitalFuture t={t} onOpen={() => {setRoute('technologies'); window.scrollTo(0,0)}} />
        <div className="hero-foot"><span>SCROLL TO DISCOVER</span><i/></div>
      </section>

      <section className="signal-section section-shell">
        <div className="section-intro"><span className="eyebrow"><i/>Signals of the future</span><h2>The future is already<br/><span>in motion.</span></h2></div>
        <div className="stats-grid">
          {stats.map((stat, index) => <article className="stat" key={stat.value}><span>0{index + 1}</span><strong>{stat.value}</strong><p>{stat.label}</p><small>{stat.source}</small></article>)}
        </div>
      </section>

      <VideoFeature lang={lang} />

      <section className="mission-section section-shell">
        <div className="mission-visual" aria-hidden="true"><span/><i/><b>UAE<br/>2071</b></div>
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
      <div className="footer-top"><Logo/><p>Talent. Technology.<br/>Transformation.</p><a href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer">Visit ATRC.gov.ae <ArrowIcon diagonal/></a></div>
      <div className="footer-links"><div><small>EXPLORE</small><a href="#">Career Pathways</a><a href="/technologies" onClick={(e)=>{e.preventDefault();setRoute('technologies');window.scrollTo(0,0)}}>Advanced Technologies</a><a href="#">Talent Enablement</a></div><div><small>SUPPORT</small><a href="#">About</a><a href="#">Contact</a><a href="#">FAQ</a></div><div><small>LEGAL</small><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Accessibility</a></div></div>
      <div className="footer-bottom"><span>© ATRC Talent Platform 2026</span><span>Abu Dhabi, United Arab Emirates</span></div>
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
