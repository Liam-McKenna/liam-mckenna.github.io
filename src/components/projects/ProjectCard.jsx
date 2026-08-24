import { Link } from 'react-router-dom'
import Badge from '../ui/Badge.jsx'

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="block rounded-xl2 border border-border bg-surface p-6 transition-colors hover:border-accent md:p-8"
    >
      <p className="font-mono text-sm text-muted">{project.period}</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-white">{project.title}</h3>
      <p className="mt-3 text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </Link>
  )
}
