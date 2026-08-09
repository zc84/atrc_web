export function ArrowIcon({ diagonal = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={diagonal ? 'M6.5 17.5 17.5 6.5M8 6.5h9.5V16' : 'M4.5 12h15m-5.5-5.5L19.5 12 14 17.5'} />
    </svg>
  )
}

export function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.3 15.3 5 5M10.5 7.5v6M7.5 10.5h6"/></svg>
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.6"/>
      <path d="M10 5h4M10.5 18.5h3"/>
    </svg>
  )
}

export function TechGlyph({ type }) {
  const paths = {
    neural: <><path d="M32 16v32M16 32h32M21 21l22 22M43 21 21 43"/><circle cx="32" cy="16" r="4"/><circle cx="16" cy="32" r="4"/><circle cx="48" cy="32" r="4"/><circle cx="32" cy="48" r="4"/><circle cx="32" cy="32" r="6"/><path d="M32 26v-6M26 32h-6M38 32h6M32 38v6"/></>,
    orbit: <><ellipse cx="32" cy="32" rx="25" ry="11"/><ellipse cx="32" cy="32" rx="11" ry="25" transform="rotate(38 32 32)"/><ellipse cx="32" cy="32" rx="21" ry="8" transform="rotate(-38 32 32)"/><circle cx="32" cy="32" r="4"/><circle cx="53" cy="28" r="2.5"/></>,
    rocket: <><path d="M27 46c-4-9-2-23 12-35 2-2 5-4 8-5 1 4 0 8-1 11-5 14-14 24-24 29l5 3Z"/><path d="M27 38 16 40l7-9M38 46l1 10 7-10"/><circle cx="39" cy="23" r="4"/><path d="M25 49c-3 2-5 5-5 8m-3-3 8-2"/></>,
    robot: <><rect x="13" y="19" width="38" height="30" rx="7"/><path d="M32 19v-7m-6 37v7m12-7v7M20 29h24M20 41h24"/><circle cx="25" cy="35" r="3"/><circle cx="39" cy="35" r="3"/><path d="M28 43h8M17 26h-5m40 0h-5"/></>,
    energy: <><path d="m37 6-21 29h14l-3 23 21-33H34l3-19Z"/><path d="m13 36 6-1m28 0 5-1"/></>,
    shield: <><path d="M32 7 50 15v13c0 14-8 23-18 29-10-6-18-15-18-29V15L32 7Z"/><path d="m23 31 7 7 13-15"/><path d="M32 14v4M23 18l3 3M41 18l-3 3"/></>,
    crystal: <><path d="m32 6 21 18-8 29H19l-8-29L32 6Z"/><path d="m11 24 21 9 21-9M32 6v27m-13 20 13-20 13 20M24 16l8 17 8-17"/></>,
    beam: <><circle cx="15" cy="32" r="8"/><circle cx="15" cy="32" r="3"/><path d="m23 27 31-13M23 32h35M23 37l31 13"/><path d="M42 23h5M42 41h5"/></>,
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
