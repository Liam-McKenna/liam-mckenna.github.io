import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { profile } from '../../data/profile.js'

export default function Footer() {
  return (
    <footer className="border-t border-border/60 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-display text-white">{profile.name}</p>
          <p className="text-sm text-muted">{profile.location}</p>
        </div>

        <div className="flex items-center gap-5 text-muted">
          <a href={`mailto:${profile.email}`} aria-label="Email" className="hover:text-accent-bright">
            <FaEnvelope size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-accent-bright"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-accent-bright"
          >
            <FaGithub size={18} />
          </a>
        </div>

        <a
          href={profile.resumeUrl}
          download
          className="rounded-full border border-accent px-5 py-2 font-mono text-sm text-accent-bright transition-colors hover:bg-accent hover:text-white"
        >
          Download CV
        </a>
      </div>
    </footer>
  )
}
