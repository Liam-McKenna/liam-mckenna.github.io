export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-accent-bright">
      {children}
    </span>
  )
}
