'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** A hairline of gold across the top of the screen that fills as you read down the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      // Hidden with CSS for "reduce motion" (same markup on server and client)
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#edc179] origin-left z-[60] pointer-events-none motion-reduce:hidden"
      style={{ scaleX }}
    />
  )
}
