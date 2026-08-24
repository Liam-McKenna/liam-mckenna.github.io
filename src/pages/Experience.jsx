import SectionHeading from '../components/ui/SectionHeading.jsx'
import RoleCard from '../components/experience/RoleCard.jsx'
import EarlierRolesAccordion from '../components/experience/EarlierRolesAccordion.jsx'
import { currentRoles, earlierRoles } from '../data/experience.js'

export default function Experience() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading
        eyebrow="Experience"
        title="Four years across QA and full-stack product work"
        description="Sole ownership of test coverage and frontend platforms, not just contributions to them."
      />

      <div className="space-y-8">
        {currentRoles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>

      <div className="mt-16">
        <h3 className="mb-6 font-display text-2xl font-semibold text-white">Earlier roles</h3>
        <EarlierRolesAccordion roles={earlierRoles} />
      </div>
    </div>
  )
}
