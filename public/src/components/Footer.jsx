import { useState } from 'react'
import './Footer.css'

const COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Silver', href: '#collection' },
      { label: 'Dress', href: '#collection' },
      { label: 'Leather', href: '#collection' },
      { label: 'Commissions', href: '#contact' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Shipping and returns', href: '#contact' },
      { label: 'Caring for silver', href: '#story' },
      { label: 'Size guide', href: '#collection' },
      { label: 'Track an order', href: '#contact' },
    ],
  },
  {
    heading: 'Find us',
    links: [
      { label: 'Instagram', href: 'https://instagram.com', external: true },
      { label: 'TikTok', href: 'https://tiktok.com', external: true },
      { label: 'WhatsApp', href: 'https://wa.me/212600000000', external: true },
      { label: 'hello@tazerzitt.store', href: 'mailto:hello@tazerzitt.store' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')

  const submit = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!valid) {
      setState('invalid')
      return
    }
    setState('done')
    setEmail('')
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer__shell shell">
        <div className="footer__top">
          <div className="footer__signup">
            <h2 className="footer__title">
              New runs go out
              <br />
              on Thursdays
            </h2>
            <p className="footer__blurb">
              One email when a piece lands, and nothing else. Most runs are gone inside a week.
            </p>

            <div className="footer__field">
              <input
                className="footer__input"
                type="email"
                inputMode="email"
                placeholder="your@email.com"
                aria-label="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (state !== 'idle') setState('idle')
                }}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
              />
              <button className="footer__submit" onClick={submit}>
                {state === 'done' ? 'Signed up' : 'Sign up'}
              </button>
            </div>

            <p className={`footer__msg ${state !== 'idle' ? 'is-shown' : ''}`} role="status">
              {state === 'invalid' && 'That address is missing an @ or a domain.'}
              {state === 'done' && "You're on the list. Look out for Thursday."}
            </p>
          </div>

          <nav className="footer__cols" aria-label="Footer">
            {COLUMNS.map((col) => (
              <div className="footer__col" key={col.heading}>
                <h3 className="footer__col-heading">{col.heading}</h3>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {/* Hna tzadet la balise <a> */}
                      <a
                        className="footer__link"
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer__wordmark" aria-hidden="true">
          <img className="footer__logo" src="../public/logo.jpg" alt="logo" width="72" height="72" />
          <span>Tazerzitt</span>
        </div>

        <div className="footer__base">
          <span>© {new Date().getFullYear()} Tazerzitt Store — Agadir, Morocco</span>
          <span className="tifinagh footer__tifinagh">ⵜⴰⵣⵔⵣⵉⵜ ⵜⴰⵎⴰⵣⵉⵖⵜ</span>
          <a href="#top" className="footer__top-link">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}