# Product Requirements Document: Design Tokens & Atomic UI

## 1. Overview
This document outlines the **Design Token System** and **Atomic Design Architecture** for the Angel Touch web application. Our goal is to ensure a scalable, maintainable, and visually consistent user interface by strictly separating design decisions (tokens) from component implementation (atomic elements).

## 2. Design Tokens
Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We manage these in Next.js 16/Tailwind v4 via CSS variables inside `globals.css` using the `@theme inline` structure.

### 2.1 Colors
* **Backgrounds**
  * `var(--color-bg)`: Main background (#FCFBF8 - Soft pearl)
  * `var(--color-bg-alt)`: Alternate background (#F5F2EA - Warm sand)
* **Text & Foreground**
  * `var(--color-text)`: Primary body text (#4A443E - Deep earth)
  * `var(--color-heading)`: Headings and high-contrast text (#2C3E35 - Forest green)
* **Accents & Interactive**
  * `var(--color-accent)`: Primary buttons, links, active states (#D4AF37 - Muted gold)
  * `var(--color-accent-hover)`: Hover states for primary actions (#B5952F - Darker gold)
* **Feedback (Semantic)**
  * `var(--color-success)`: Success states (#437754)
  * `var(--color-error)`: Error states (#C05C5C)

### 2.2 Typography
* **Primary Font (`var(--font-sans)`)**: DM Sans
  * Usage: Body text, UI elements, standard content.
* **Heading Font (`var(--font-heading)`)**: Playfair Display
  * Usage: `<h1>` to `<h4>`, branding, hero titles, elegant accents.

### 2.3 Animation & Motion (Skeleton/Pulse)
* **`animate-pulse`**: Defined globally in Tailwind, utilized in Skeleton components to indicate loading states.
* Transitions default to standard Tailwind ease-in-out timing functions (typically 150ms-300ms) for smooth interactive feedback.

## 3. Atomic Component Architecture
Components are structured into the Atomic Design methodology for maximum reusability.

### 3.1 Atoms
Basic building blocks that cannot be broken down further.
* **Button (`src/components/atoms/Button.tsx`)**: Reusable button with variants (`default`, `outline`, `ghost`, `link`) and sizes.
* **Skeleton (`src/components/atoms/Skeleton.tsx`)**: An animated loading placeholder for content to improve perceived performance.

### 3.2 Molecules
Simple groups of UI elements functioning together as a unit.
* **Card (`src/components/molecules/Card.tsx`)**: A container for displaying grouped content (e.g., product summaries, upcoming classes).

### 3.3 Organisms
Relatively complex UI components that form distinct sections of an interface.
* **Header (`src/components/organisms/Header.tsx`)**: Top navigation bar containing the logo, links, and mobile menu toggle.
* **Footer (`src/components/organisms/Footer.tsx`)**: Bottom navigation containing links, contact info, and custom SVG social icons (Instagram, Facebook, YouTube).

## 4. Implementation Rules
1. **No Hardcoded Values**: Use Tailwind utility classes derived from design tokens (e.g., `bg-accent`, `text-heading`, `font-sans`) instead of hex codes or absolute values.
2. **Composition over Modification**: Build complex components (Organisms/Templates) by combining smaller ones (Atoms/Molecules).
3. **Accessibility (a11y)**: Ensure sufficient contrast ratios between text and background tokens. Include semantic HTML elements.

