import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import LogoOrBadge from '../ui/LogoOrBadge.jsx'

export default function EarlierRolesAccordion({ roles }) {
  const [openId, setOpenId] = useState(null)

  function toggle(id) {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <div className="divide-y divide-border rounded-xl2 border border-border bg-surface">
      {roles.map((role) => {
        const isOpen = openId === role.id
        return (
          <div key={role.id}>
            <button
              type="button"
              onClick={() => toggle(role.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <div className="flex items-center gap-4">
                <LogoOrBadge src={role.logo} alt={role.company} size={40} />
                <div>
                  <p className="font-display text-white">{role.title}</p>
                  <p className="font-mono text-sm text-muted">{role.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden font-mono text-sm text-muted md:block">
                  {role.start} – {role.end}
                </span>
                {isOpen ? (
                  <AiOutlineMinus className="text-accent-bright" />
                ) : (
                  <AiOutlinePlus className="text-accent-bright" />
                )}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm text-muted">{role.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
