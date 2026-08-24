import SectionHeading from '../components/ui/SectionHeading.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import { projects } from '../data/projects.js'

export default function Projects() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        description="Test infrastructure built from scratch, not bolted onto an existing suite."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  )
}
