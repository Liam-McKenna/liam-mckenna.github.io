import LogoOrBadge from '../ui/LogoOrBadge.jsx'
import Badge from '../ui/Badge.jsx'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

export default function RoleCard({ role }) {
  const [ref, visible] = useScrollReveal()

  return (
    <article
      ref={ref}
      className={`rounded-xl2 border border-border bg-surface p-6 transition-all duration-500 md:p-8 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <LogoOrBadge src={role.logo} alt={role.company} />
          <div>
            <h3 className="font-display text-xl font-semibold text-white">{role.title}</h3>
            <p className="font-mono text-sm text-accent-bright">
              {role.company} — {role.location}
            </p>
          </div>
        </div>
        <p className="font-mono text-sm text-muted">
          {role.start} – {role.end}
        </p>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-muted md:text-base">
        {role.bullets.map((bullet) => (
          <li
            key={bullet}
            className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent before:content-['']"
          >
            {bullet}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {role.skills.map((skill) => (
          <Badge key={skill}>{skill}</Badge>
        ))}
      </div>
    </article>
  )
}
