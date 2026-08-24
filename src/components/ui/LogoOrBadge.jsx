function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
}

export default function LogoOrBadge({ src, alt, size = 56 }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="rounded-lg bg-white object-contain p-2"
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className="flex items-center justify-center rounded-lg bg-surface2 font-display font-bold text-accent-bright"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initials(alt)}
    </div>
  )
}
