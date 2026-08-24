import { Link } from 'react-router-dom'

export default function Button({ href, to, children, variant = 'solid', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 font-mono text-sm transition-colors'
  const variants = {
    solid: 'bg-accent text-white hover:bg-accent-soft',
    outline: 'border border-accent text-accent-bright hover:bg-accent hover:text-white',
  }
  const className = `${base} ${variants[variant]}`

  if (to) {
    return (
      <Link to={to} className={className} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={className} {...props}>
      {children}
    </button>
  )
}
