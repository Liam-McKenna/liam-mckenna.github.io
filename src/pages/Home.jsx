import { Link } from 'react-router-dom'
import Button from '../components/ui/Button.jsx'
import StatTile from '../components/ui/StatTile.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { profile } from '../data/profile.js'
import { currentRoles } from '../data/experience.js'
import { projects } from '../data/projects.js'

const stats = [
  { value: 55, label: 'Automated tests' },
  { value: 150, label: 'Customer webshops' },
  { value: 30, label: 'Daily platform users', suffix: '+' },
  { value: 130, label: 'Schema attributes mapped', suffix: '+' },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <section className="text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-accent-soft">{profile.location}</p>
        <h1 className="mt-4 font-display text-5xl font-bold text-white md:text-6xl">{profile.name}</h1>
        <p className="mt-2 font-mono text-lg text-accent-bright">{profile.title}</p>
        <p className="mx-auto mt-6 max-w-2xl text-muted">{profile.summary}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={profile.resumeUrl} download>
            Download CV
          </Button>
          <Button href="/experience" variant="outline">
            View experience
          </Button>
        </div>
      </section>

      <section className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Featured work"
          title="Building test coverage where there was none"
          description={currentRoles[0].summary}
        />
        <Link to="/projects" className="font-mono text-sm text-accent-bright hover:underline">
          See the {projects[0].title} case study &rarr;
        </Link>
      </section>
    </div>
  )
}
