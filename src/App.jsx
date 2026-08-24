import { Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import { routeElements } from './router.jsx'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center text-muted">Loading…</div>}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {routeElements.map(({ path, Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PageTransition>
                      <Component />
                    </PageTransition>
                  }
                />
              ))}
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
