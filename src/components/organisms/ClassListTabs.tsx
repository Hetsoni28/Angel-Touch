'use client'

import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

type Tab = 'upcoming' | 'past'

/**
 * Upcoming / Past switch for My classes. Both lists arrive with the page, so
 * switching is instant (no server round trip). The URL is kept in sync, so
 * /customer/classes?tab=past still opens straight onto Past.
 */
export function ClassListTabs({ initial, counts, upcoming, past }: {
  initial: Tab
  counts: Record<Tab, number>
  upcoming: ReactNode
  past: ReactNode
}) {
  const [tab, setTab] = useState<Tab>(initial)

  const select = (next: Tab) => {
    if (next === tab) return
    setTab(next)
    const url = new URL(window.location.href)
    if (next === 'past') url.searchParams.set('tab', 'past')
    else url.searchParams.delete('tab')
    window.history.replaceState(window.history.state, '', url)
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past' },
  ]

  return (
    <>
      <div role="tablist" aria-label="Class list" className="grid grid-cols-2 p-1 mb-5 rounded-full bg-white border border-[#dde7dd] max-w-sm">
        {tabs.map((t) => {
          const active = t.key === tab
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              id={`tab-${t.key}`}
              aria-selected={active}
              aria-controls={`panel-${t.key}`}
              onClick={() => select(t.key)}
              className={`relative flex items-center justify-center gap-2 h-10 rounded-full text-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7a3a] ${
                active ? 'text-white font-semibold' : 'text-[#4a4846] hover:text-[#1e2228]'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="class-tab-pill"
                  className="absolute inset-0 rounded-full bg-[#1e5f2e]"
                  transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <span className="relative">{t.label}</span>
              <span className={`relative min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] flex items-center justify-center tabular transition-colors ${active ? 'bg-white/20' : 'bg-[#faf8f2] border border-[#dde7dd]'}`}>
                {counts[t.key]}
              </span>
            </button>
          )
        })}
      </div>

      <div role="tabpanel" id="panel-upcoming" aria-labelledby="tab-upcoming" hidden={tab !== 'upcoming'}>{upcoming}</div>
      <div role="tabpanel" id="panel-past" aria-labelledby="tab-past" hidden={tab !== 'past'}>{past}</div>
    </>
  )
}
