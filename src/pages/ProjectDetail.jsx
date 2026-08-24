import { useParams, Link, Navigate } from 'react-router-dom'
import StatTile from '../components/ui/StatTile.jsx'
import Badge from '../components/ui/Badge.jsx'
import { projects } from '../data/projects.js'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <Link to="/projects" className="font-mono text-sm text-accent-bright hover:underline">
        &larr; All projects
      </Link>

      <p className="mt-6 font-mono text-sm text-muted">{project.period}</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-white">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-muted">{project.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {project.stats.map((stat) => (
          <StatTile key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>

      <div className="mt-12 space-y-8">
        {project.highlights.map((highlight) => (
          <div key={highlight.title}>
            <h2 className="font-display text-xl font-semibold text-white">{highlight.title}</h2>
            <p className="mt-2 text-muted">{highlight.detail}</p>
          </div>
        ))}
      </div>

      {!project.repoUrl && <p className="mt-12 font-mono text-sm text-muted">Repo link coming soon.</p>}
    </div>
  )
}
