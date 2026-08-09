const logoDots = [
  [82.2, 33.2, 7.1], [83.6, 54.2, 9], [76.9, 69.2, 2.8], [33.5, 65.7, 2.6], [42.9, 68.4, 3.7], [54.2, 66.2, 4.6], [63.5, 57.3, 6],
  [33, 27.6, 2.6], [25.9, 34.5, 3.7], [22.3, 45.2, 4.6], [25.3, 57.7, 6], [66.5, 46.7, 2.7], [64.4, 37.1, 3.8], [56.9, 28.4, 4.6],
  [44.2, 24.6, 5.9], [48.8, 6.8, 2.9], [60.1, 9.8, 4.2], [72.6, 18, 5.8], [8.1, 62.6, 2.8], [4.7, 51.1, 4.1], [5.7, 36.2, 5.7],
  [14.2, 20.4, 6.9], [31.8, 8.8, 8.7], [68.7, 77.7, 4], [54.9, 84.3, 5.8], [36.7, 85.1, 7.1], [17.8, 75.7, 8.9],
]

export function LogoMark({ className = 'brand-orbit' }) {
  return (
    <svg className={className} viewBox="0 0 93 93" aria-hidden="true">
      {logoDots.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}
    </svg>
  )
}

export function Logo({ lang = 'en' }) {
  return (
    <a className="brand" href="/" aria-label={lang === 'ar' ? 'الصفحة الرئيسية لمواهب ATRC' : 'ATRC Talent home'}>
      <LogoMark />
      <span className="brand-copy">{lang === 'ar' ? <><b>مجلس أبحاث<br/>التكنولوجيا المتطورة</b><small>مواهب ATRC</small></> : <><b>ADVANCED<br/>TECHNOLOGY</b><small>RESEARCH COUNCIL</small></>}</span>
    </a>
  )
}
