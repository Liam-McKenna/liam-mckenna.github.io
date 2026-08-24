import { lazy } from 'react'

const Home = lazy(() => import('./pages/Home.jsx'))
const Experience = lazy(() => import('./pages/Experience.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
]

export const routeElements = [
  { path: '/', Component: Home },
  { path: '/experience', Component: Experience },
  { path: '/projects', Component: Projects },
  { path: '/projects/:slug', Component: ProjectDetail },
  { path: '/about', Component: About },
  { path: '*', Component: NotFound },
]
