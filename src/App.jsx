import { useScroll, useSpring, motion } from 'framer-motion'
import useSmoothScroll from './hooks/useSmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGallery from './components/ProductGallery'
import Story from './components/Story'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const lenisRef = useSmoothScroll()

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      <a className="skip-link" href="#collection">
        Skip to the collection
      </a>

      <motion.div className="app__progress" style={{ scaleX: progress }} aria-hidden="true" />

      <Navbar lenisRef={lenisRef} />

      <main id="top" className="app">
        <Hero />
        <ProductGallery />
        <Story />
      </main>

      <Footer />
    </>
  )
}
