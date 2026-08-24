import SectionHeading from '../components/ui/SectionHeading.jsx'
import Badge from '../components/ui/Badge.jsx'
import { skillGroups } from '../data/skills.js'
import { education } from '../data/education.js'

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        eyebrow="About"
        title="From graphic design to test automation"
        description="Five years of hands-on design work before software engineering means UI and documentation get the same attention as the code underneath them."
      />

      <section className="grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="rounded-xl2 border border-border bg-surface p-6">
            <h3 className="font-display text-lg font-semibold text-white">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-16">
        <h3 className="mb-6 font-display text-2xl font-semibold text-white">Education</h3>
        <div className="space-y-6">
          {education.map((entry) => (
            <div key={entry.id} className="rounded-xl2 border border-border bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-lg font-semibold text-white">{entry.title}</h4>
                <span className="font-mono text-sm text-muted">{entry.period}</span>
              </div>
              <p className="mt-1 font-mono text-sm text-accent-bright">{entry.institution}</p>
              <p className="mt-3 text-muted">{entry.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
