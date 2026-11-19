'use client'

import Image from 'next/image'
import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface CinematicImageProps {
  src: string
  alt: string
  sizes: string
  /** Classes for the frame (size / aspect ratio / background). */
  className?: string
  /** Classes for the <img> itself (object-position etc.). */
  imageClassName?: string
  priority?: boolean
  /**
   * Parallax travel as a % of the frame height (0 = off). The photo drifts a
   * little slower than the page, which reads as depth rather than movement.
   */
  parallax?: number
  /** Wipe the photo in from the bottom the first time it scrolls into view. */
  reveal?: boolean
  children?: ReactNode
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Photo with optional scroll parallax and a one-time wipe-in.
 * The markup is identical on server and client; "reduce motion" turns both
 * effects off in CSS (motion-reduce:…), so hydration never mismatches.
 */
export function CinematicImage({
  src,
  alt,
  sizes,
  className = '',
  imageClassName = 'object-cover',
  priority = false,
  parallax = 6,
  reveal = false,
  children,
}: CinematicImageProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])
  // Scale just enough that the parallax travel never exposes the frame's edge.
  const scale = 1 + (parallax * 2) / 100

  return (
    <motion.div
      ref={frameRef}
      className={`relative overflow-hidden motion-reduce:![clip-path:none] ${className}`}
      {...(reveal
        ? {
            initial: { clipPath: 'inset(100% 0% 0% 0%)' },
            whileInView: { clipPath: 'inset(0% 0% 0% 0%)' },
            viewport: { once: true, margin: '0px 0px -10% 0px' },
            transition: { duration: 1.4, ease: EASE },
          }
        : {})}
    >
      <motion.div
        className="absolute inset-0 motion-reduce:!transform-none"
        style={parallax ? { y, scale } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className={imageClassName}
        />
      </motion.div>
      {children}
    </motion.div>
  )
}
