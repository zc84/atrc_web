import { useEffect, useRef, useState } from 'react'
import { cinematicFilmCaptions, filmCaptions, getVideoCaptionVariant } from '../../app/localisation/filmCaptions.jsx'
import { uiCopy } from '../../app/localisation/uiCopy.jsx'
import { ArrowIcon, SoundIcon } from '../../shared/ui/icons.jsx'

export function VideoFeature({ lang }) {
  const frameRef = useRef(null)
  const videoRef = useRef(null)
  const [captionVariant] = useState(getVideoCaptionVariant)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [captionIndex, setCaptionIndex] = useState(0)
  const [filmDuration, setFilmDuration] = useState(41.215)
  const captions = filmCaptions[lang]
  const cinematicCaptions = cinematicFilmCaptions[lang]
  const ui = uiCopy[lang]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect() }
    }, { rootMargin: '240px' })
    if (frameRef.current) observer.observe(frameRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad || captionVariant !== 'a') return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setInterval(() => setCaptionIndex(index => (index + 1) % captions.length), 5500)
    return () => clearInterval(id)
  }, [captionVariant, shouldLoad, captions.length])

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

  const syncFilmDuration = () => {
    if (Number.isFinite(videoRef.current?.duration)) setFilmDuration(videoRef.current.duration)
  }

  const caption = captions[captionIndex % captions.length]

  return (
    <section className="video-feature section-shell" ref={frameRef} aria-label={lang === 'ar' ? 'فيلم مجلس أبحاث التكنولوجيا المتطورة' : 'ATRC film'} data-video-captions-variant={captionVariant}>
      <div className="video-frame">
        {shouldLoad && <video ref={videoRef} autoPlay muted loop playsInline preload="metadata" onLoadedMetadata={syncFilmDuration} onCanPlay={startWhenReady} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
          <source src="https://prod-atrc-backend-webfiles-bmg3gcf9fwf2f9es.a02.azurefd.net/static/atrc.mp4" type="video/mp4" />
        </video>}
        <div className="video-vignette" />
        {captionVariant === 'a' ? (
          <div className="video-caption" key={captionIndex}>
            <span className="eyebrow"><i/>{caption.eyebrow}</span>
            <h2>{caption.heading}</h2>
            <a href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer">{lang === 'ar' ? 'اكتشف منظومة ATRC' : 'Discover the ATRC ecosystem'} <ArrowIcon diagonal /></a>
          </div>
        ) : (
          <div className={`video-cinematic ${playing ? 'is-playing' : ''}`} style={{'--film-duration': `${filmDuration}s`}}>
            <div className="video-cinematic-crawl">
              {cinematicCaptions.map((item, index) => (
                <article className={item.cta ? 'is-finale' : ''} key={item.eyebrow}>
                  <span><i/>{String(index + 1).padStart(2, '0')} · {item.eyebrow}</span>
                  <h2>{item.heading}</h2>
                  <p>{item.body}</p>
                  {item.cta && <a href="https://www.atrc.gov.ae/" target="_blank" rel="noreferrer">{lang === 'ar' ? 'اكتشف منظومة ATRC' : 'Discover the ATRC ecosystem'} <ArrowIcon diagonal /></a>}
                </article>
              ))}
            </div>
          </div>
        )}
        <div className="video-controls">
          <button onClick={togglePlayback} disabled={!shouldLoad} aria-label={playing ? ui.filmPause : ui.filmPlay}>{playing ? 'Ⅱ' : '▶'}</button>
          <button onClick={toggleSound} disabled={!shouldLoad} aria-label={muted ? ui.filmUnmute : ui.filmMute}><SoundIcon muted={muted}/></button>
        </div>
      </div>
    </section>
  )
}
