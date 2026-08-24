import { useParams } from 'react-router-dom'

export default function ProjectDetail() {
  const { slug } = useParams()
  return <div className="mx-auto max-w-5xl px-6 py-24">Project: {slug}</div>
}
