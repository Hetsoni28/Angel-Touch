'use client'

import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

interface RevealLinesProps {
  /** One entry per visual line — each slides up from behind its own mask. */
  lines: ReactNode[]
  as?: 'p' | 'h1' | 'h2' | 'span'
  className?: string
  style?: CSSProperties
  delay?: number
  /** 'load' for above-the-fold text, 'view' to start when scrolled into view. */
  trigger?: 'load' | 'view'
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Editorial headline reveal: each line rises out of a clipped mask, slightly
 * staggered. The text is real text in the HTML (good for SEO and screen readers);
 * only its position animates. With "reduce motion" the lines simply appear (CSS).
 */
export function RevealLines({
  lines,
  as = 'p',
  className = '',
  style,
  delay = 0,
  trigger = 'view',
}: RevealLinesProps) {
  const Tag = as
  const animateProps =
    trigger === 'load'
      ? { animate: { y: '0%' } }
      : { whileInView: { y: '0%' }, viewport: { once: true, margin: '0px 0px -8% 0px' } }

  return (
    <Tag className={className} style={style}>
      {lines.map((line, i) => (
        // pb/-mb give descenders (g, y, p) room inside the mask without changing line spacing
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block motion-reduce:!transform-none"
            initial={{ y: '108%' }}
            {...animateProps}
            transition={{ duration: 1.15, ease: EASE, delay: delay + i * 0.11 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
