import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
const logo = ""
import './Navbar.css'

const LINKS = [
  { href: '#collection', label: 'Collection' },
  { href: '#story', label: 'Our story' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ lenisRef }) {
  const [lifted, setLifted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Freeze the page behind the open menu.
  useEffect(() => {
    const lenis = lenisRef?.current
    if (menuOpen) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, lenisRef])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className={`nav ${lifted ? 'nav--lifted' : ''}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="#top" aria-label="Tazerzitt Store, back to top">
            <img className="nav__logo" src={logo} alt="" width="40" height="40" />
            <span className="nav__wordmark">
              Tazerzitt
              <span className="nav__sub tifinagh">ⵜⴰⵣⵔⵣⵉⵜ</span>
            </span>
          </a>

          <nav className="nav__links" aria-label="Main">
            {LINKS.map((link) => (
              <a key={link.href} className="nav__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav__end">
            <a className="nav__cta" href="#collection">
              Shop the collection
            </a>
            <button
              className="nav__burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`nav__burger-bar ${menuOpen ? 'is-x-top' : ''}`} />
              <span className={`nav__burger-bar ${menuOpen ? 'is-x-bottom' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav__panel"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="nav__panel-links" aria-label="Mobile">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="nav__panel-link"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="nav__panel-foot">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <span>Agadir, Morocco</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
