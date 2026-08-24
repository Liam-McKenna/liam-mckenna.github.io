import { useCountUp } from '../../hooks/useCountUp.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

export default function StatTile({ value, label, suffix = '' }) {
  const [ref, visible] = useScrollReveal({ threshold: 0.4 })
  const count = useCountUp(value, { start: visible })

  return (
    <div ref={ref} className="rounded-xl2 border border-border bg-surface px-6 py-8 text-center">
      <p className="font-display text-4xl font-bold text-highlight md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 font-mono text-sm uppercase tracking-wider text-muted">{label}</p>
    </div>
  )
}
