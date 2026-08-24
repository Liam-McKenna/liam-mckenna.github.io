import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCountUp } from './useCountUp.js'

describe('useCountUp', () => {
  let frameQueue
  let now

  beforeEach(() => {
    frameQueue = []
    now = 0
    vi.stubGlobal('requestAnimationFrame', (cb) => {
      frameQueue.push(cb)
      return frameQueue.length
    })
    vi.stubGlobal('cancelAnimationFrame', () => {})
    vi.spyOn(performance, 'now').mockImplementation(() => now)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  function flushFrame(elapsedMs) {
    now += elapsedMs
    const callbacks = frameQueue.splice(0, frameQueue.length)
    act(() => {
      callbacks.forEach((cb) => cb(now))
    })
  }

  it('stays at 0 until start is true', () => {
    const { result } = renderHook(() => useCountUp(100, { start: false }))
    expect(result.current).toBe(0)
  })

  it('counts up partway through the animation', () => {
    const { result, rerender } = renderHook(
      ({ start }) => useCountUp(100, { duration: 200, start }),
      { initialProps: { start: false } },
    )

    rerender({ start: true })
    flushFrame(50)

    expect(result.current).toBeGreaterThan(0)
    expect(result.current).toBeLessThan(100)
  })

  it('reaches the target once the duration elapses', () => {
    const { result, rerender } = renderHook(
      ({ start }) => useCountUp(100, { duration: 200, start }),
      { initialProps: { start: false } },
    )

    rerender({ start: true })
    flushFrame(50)
    flushFrame(200)

    expect(result.current).toBe(100)
  })
})
