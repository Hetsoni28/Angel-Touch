<div align="center">
  <img src="./public/logo.svg" alt="Angel Touch Logo" width="300" />

  # Angel Touch by Heena Thaker
  
  **Premium Ayurvedic Wellness & E-Commerce Platform**

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white" alt="Sanity" />
  </p>
</div>

---

## 📖 Overview

A full-stack, highly secure, and highly optimized web application built for Angel Touch. This platform provides:
*   🌿 **Premium Ayurvedic Treatments:** Inquiry and booking system.
*   🛍️ **E-Commerce Shop:** Physical Ayurvedic product sales.
*   🎓 **Masterclass Platform:** A robust, custom-built LMS for live online classes and a secure recorded video library.
*   💳 **Membership Subscriptions:** Recurring revenue model for access to the past recording vault.

---

## 🛠 Tech Stack & Architecture

*   **Frontend Framework:** Next.js 16 (App Router, Turbopack enabled)
*   **Language:** Strict TypeScript
*   **Styling & UI:** Tailwind CSS, Framer Motion (Animations), custom Atomic Design architecture
*   **Database & Auth:** Supabase (PostgreSQL, Row Level Security, Secure Email Auth)
*   **CMS:** Sanity.io (Headless content management)
*   **Forms & Validation:** React Hook Form + Zod
*   **Lead Generation:** Direct WhatsApp routing (`wa.me`)

---

## 📂 Project Structure (Strict Atomic Design)

This project strictly follows the **Atomic Design** methodology to ensure frontend scalability. **Do not deviate from this pattern.**

```text
angel-touch/
├── public/                 # Static assets, fonts, and logos
├── src/
│   ├── app/                # Next.js 16 App Router (Pages, Layouts, Route Handlers)
│   │   ├── (auth)/         # Grouped authentication routes
│   │   ├── actions/        # Next.js Server Actions (Auth, Forms)
│   │   └── api/            # API Endpoints
│   ├── components/         # ⚠️ STRICT ATOMIC DESIGN FOLDER
│   │   ├── atoms/          # Smallest pieces (Buttons, Inputs, FadeIn wrappers)
│   │   ├── molecules/      # Grouped atoms (Breadcrumbs, Form Fields, WhatsApp CTA)
│   │   └── organisms/      # Complex sections (Header, Hero, Product Grids, Forms)
│   ├── lib/
│   │   └── supabase/       # Supabase wrappers (Server, Client, Middleware, Guards)
│   ├── sanity/             # Sanity CMS schemas and GROQ queries
│   └── utils/              # Helper functions (WhatsApp routing, string formatters)
├── supabase/
│   └── migrations/         # Critical SQL schema definitions and RLS policies
└── CLASSES_ARCHITECTURE.md # 📚 Business logic rules for the LMS
```

---

## 🚀 Full Setup Guide for New Developers

Follow these steps precisely to get the Angel Touch environment running on your local machine.

### Step 1: Clone the Repository
```bash
git clone https://github.com/Hetsoni28/Angel-Touch.git
cd Angel-Touch
```

### Step 2: Install Node Dependencies
Make sure you are using a recent version of Node.js (v18+ recommended).
```bash
npm install
```

### Step 3: Setup Environment Variables
Ask the lead developer for the `.env.local` file, or create it in the root folder and fill in these keys from the Supabase and Sanity dashboards:
```env
# Next.js Site URL (Required for Supabase auth redirects)
NEXT_PUBLIC_SITE_URL=http://localhost:3002

# Supabase Keys (Find these in Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Sanity CMS Keys
NEXT_PUBLIC_SANITY_PROJECT_ID=uy2nrh30
NEXT_PUBLIC_SANITY_DATASET=production
```

### Step 4: Supabase Database Setup
Since this project relies heavily on PostgreSQL and Row Level Security, your database must be in sync. 
If you are linking to the live/staging remote database, you don't need to do anything (the schema is already live). 
If you are setting up a *local* Supabase instance for testing:
1. Install Supabase CLI: `npm i -g supabase`
2. Run `supabase start`
3. The migrations in `supabase/migrations/` will automatically apply to your local database.

### Step 5: Sanity CMS Setup
The Sanity Studio is built directly into this Next.js app! You do not need to run a separate Sanity server.
Just make sure your Sanity Project ID is correct in your `.env.local` file. 

### Step 6: Start the Development Server
```bash
npm run dev
```
*   **Website:** Open [http://localhost:3002](http://localhost:3002)
*   **CMS Dashboard:** Open [http://localhost:3002/studio](http://localhost:3002/studio) (Login with the authorized Sanity account).

---

## 🔐 Database & Security Model (Supabase)

The database is built on PostgreSQL via Supabase and relies heavily on **Row Level Security (RLS)**.

*   **Zero-Trust Architecture:** Tables (`profiles`, `class_enrollments`, `memberships`, `payments`, `recording_access`) are completely locked by default.
*   **Customer Access:** Users can only `SELECT`, `UPDATE`, or `INSERT` their own data based on their `auth.uid()`.
*   **Admin Access:** Defined by the `is_admin` boolean in the `profiles` table. Handled via a secure `is_admin()` SQL function that bypasses customer restrictions.
*   **Server Actions:** For privileged operations (e.g., verifying a payment and generating a membership), use `createServiceClient()` to safely bypass RLS on the server. For all user-facing queries, always use `createClient()`.

---

## 📚 Business Logic: Classes & Memberships

Before modifying any code related to the Masterclasses, you **must** read `CLASSES_ARCHITECTURE.md` in the root directory. 

**The Core Rules:**
1.  **Live Classes:** Sold strictly as one-time ticket purchases.
2.  **Attendees:** Get the recording of their specific class for free.
3.  **Memberships:** Grants access to the **past Recorded Library** for customers who missed the live sessions. Memberships do *not* grant free access to future live classes.
4.  **Capacity:** There are no hard limits on Zoom class capacity.

---

## ⚠️ Important Rules for Developers

1.  **Atomic Design:** Do NOT create a `templates` folder. All high-level sections belong in `organisms/`. Do not invent random subfolders inside the components directory.
2.  **Next.js 16 Features:** 
    *   `params` in dynamic routes (e.g., `[slug]/page.tsx`) is now an `async Promise<{slug: string}>`. It **must** be `await`ed before reading properties.
    *   `export const revalidate` is generally incompatible with Turbopack caching. Use `export const instant = false` for dynamic caching rules.
3.  **Inquiries:** Do not build custom inquiry dashboards or databases. All treatment, class, and product inquiries are routed directly to the client's business WhatsApp using `src/utils/whatsapp.ts`.
4.  **UI Brand Guidelines:** Keep the footer light (`#faf8f2`). Never add "Add to Cart" buttons or prices to the Ayurvedic Treatments pages (treatments are for inquiry/booking only).

---
<div align="center">
  <i>Designed & Developed by HNTech</i>
</div>
