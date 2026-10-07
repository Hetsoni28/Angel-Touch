# Angel Touch by Heena Thaker - Project Requirements

## Core Architecture
- **Sanity:** Manages content (Products, Treatments descriptions).
- **Supabase:** Manages application data (Users, Memberships, Enrollments).
- **Razorpay:** Manages payments (Live Classes, Recorded Classes, Memberships).
- **WP Inquiry:** Handles inquiries (Product and Treatment inquiries).
- **Customer Portal:** Manages customer access (Class access, Memberships, Profile).
- **Admin Portal:** Manages business operations.

## Phase 1 - Business Requirements Finalization

### 1. Product Section
**Current Scope:** Catalogue + Inquiry only.
- Customers can:
  - View products, images, and details.
  - Submit product inquiries.
- **Out of Scope (For Now):**
  - No product prices displayed.
  - No shopping cart.
  - No checkout process for products.
  - No payment collection for physical products.
- **Content Management:** Handled via Sanity.

### 2. Treatment Section
- Customers can:
  - View treatments and details.
  - Submit treatment inquiry / booking requests.
- **Integration:** Inquiries routed through WP Inquiry.
- **Out of Scope (For Now):**
  - No custom treatment booking system.
  - No treatment booking admin page.
  - No treatment appointment database.

### 3. Ayurvedic Product-Making Classes (Live)
This is a fully transactional feature.
- Customers can:
  - Browse available classes.
  - View class details (price, capacity, schedule).
  - Purchase a live class (via Razorpay).
  - See upcoming enrolled classes.
  - Join/access class information (e.g., Zoom links).
  - Receive recording access after the class concludes.
- **Workflow:** Purchase → Razorpay Verification → Enrollment Created → Class Access → Recording Access.

### 4. Recorded Classes
Customers can access recorded classes through three methods:
1. **Live Class Purchaser:** Customer buys the live class and gets the recording included for free.
2. **Recording-Only Purchase:** Customer purchases just the recording separately.
3. **Membership Access:** Customers with an active membership can access eligible recorded classes automatically.

