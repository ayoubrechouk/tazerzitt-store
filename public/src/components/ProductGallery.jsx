import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { products, categories, formatPrice } from '../data/products'
import './ProductGallery.css'

const EASE = [0.16, 1, 0.3, 1]

/* -------------------------------------------------------------------------
   Card — one square Instagram-style tile.
   Handles the multi-frame carousel, the zoom, the overlay and the actions.
   ------------------------------------------------------------------------- */
function ProductCard({ product, index }) {
  const [frame, setFrame] = useState(0)
  const frames = product.images
  const multi = frames.length > 1

  const go = (step) => (event) => {
    event.preventDefault()
    event.stopPropagation()
    setFrame((f) => (f + step + frames.length) % frames.length)
  }

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.75, ease: EASE, delay: (index % 2) * 0.09 }}
    >
      <div className="card__media">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={frame}
            className="card__img"
            src={frames[frame]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </AnimatePresence>

        <span className="card__scrim" aria-hidden="true" />

        {multi && (
          <>
            <button className="card__arrow card__arrow--prev" onClick={go(-1)} aria-label="Previous image">
              <Chevron direction="left" />
            </button>
            <button className="card__arrow card__arrow--next" onClick={go(1)} aria-label="Next image">
              <Chevron direction="right" />
            </button>
            <div className="card__dots" role="tablist" aria-label={`${product.name} images`}>
              {frames.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === frame}
                  aria-label={`Image ${i + 1} of ${frames.length}`}
                  className={`card__dot ${i === frame ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setFrame(i)
                  }}
                />
              ))}
            </div>
          </>
        )}

        <div className="card__actions">
          <button className="card__action card__action--primary">Add to bag</button>
          <button className="card__action">Quick look</button>
        </div>

        <span className="card__origin">{product.origin}</span>
      </div>

      <div className="card__body">
        <div className="card__head">
          <h3 className="card__name">{product.name}</h3>
          <span className="card__price">{formatPrice(product.price)}</span>
        </div>
        <p className="card__note">{product.note}</p>
        <span className="card__tifinagh tifinagh">{product.tifinagh}</span>
      </div>
    </motion.article>
  )
}

function Chevron({ direction }) {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/* -------------------------------------------------------------------------
   Gallery — sticky heading column on the left, scrolling grid on the right.
   ------------------------------------------------------------------------- */
export default function ProductGallery() {
  const [active, setActive] = useState('all')

  const visible = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.category === active)),
    [active],
  )

  return (
    <section className="gallery" id="collection">
      <div className="gallery__shell shell">
        {/* ---- pinned column ---- */}
        <aside className="gallery__aside">
          <div className="gallery__pin">
            <h2 className="gallery__title">
              In the
              <br />
              shop
            </h2>

            <p className="gallery__blurb">
              Everything here is in stock right now and ships from Agadir within three days. When a
              run sells out we do not remake it identically — the next one comes back different.
            </p>

            <div className="gallery__filters" role="group" aria-label="Filter by material">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`gallery__chip ${active === cat.id ? 'is-active' : ''}`}
                  onClick={() => setActive(cat.id)}
                  aria-pressed={active === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="gallery__count">
              <motion.span
                key={visible.length}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {visible.length}
              </motion.span>
              <span className="gallery__count-label">
                {visible.length === 1 ? 'piece available' : 'pieces available'}
              </span>
            </div>

            <a
              className="gallery__insta"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              See the full feed on Instagram
            </a>
          </div>
        </aside>

        {/* ---- scrolling grid ---- */}
        <div className="gallery__grid">
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
