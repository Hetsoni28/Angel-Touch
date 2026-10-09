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
          {/* Subtle Botanical Shadow / Silhouette (Top Right) */}
          <motion.div
            className="absolute -top-10 -right-10 w-96 h-96 opacity-0 pointer-events-none"
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 0.08, x: 0, y: 0 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.6 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#1E5F2E] blur-xl">
              <path d="M45.7,112.5C28.2,106.6,12.7,92.5,5.6,74.9c-2.3-5.7-3.4-11.8-3.9-17.9c-1-12.7,2.2-25.5,8.8-36.4 c10-16.7,27.1-27.4,46.2-29.2c16.3-1.5,32.7,3.5,45.4,13.3c15.2,11.8,24,30.3,24.4,49.6c0.4,18.5-7.1,36.5-20.2,49.2 C89.3,120,64.2,125.6,45.7,112.5z" />
              <path d="M129.5,152.5c-20.1-9.6-35.8-27.2-43.6-48.4c-2.5-6.8-4-14.1-4.7-21.5c-1.4-15.1,1.9-30.5,9-43.9 c10.8-20.4,30.5-34.1,52.8-37.4c19.1-2.9,39,1.7,55.1,12.7c19.3,13.2,31.7,34.5,33.5,57.5c1.7,21.6-6,42.8-20.7,58.8 C186,156.8,155.6,165.1,129.5,152.5z" />
            </svg>
          </motion.div>

          {/* Subtle Botanical Shadow / Silhouette (Bottom Left) */}
          <motion.div
            className="absolute -bottom-20 -left-20 w-[28rem] h-[28rem] opacity-0 pointer-events-none"
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 0.05, x: 0, y: 0 }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.8 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#2E7A3A] blur-2xl">
              <path d="M154.3,87.5c17.5,5.9,33,20,40.1,37.6c2.3,5.7,3.4,11.8,3.9,17.9c1,12.7-2.2,25.5-8.8,36.4 c-10,16.7-27.1,27.4-46.2,29.2c-16.3,1.5-32.7-3.5-45.4-13.3c-15.2-11.8-24-30.3-24.4-49.6c-0.4-18.5,7.1-36.5,20.2-49.2 C110.7,80,135.8,74.4,154.3,87.5z" />
            </svg>
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
