import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Replaces the browser's native step scroll with Lenis' interpolated scroll.
 *
 * Lenis keeps the real document scroll position (it lerps scrollTop rather than
 * transforming a wrapper), so `position: sticky`, IntersectionObserver and
 * Framer Motion's `whileInView` all keep working normally.
 *
 * Returns a ref to the instance so components can call lenis.stop() / start()
 * (used by the mobile menu to lock the page).
 */
export default function useSmoothScroll() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.7,
      lerp: 0.1,
    })

    lenisRef.current = lenis

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Route every in-page anchor through Lenis instead of the native jump.
    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor) return

      const hash = anchor.getAttribute('href')
      if (!hash || hash.length < 2) return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()
      lenis.scrollTo(target, { offset: -90, duration: 1.4 })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
