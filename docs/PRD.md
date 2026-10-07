# Product Requirements Document (PRD) - Angel Touch

## 1. Project Overview
**Name:** Angel Touch by Heena Thaker
**Type:** Web Application (E-commerce + Learning + Service Booking)
**Core Purpose:** To offer Ayurvedic products, detail treatments, and sell both live and recorded Ayurvedic product-making classes.

## 2. Technical Stack
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (with Turbopack)
- **Form & Validation:** React Hook Form + Zod
- **Icons:** Lucide React

## 3. Core Architecture
- **Sanity (Content Layer):** Manages dynamic content (Products, Treatments, Class details). Embedded Studio at `/studio`.
- **Supabase (App Data Layer):** Manages application state, authentication, users, memberships, and class enrollments.
- **Razorpay (Payments Layer):** Handles checkout for Live Classes, Recorded Classes, and Memberships.
- **WP Inquiry (Communication Layer):** Handles contact inquiries for Products and Treatments.

## 4. Feature Scope (Phase 1)

### A. Product Section
- **Type:** Catalogue + Inquiry.
- **Features:** View products, view images, view details, submit product inquiry.
- **Out of Scope (Phase 1):** Product prices, shopping cart, direct product checkout.

### B. Treatment Section
- **Type:** Information + Booking Inquiry.
- **Features:** View treatments, details, and benefits. Submit treatment inquiry/booking requests via WP Inquiry.
- **Out of Scope (Phase 1):** Custom booking engine, appointment database, admin calendar UI.

### C. Ayurvedic Product-Making Classes (Live)
- **Type:** Transactional.
- **Features:** Browse classes, view details (capacity, schedule), purchase live class via Razorpay.
- **Workflow:** Purchase -> Razorpay Verified -> Supabase Enrollment Created -> Class Access Granted (Zoom link) -> Post-class Recording Access.

### D. Recorded Classes (VOD)
- **Access Methods:**
  1. **Live Class Purchaser:** Automatically gets free access to the recording post-event.
  2. **Recording-Only Purchase:** Separate Razorpay purchase for just the VOD.
  3. **Membership:** Active members automatically unlock eligible recorded classes.

## 5. Implementation Status
*(Keep this updated to save context in future sessions)*

### ✅ Completed
- [x] Initialized Next.js 16 workspace at root.
- [x] Configured Tailwind CSS, TypeScript, and ESLint.
- [x] Installed core dependencies (Supabase, Sanity, Zod, React Hook Form, Lucide).
- [x] Set up Git repository and connected to GitHub.
- [x] Initialized Supabase Clients (`client.ts`, `server.ts`, `middleware.ts`).
- [x] Scaffolded embedded Sanity Studio (`/studio` route and `sanity.config.ts`).

### ⏳ Pending (Next Steps)
1. **Sanity Schemas:** Code the structure for `Product`, `Treatment`, and `Class`.
2. **Supabase Schemas:** Define SQL tables for `Profiles`, `Enrollments`, `Memberships`, and `Transactions`.
3. **Frontend UI:** Build out the public-facing pages (Home, Products, Treatments, Classes).
4. **Auth Flow:** Build login/register pages.
5. **Customer Portal:** Dashboard to view enrolled classes and Zoom links.
6. **Payment Flow:** Integrate Razorpay webhook and checkout.

