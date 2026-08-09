export function ArrowIcon({ diagonal = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={diagonal ? 'M7 17 17 7M8 7h9v9' : 'M5 12h14m-5-5 5 5-5 5'} />
    </svg>
  )
}

export function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>
}

export function TechGlyph({ type }) {
  const paths = {
    neural: <><circle cx="30" cy="23" r="5"/><circle cx="17" cy="40" r="4"/><circle cx="44" cy="42" r="4"/><path d="m26 27-7 10m15-10 8 11M21 40h19"/></>,
    orbit: <><ellipse cx="32" cy="32" rx="24" ry="10"/><ellipse cx="32" cy="32" rx="10" ry="24" transform="rotate(35 32 32)"/><circle cx="32" cy="32" r="4"/></>,
    rocket: <><path d="M24 43c-5-10 0-25 15-32 6 14 1 28-9 34l-6-2Z"/><path d="m22 38-8 3 6-12m12 17-1 8 10-8"/><circle cx="33" cy="25" r="4"/></>,
    robot: <><rect x="14" y="20" width="36" height="27" rx="6"/><path d="M32 20v-7m-7 34v6m14-6v6"/><circle cx="25" cy="32" r="2"/><circle cx="39" cy="32" r="2"/><path d="M25 40h14"/></>,
    energy: <><path d="M36 7 17 34h13l-3 23 20-31H34l2-19Z"/></>,
    shield: <><path d="M32 8 49 15v13c0 13-8 22-17 28-9-6-17-15-17-28V15l17-7Z"/><path d="m24 32 6 6 11-13"/></>,
    crystal: <><path d="m32 7 20 17-8 27H20L12 24 32 7Z"/><path d="m12 24 20 8 20-8M32 7v25m-12 19 12-19 12 19"/></>,
    beam: <><circle cx="18" cy="32" r="7"/><path d="m25 28 28-12M25 32h31M25 36l28 12"/></>,
  }
  return <svg className="tech-glyph" viewBox="0 0 64 64" aria-hidden="true">{paths[type]}</svg>
}

export function SoundIcon({ muted }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9v6h3.5L12 19V5L7.5 9H4Z"/>
      {muted ? <path d="m16.5 9.5 5 5m0-5-5 5"/> : <path d="M16.3 8.8a5 5 0 0 1 0 6.4M19 6a9 9 0 0 1 0 12"/>}
    </svg>
  )
}

export function StatGlyph({ type }) {
  const paths = {
    data: <><rect x="8" y="28" width="9" height="20" rx="2"/><rect x="23" y="16" width="9" height="32" rx="2"/><rect x="38" y="6" width="9" height="42" rx="2"/></>,
    speed: <><path d="M8 40a24 24 0 1 1 48 0"/><path d="M32 40 45 22"/><circle cx="32" cy="40" r="3"/></>,
    bolt: <path d="M36 5 15 33h13l-4 26 23-32H34l2-22Z"/>,
  }
  return <svg className="stat-glyph" viewBox="0 0 54 54" aria-hidden="true">{paths[type]}</svg>
}
