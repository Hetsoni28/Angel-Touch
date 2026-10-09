'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function WelcomeAnimation() {
  const [shouldHide, setShouldHide] = useState(true)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hasSeenAnimation = sessionStorage.getItem('angelTouchWelcomeSeen')

    if (!hasSeenAnimation && !prefersReducedMotion) {
      setShouldHide(false)
      sessionStorage.setItem('angelTouchWelcomeSeen', 'true')
    }
  }, [])

  if (shouldHide) return null

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.div
          key="welcome-overlay"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F2] overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 2.8 }}
          onAnimationComplete={() => {
            setShouldHide(true)
          }}
        >
          {/* Realistic Botanical Background */}
          <motion.div
            className="absolute inset-0 z-0 pointer-events-none"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3, ease: 'easeOut' }}
          >
            <Image
              src="/images/botanical_welcome_shadows.jpg"
              alt="Botanical shadow background"
              fill
              className="object-cover"
              style={{ objectPosition: 'left center' }}
              priority
            />
          </motion.div>

          {/* Center Content Group */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.1 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.6 } }}
              className="relative w-48 sm:w-64 md:w-72 aspect-[3/1]"
            >
              <Image
                src="/logo.svg"
                alt="Angel Touch"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Brand Statement */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 1.8 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="mt-6 sm:mt-8 text-center"
            >
              <p className="font-playfair text-[#1E5F2E] text-lg sm:text-xl tracking-wide">
                Beauty, rooted in nature.
              </p>
            </motion.div>
          </div>
          
          {/* Skip Button (Accessibility) */}
          <button 
            onClick={() => setShouldHide(true)}
            className="absolute bottom-10 text-[10px] uppercase tracking-widest text-[#8a8d87] hover:text-[#1e2228] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2E7A3A] focus:ring-offset-4 focus:ring-offset-[#FAF8F2] opacity-50 hover:opacity-100"
            aria-label="Skip welcome animation"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
