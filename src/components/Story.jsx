import { motion } from 'framer-motion'
import baboucheP0mpom from '../assets/babouche-pompom.jpg'
import './Story.css'

const EASE = [0.16, 1, 0.3, 1]

const NOTES = [
  {
    title: 'We buy the silver, not the finished piece',
    body: 'Most shops in the souk buy from wholesalers and never meet the maker. We supply the 925 stock and the coral to four workshops directly, so the person who raised the metal is paid for the piece rather than for a day of labour.',
  },
  {
    title: 'Enamel is fired, not painted',
    body: 'The green and red on the chokers is ground glass packed into soldered silver cells and fired until it flows. It takes three passes and pieces crack. That is why the runs are twenty and not two hundred.',
  },
  {
    title: 'Nothing is antiqued to look old',
    body: 'The coins hanging from the older designs are real, dated, and sourced from families selling down a collection. Everything else arrives new and bright, and is meant to age on you instead.',
  },
]

export default function Story() {
  return (
    <section className="story" id="story">
      <div className="story__shell shell">
        <div className="story__visual">
          <div className="story__pin">
            <div className="story__frame">
              <img src={baboucheP0mpom} alt="Hand-embroidered leather babouches with wool pompoms" loading="lazy" />
            </div>
            <p className="meta story__caption">Belgha in progress — Taroudant, four days of stitching</p>
          </div>
        </div>

        <div className="story__text">
          <h2 className="story__title">How this actually gets made</h2>

          {NOTES.map((note, i) => (
            <motion.article
              className="story__note"
              key={note.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
            >
              <h3 className="story__note-title">{note.title}</h3>
              <p className="story__note-body">{note.body}</p>
            </motion.article>
          ))}

          <a className="story__link" href="#contact">
            Ask us about a commission
          </a>
        </div>
      </div>
    </section>
  )
}
