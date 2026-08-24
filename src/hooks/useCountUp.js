import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, { duration = 1200, start = false } = {}) {
  const [value, setValue] = useState(0)
  const frame = useRef(null)

  useEffect(() => {
    if (!start) return undefined

    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick)
      }
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [start, target, duration])

  return value
}
