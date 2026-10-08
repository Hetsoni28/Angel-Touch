# 🌿 Angel Touch by Heena Thaker

> **Premium Ayurvedic Wellness & E-Commerce Platform**
> 
> A full-stack, highly secure web application built for Angel Touch, offering Ayurvedic treatments, physical products, and an exclusive online product-making Masterclass platform with a recorded video library.

---

## 🛠 Tech Stack

*   **Frontend & Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
*   **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/), Framer Motion (Animations), Atomic Design Pattern
*   **Database & Authentication:** [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Auth)
*   **Content Management (CMS):** [Sanity.io](https://www.sanity.io/)
*   **Forms & Validation:** React Hook Form, Zod

---

## 📂 Project Structure

This project strictly follows the **Atomic Design** methodology for UI components to ensure scalability and reusability.

```bash
angel-touch/
├── src/
│   ├── app/                # Next.js 16 App Router (Pages, Layouts, Route Handlers)
│   │   ├── (auth)/         # Authentication routes (Login, Register)
│   │   ├── actions/        # Next.js Server Actions (Auth, Forms)
│   │   └── api/            # API Endpoints
│   ├── components/         # ⚠️ STRICT ATOMIC DESIGN
│   │   ├── atoms/          # Smallest pieces (Buttons, Inputs, FadeIn)
│   │   ├── molecules/      # Grouped atoms (Breadcrumbs, Form Fields)
│   │   └── organisms/      # Complex sections (Header, Hero, Product Grids)
│   ├── lib/
│   │   └── supabase/       # Supabase clients (Server, Client, Middleware, Guards)
│   ├── sanity/             # Sanity CMS schemas and queries
│   └── utils/              # Helper functions (WhatsApp routing, formatting)
├── supabase/
│   └── migrations/         # SQL schema definitions and RLS policies
└── CLASSES_ARCHITECTURE.md # Business logic for the Classes & Membership system
```

---

## 🚀 Getting Started (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add the following keys. *(Ask the lead developer or check the Supabase/Sanity dashboards for the actual values).*

```env
# Next.js Site URL (used for email confirmation redirects)
NEXT_PUBLIC_SITE_URL=http://localhost:3002

# Supabase (Auth & Database)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DATABASE_URL=your_db_url

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3002](http://localhost:3002) in your browser.

---

## 🔐 Database & Security (Supabase)

This application uses **Row Level Security (RLS)** extensively. The database tables (`profiles`, `class_enrollments`, `memberships`, `payments`, `recording_purchases`, `recording_access`) are completely locked down.

*   **Customers:** Can only `SELECT` their own data (based on `auth.uid()`).
*   **Admins:** Defined via the `is_admin` boolean in the `profiles` table. Admins bypass customer RLS restrictions.
*   **Server Actions:** When executing privileged operations (like granting membership access after a successful payment), use `createServiceClient()` to bypass RLS safely on the server. For normal queries, always use `createClient()`.

*Note: All migrations are located in `supabase/migrations/`.*

---

## 📦 Content Management (Sanity)

All non-transactional content (Treatments, Products, Upcoming Classes, FAQs) is managed in Sanity CMS.

*   **Studio URL:** Accessible via `/studio` in development (or your deployed Sanity URL).
*   **Schemas:** Located in `src/sanity/schemaTypes`. Do not hardcode product or treatment data in the frontend—always fetch it via GROQ queries from Sanity.

---

## 📚 Business Logic: Classes & Memberships

Please read the `CLASSES_ARCHITECTURE.md` file in the root directory before modifying the Masterclasses or User Dashboard. 

**Brief Summary:**
1.  **Live Classes:** Sold as one-time purchases (tracked in `class_enrollments`).
2.  **Recordings:** If a user bought the Live Class, they get the recording free.
3.  **Membership:** Grants access to the *past* Recorded Library for users who missed the live classes. Does *not* grant access to future live classes.

---

## ⚠️ Important Developer Rules

1.  **Atomic Design:** Do NOT create a `templates` folder. All section-level components go in `organisms/`. Do not invent subfolders.
2.  **Next.js 16 Quirks:** 
    *   `params` in dynamic routes (e.g., `[slug]/page.tsx`) is an `async Promise<{slug: string}>` and must be `await`ed before reading.
    *   `export const revalidate` is not compatible with Turbopack caching. Use `export const instant = false` for dynamic caching rules.
3.  **Inquiries:** Do not build an inquiry dashboard. All product/treatment inquiries are routed directly to the client's WhatsApp using the utility in `src/utils/whatsapp.ts`.
4.  **UI Guidelines:** Keep the footer light (`#faf8f2`). Never add "Add to Cart" or prices to the Treatments page (treatments are inquiry/booking only).

---
*Designed & Developed by HNTech*
