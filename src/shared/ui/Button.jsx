import { Link } from 'react-router-dom'
import { ArrowIcon } from './icons.jsx'

export function Button({ children, variant = 'primary', to, href = '#', onClick, className = '' }) {
  const content = <><span>{children}</span><i><ArrowIcon diagonal={variant === 'text'} /></i></>
  const classes = `button button--${variant} ${className}`
  if (to) return <Link className={classes} to={to} onClick={onClick}>{content}</Link>
  return <a className={classes} href={href} onClick={onClick}>{content}</a>
}
