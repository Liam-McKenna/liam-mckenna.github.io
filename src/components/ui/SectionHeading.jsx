export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && <p className="font-mono text-sm uppercase tracking-widest text-accent-soft">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-muted">{description}</p>}
    </div>
  )
}
