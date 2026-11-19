'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { INTRO_STORAGE_KEY, INTRO_STYLE_ID } from '@/lib/intro'

/*
 * WELCOME INTRO — "The butterflies gather."
 * The Angel Touch logo is a butterfly (leaf-green upper wings, gold lower wings).
 *
 *   0.0s  Gold pollen drifts in the air; two large butterflies sweep past close
 *         to the "camera" (soft focus, for depth).
 *   0.1s  Seven butterflies in the logo's style spiral in from every side.
 *   1.2s  The pollen is drawn into a vortex toward the centre.
 *   1.75s They merge: a ring of gold light pulses out and the logo unfolds
 *         from its centre like opening wings; a shimmer sweeps across it.
 *   3.3s  A flock bursts out of the logo in every direction, scattering the
 *         pollen, and the homepage opens in a circle from the logo.
 *
 * Plays by itself (~4.5 s). Shown once per browser session; never with
 * "reduce motion" (src/lib/intro.ts decides before the page paints).
 */

const GREEN = '#2A803F' // logo green
const GOLD = '#ECBF7B' // logo gold

// Timeline (seconds)
const VORTEX_AT = 1.15
const MERGE_AT = 1.75
const SHIMMER_AT = 2.55
const TAGLINE_AT = 2.4
const BURST_AT = 3.25
const REVEAL_AT = 3.4
const REVEAL_S = 1.1 // matches .at-intro-reveal

const EASE_SOFT = [0.22, 1, 0.36, 1] as const
const EASE_FLIGHT = [0.45, 0.05, 0.25, 1] as const

type Flight = { path: [string, string][]; size: number; delay: number; dur: number; flap: number; far?: boolean }

// Spiral approaches: start off-screen, orbit the centre once, land on the emblem.
const FLIGHTS: Flight[] = [
  { path: [['-62vw', '34vh'], ['-30vw', '-14vh'], ['6vw', '-20vh'], ['14vw', '4vh'], ['0vw', '0vh']], size: 52, delay: 0.05, dur: 1.8, flap: 0.2 },
  { path: [['64vw', '-42vh'], ['26vw', '14vh'], ['-8vw', '18vh'], ['-14vw', '-2vh'], ['0vw', '0vh']], size: 44, delay: 0.15, dur: 1.75, flap: 0.23 },
  { path: [['-58vw', '-48vh'], ['-16vw', '20vh'], ['12vw', '12vh'], ['8vw', '-8vh'], ['0vw', '0vh']], size: 30, delay: 0.3, dur: 1.55, flap: 0.17, far: true },
  { path: [['58vw', '48vh'], ['22vw', '-24vh'], ['-12vw', '-16vh'], ['-10vw', '6vh'], ['0vw', '0vh']], size: 58, delay: 0.1, dur: 1.85, flap: 0.25 },
  { path: [['4vw', '64vh'], ['-32vw', '8vh'], ['-6vw', '-22vh'], ['10vw', '-6vh'], ['0vw', '0vh']], size: 26, delay: 0.4, dur: 1.45, flap: 0.16, far: true },
  { path: [['-12vw', '-64vh'], ['30vw', '-6vh'], ['10vw', '20vh'], ['-8vw', '8vh'], ['0vw', '0vh']], size: 36, delay: 0.25, dur: 1.65, flap: 0.21 },
  { path: [['68vw', '6vh'], ['14vw', '28vh'], ['-18vw', '4vh'], ['-4vw', '-10vh'], ['0vw', '0vh']], size: 24, delay: 0.5, dur: 1.4, flap: 0.15, far: true },
]

// Foreground fly-bys: big, soft-focus, never land — they give the scene depth.
const FLYBYS = [
  { from: ['-70vw', '30vh'], to: ['70vw', '-45vh'], size: 150, delay: 0.1, dur: 1.5, flap: 0.3 },
  { from: ['72vw', '40vh'], to: ['-68vw', '-20vh'], size: 120, delay: 0.55, dur: 1.4, flap: 0.27 },
] as const

// The finale: a flock bursts out of the logo in every direction.
const BURST_COUNT = 12

/** Deterministic pseudo-random (so the scene is the same every time). */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/** A butterfly in the logo's style; wings beat via CSS (.at-wing). */
function Butterfly({ size, flap }: { size: number; flap: number }) {
  const wing = (side: 'l' | 'r') => (
    <g className="at-wing" style={{ ['--flap' as string]: `${flap}s` } as CSSProperties}>
      <g transform={side === 'r' ? 'scale(-1 1)' : undefined}>
        {/* forewing: a broad leaf, like the logo */}
        <path d="M-2 -2 C-8 -22 -30 -34 -46 -28 C-52 -16 -40 -2 -2 1 Z" fill={GREEN} stroke={GOLD} strokeWidth="1.1" />
        <path d="M-4 -2 C-16 -10 -30 -18 -42 -24" fill="none" stroke={GOLD} strokeWidth="0.9" opacity="0.75" />
        <path d="M-14 -7 C-20 -4 -28 -4 -34 -8" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.5" />
        {/* hindwing: gold */}
        <path d="M-2 2 C-14 2 -34 8 -36 22 C-34 30 -18 28 -2 6 Z" fill={GOLD} />
      </g>
    </g>
  )
  return (
    <svg
      viewBox="-50 -40 100 80"
      aria-hidden="true"
      className="overflow-visible block"
      style={{
        width: `clamp(${size}px, ${(size * 0.16).toFixed(2)}vw, ${size * 1.8}px)`,
        aspectRatio: '100 / 80',
        height: 'auto',
      }}
    >
      {wing('l')}
      {wing('r')}
      <ellipse cx="0" cy="3" rx="2.6" ry="14" fill={GREEN} />
      <circle cx="0" cy="-12.5" r="3.2" fill={GREEN} />
      <path d="M-1 -15 C-4 -24 -8 -28 -12 -30 M1 -15 C4 -24 8 -28 12 -30" fill="none" stroke={GREEN} strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

export function WelcomeAnimation() {
  const [phase, setPhase] = useState<'init' | 'playing' | 'revealing' | 'leaving' | 'done'>('init')
  const rootRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Gold pollen: drifts, is pulled into the centre, then scatters with the burst.
  const pollen = useMemo(() => {
    const rand = seeded(7)
    return Array.from({ length: 40 }, () => {
      const angle = rand() * Math.PI * 2
      const dist = 18 + rand() * 42 // vmax from centre
      const x = Math.cos(angle) * dist
      const y = Math.sin(angle) * dist * 0.8
      const out = 55 + rand() * 40
      return {
        x, y,
        dx: x + (rand() - 0.5) * 8,
        dy: y - 3 - rand() * 6,
        ox: Math.cos(angle + 0.6) * out,
        oy: Math.sin(angle + 0.6) * out,
        size: 2 + rand() * 3.5,
        delay: rand() * 0.35,
      }
    })
  }, [])

  const burst = useMemo(() => {
    const rand = seeded(3)
    return Array.from({ length: BURST_COUNT }, (_, i) => {
      const angle = (i / BURST_COUNT) * Math.PI * 2 + rand() * 0.35
      const dist = 62 + rand() * 30
      return {
        x: `${Math.cos(angle) * dist}vmax`,
        y: `${Math.sin(angle) * dist * 0.85}vmax`,
        size: 36 + rand() * 38,
        delay: BURST_AT + rand() * 0.18,
        flap: 0.12 + rand() * 0.08,
        rotate: (angle * 180) / Math.PI + 90,
      }
    })
  }, [])

  const remember = () => {
    try { sessionStorage.setItem(INTRO_STORAGE_KEY, '1') } catch { /* private browsing */ }
  }

  const finish = useCallback(() => {
    document.getElementById(INTRO_STYLE_ID)?.remove() // unlocks page scroll
    setPhase('done')
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [])

  const startReveal = useCallback(() => {
    // Open the circle from the logo emblem, wherever it sits on this screen.
    const a = anchorRef.current?.getBoundingClientRect()
    if (a && rootRef.current) {
      rootRef.current.style.setProperty('--at-cx', `${a.left}px`)
      rootRef.current.style.setProperty('--at-cy', `${a.top}px`)
    }
    setPhase('revealing')
  }, [])

  const skip = useCallback(() => {
    timersRef.current.forEach(clearTimeout)
    remember()
    setPhase('leaving')
    timersRef.current = [setTimeout(finish, 450)]
  }, [finish])

  // After hydration: did the gate script ask for the intro? If so, play it.
  useEffect(() => {
    const show = !!document.getElementById(INTRO_STYLE_ID)
    const frame = requestAnimationFrame(() => setPhase(show ? 'playing' : 'done'))
    if (show) {
      remember()
      timersRef.current.push(
        setTimeout(startReveal, REVEAL_AT * 1000),
        setTimeout(finish, (REVEAL_AT + REVEAL_S) * 1000)
      )
    }
    const timers = timersRef.current
    return () => {
      cancelAnimationFrame(frame)
      timers.forEach(clearTimeout)
    }
  }, [finish, startReveal])

  // Escape or Enter skips.
  useEffect(() => {
    if (phase !== 'playing') return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); skip() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, skip])

  if (phase === 'done') return null
  const running = phase !== 'init'

  return (
    <div
      ref={rootRef}
      className={`at-intro fixed inset-0 z-[100] items-center justify-center overflow-hidden transition-opacity duration-500 ${
        phase === 'revealing' ? 'at-intro-reveal' : ''
      } ${phase === 'leaving' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{
        display: running ? 'flex' : 'none',
        background: 'radial-gradient(70% 60% at 50% 46%, #eef5ec 0%, #f6f6ef 42%, #faf8f2 75%)',
      } as CSSProperties}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Angel Touch"
    >
      {running && (
        <>
          {/* Foreground fly-bys (soft focus, larger than life) */}
          {FLYBYS.map((f, i) => (
            <motion.div
              key={`fly-${i}`}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
              style={{ filter: 'blur(3px)' }}
              initial={{ x: f.from[0], y: f.from[1], opacity: 0, rotate: i ? -28 : 24 }}
              animate={{ x: [f.from[0], f.to[0]], y: [f.from[1], f.to[1]], opacity: [0, 0.85, 0.85, 0] }}
              transition={{ delay: f.delay, duration: f.dur, ease: [0.4, 0, 0.6, 1], opacity: { delay: f.delay, duration: f.dur, times: [0, 0.15, 0.8, 1] } }}
            >
              <Butterfly size={f.size} flap={f.flap} />
            </motion.div>
          ))}

          <div className="relative flex flex-col items-center px-6">
            <div className="relative" style={{ width: 'clamp(230px, 34vw, 430px)' }}>
              {/* Gold bloom where the butterflies meet */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-[33%] -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${GOLD}70 0%, ${GOLD}22 35%, transparent 65%)`,
                  animation: `atBloom 1.6s cubic-bezier(0.22,1,0.36,1) ${MERGE_AT - 0.25}s both`,
                }}
              />
              {/* Shockwave rings at the moment of merging */}
              {[0, 0.16].map((d) => (
                <motion.span
                  key={d}
                  aria-hidden="true"
                  className="absolute left-1/2 top-[33%] w-24 h-24 -ml-12 -mt-12 rounded-full border pointer-events-none"
                  style={{ borderColor: GOLD }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 4.2], opacity: [0.9, 0] }}
                  transition={{ delay: MERGE_AT - 0.05 + d, duration: 1.3, ease: EASE_SOFT }}
                />
              ))}

              {/* The logo unfolds from its centre, like wings opening */}
              <motion.div
                initial={{ clipPath: 'circle(0% at 50% 33%)', opacity: 0, scale: 0.9 }}
                animate={{ clipPath: 'circle(120% at 50% 33%)', opacity: 1, scale: [0.9, 1.04, 1] }}
                transition={{ delay: MERGE_AT, duration: 1.1, ease: EASE_SOFT }}
                className="relative"
              >
                <Image src="/logo.svg" alt="Angel Touch by Heena Thaker" width={1287} height={692} priority className="w-full h-auto" />
                {/* Shimmer: a band of light sweeps across the logo, masked to its shape */}
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    WebkitMaskImage: 'url(/logo.svg)', maskImage: 'url(/logo.svg)',
                    WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
                    background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.95) 48%, rgba(255,246,220,0.9) 52%, transparent 65%)',
                    backgroundSize: '250% 100%',
                  }}
                  initial={{ backgroundPositionX: '120%' }}
                  animate={{ backgroundPositionX: '-30%' }}
                  transition={{ delay: SHIMMER_AT, duration: 1.0, ease: [0.45, 0, 0.55, 1] }}
                />
              </motion.div>

              {/* The emblem's centre: everything converges here */}
              <div ref={anchorRef} className="absolute left-1/2 top-[33%] w-0 h-0" aria-hidden="true">
                {/* Pollen: drift → vortex in → scatter out */}
                {pollen.map((p, i) => (
                  <motion.span
                    key={`p-${i}`}
                    className="absolute rounded-full pointer-events-none"
                    style={{ width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2, background: i % 4 ? GOLD : '#fff6dc', boxShadow: `0 0 ${p.size * 2}px ${GOLD}` }}
                    initial={{ x: `${p.x}vmax`, y: `${p.y}vmax`, opacity: 0 }}
                    animate={{
                      x: [`${p.x}vmax`, `${p.dx}vmax`, '0vmax', '0vmax', `${p.ox}vmax`],
                      y: [`${p.y}vmax`, `${p.dy}vmax`, '0vmax', '0vmax', `${p.oy}vmax`],
                      opacity: [0, 0.9, 0.9, 0, 0.8, 0],
                      scale: [0.6, 1, 0.4, 0.4, 1.2],
                    }}
                    transition={{
                      duration: BURST_AT + 1.1,
                      delay: p.delay,
                      ease: 'easeInOut',
                      times: [0, VORTEX_AT / (BURST_AT + 1.1), (MERGE_AT + 0.1) / (BURST_AT + 1.1), BURST_AT / (BURST_AT + 1.1), 1],
                      opacity: { duration: BURST_AT + 1.1, delay: p.delay, times: [0, 0.08, 0.38, 0.45, 0.8, 1] },
                    }}
                  />
                ))}

                {/* Spiral flights into the emblem */}
                {FLIGHTS.map((f, i) => (
                  <motion.div
                    key={i}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ filter: f.far ? 'blur(1.2px)' : undefined }}
                    initial={{ x: f.path[0][0], y: f.path[0][1], opacity: 0, rotate: -18 }}
                    animate={{
                      x: f.path.map((p) => p[0]),
                      y: f.path.map((p) => p[1]),
                      rotate: [-18, 16, -10, 8, 0],
                      scale: [1, 1.08, 1, 0.8, 0.2],
                      opacity: [0, 1, 1, 1, 0],
                    }}
                    transition={{
                      delay: f.delay,
                      duration: f.dur,
                      ease: EASE_FLIGHT,
                      times: [0, 0.32, 0.6, 0.82, 1],
                      opacity: { delay: f.delay, duration: f.dur, times: [0, 0.1, 0.5, 0.86, 1] },
                    }}
                  >
                    <Butterfly size={f.size} flap={f.flap} />
                  </motion.div>
                ))}

                {/* Finale: the flock bursts out of the logo */}
                {burst.map((b, i) => (
                  <motion.div
                    key={`b-${i}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: b.rotate }}
                    animate={{ x: ['0vmax', b.x], y: ['0vmax', b.y], opacity: [0, 1, 1, 0], scale: [0.3, 1.15, 1.5] }}
                    transition={{ delay: b.delay, duration: 1.35, ease: [0.3, 0, 0.2, 1], opacity: { delay: b.delay, duration: 1.35, times: [0, 0.1, 0.8, 1] } }}
                  >
                    <Butterfly size={b.size} flap={b.flap} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tagline */}
            <motion.div
              className="mt-6 sm:mt-8 flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: TAGLINE_AT, duration: 0.8, ease: EASE_SOFT }}
            >
              <motion.span
                className="block h-px bg-[#b38538] mb-4"
                initial={{ width: 0 }}
                animate={{ width: 44 }}
                transition={{ delay: TAGLINE_AT, duration: 0.7, ease: EASE_SOFT }}
              />
              <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#1e5f2e] text-center">
                Ayurvedic Salon &amp; Beauty Academy
              </p>
              <p className="mt-2 text-[12px] sm:text-[13px] text-[#6b6e68] italic" style={{ fontFamily: 'var(--font-heading)' }}>
                Satellite, Ahmedabad
              </p>
            </motion.div>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={skip}
        className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8 z-30 inline-flex items-center gap-2 min-h-[40px] px-4 rounded-full text-[11px] tracking-[0.18em] uppercase text-[#4a4846] hover:text-[#1e2228] hover:bg-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a]"
      >
        Skip <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}
