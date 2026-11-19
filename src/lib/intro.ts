/**
 * Welcome intro gate.
 * ─────────────────────────────────────────────────────────────────────────────
 * This tiny script runs in the browser as the page is parsed, BEFORE React
 * hydrates. If the visitor hasn't seen the intro this session (and hasn't asked
 * for reduced motion), it injects a style tag that shows the intro overlay and
 * locks scrolling. That way the homepage never flashes before the intro appears.
 *
 * The WelcomeAnimation component removes the style tag when the intro ends.
 * Kept in a plain (non-"use client") module so the server page can import it.
 */
export const INTRO_STORAGE_KEY = 'angelTouchWelcomeSeen'
export const INTRO_STYLE_ID = 'at-intro-pending'

export const INTRO_GATE_SCRIPT = `try{if(!sessionStorage.getItem('${INTRO_STORAGE_KEY}')&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var s=document.createElement('style');s.id='${INTRO_STYLE_ID}';s.textContent='.at-intro{display:flex!important}html{overflow:hidden}';document.head.appendChild(s)}}catch(e){}`
