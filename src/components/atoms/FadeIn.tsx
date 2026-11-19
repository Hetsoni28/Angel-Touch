'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  fullWidth?: boolean
  className?: string
}

// A short travel distance and a long, soft ease read as calm rather than "animated".
const DISTANCE = 14
const offsets = {
  up: { y: DISTANCE, x: 0 },
  down: { y: -DISTANCE, x: 0 },
  left: { x: DISTANCE, y: 0 },
  right: { x: -DISTANCE, y: 0 },
  none: { x: 0, y: 0 },
}

/**
 * Fades content in as it scrolls into view.
 * "Reduce motion" is handled in CSS (motion-reduce:…), not by rendering different
 * markup — so the server HTML and the browser's first render always match.
 */
export function FadeIn({ children, delay = 0, direction = 'up', fullWidth = false, className = '' }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{
        opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
        x: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
        y: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
      }}
      className={`${fullWidth ? 'w-full' : ''} motion-reduce:!opacity-100 motion-reduce:!transform-none ${className}`}
    >
      {children}
    </motion.div>
  )
}
