import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
const chokerEnamel = ""
const coralNecklace = ""
const kaftanSaffron = ""
import './Hero.css'

const EASE = [0.16, 1, 0.3, 1]

const VITRINE = [
  { src: coralNecklace, alt: 'Coral and silver bead necklace', caption: 'Coral, Anti-Atlas' },
  { src: chokerEnamel, alt: 'Green and coral enamel silver choker', caption: 'Enamel, Tiznit' },
  { src: kaftanSaffron, alt: 'Saffron kaftan with braided sfifa trim', caption: 'Crepe, Souss' },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const wordmarkFade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const vitrineY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <section className="hero" ref={ref}>
      <div className="hero__inner shell">
        <motion.div className="hero__type" style={{ y: wordmarkY, opacity: wordmarkFade }}>
          <div className="hero__mask">
            <motion.h1
              className="hero__wordmark"
              initial={{ y: '106%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
            >
              Tazerzitt
            </motion.h1>
          </div>

          <motion.div
            className="hero__rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
          />

          <div className="hero__below">
            <motion.p
              className="hero__lede"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            >
              A <em>tazerzitt</em> is the silver fibula an Amazigh woman pins at her shoulder to
              hold her cloth. We work with silversmiths in Tiznit, weavers in the Souss and
              leatherworkers in Taroudant, and release what they make in runs of twenty or fewer.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.82 }}
            >
              <a className="hero__btn hero__btn--solid" href="#collection">
                See what's in stock
              </a>
              <a className="hero__btn hero__btn--ghost" href="#story">
                How it's made
              </a>
            </motion.div>
          </div>
        </motion.div>

        <motion.ul
          className="hero__vitrine"
          style={{ y: vitrineY }}
          initial="hidden"
          animate="shown"
          variants={{ shown: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } } }}
        >
          {VITRINE.map((item) => (
            <motion.li
              key={item.alt}
              className="hero__slide"
              variants={{
                hidden: { opacity: 0, y: 44, clipPath: 'inset(12% 0 0 0)' },
                shown: {
                  opacity: 1,
                  y: 0,
                  clipPath: 'inset(0% 0 0 0)',
                  transition: { duration: 1, ease: EASE },
                },
              }}
            >
              <div className="hero__frame">
                <img src={item.src} alt={item.alt} loading="eager" />
              </div>
              <span className="meta hero__caption">{item.caption}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="hero__marquee" aria-hidden="true">
        <div className="hero__marquee-track">
          {Array.from({ length: 2 }).map((_, block) => (
            <div className="hero__marquee-block" key={block}>
              <span>Handmade in Morocco</span>
              <span className="hero__dot" />
              <span className="tifinagh">ⵜⴰⵣⵔⵣⵉⵜ</span>
              <span className="hero__dot" />
              <span>Silver 925</span>
              <span className="hero__dot" />
              <span>Small runs</span>
              <span className="hero__dot" />
              <span className="tifinagh">ⵜⴰⵎⴰⵣⵉⵖⵜ</span>
              <span className="hero__dot" />
              <span>Ships worldwide</span>
              <span className="hero__dot" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
