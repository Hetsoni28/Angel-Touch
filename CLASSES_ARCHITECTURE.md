# Angel Touch — Classes & Membership Architecture

## 1. Core Business Rules
*   **Scope:** Only Ayurvedic Product-Making Classes.
*   **Live Classes:** Treated as a one-time purchase.
*   **Recordings for Attendees:** If a customer pays for and enrolls in a Live Class (e.g., "Class 2"), they receive permanent, free access to the recording of that specific class.
*   **Recordings for Non-Attendees:** If a customer did NOT enroll in the live class (e.g., "Class 3"), they do not get it for free. They must purchase a **Membership** to unlock it.
*   **Membership Scope:** Membership grants access to the "Recorded Library" of past classes. It does NOT grant free access to upcoming Live Classes.
*   **Capacity Limits:** None. Unlimited students can join a live online Zoom class.

## 2. Content Layer (Sanity CMS)
We will create a `masterclass` document schema with the following fields:
*   `title`: Class name.
*   `status`: Dropdown (`Upcoming` or `Completed`).
*   `liveDate`: Date and time of the Zoom class.
*   `price`: One-time fee for the live class.
*   `zoomLink`: Added before the class. Visible only to enrolled students.
*   `youtubeRecordingLink`: Added after the class. Hosted via YouTube Unlisted.

## 3. Database & Security Layer (Supabase)
The logic will rely on our existing tables: `class_enrollments` and `memberships`.

**The "Gatekeeper" Access Logic:**
When a user attempts to play a past recording, the application runs this check:
1.  **Check 1:** Does `auth.uid()` exist in `class_enrollments` for this specific `class_id`? 
    *   If **YES** ➡️ Allow playback (They attended the live class).
2.  **Check 2:** If NO, does `auth.uid()` have an active row in the `memberships` table? 
    *   If **YES** ➡️ Allow playback (They are a premium member).
3.  **Fallback:** If NO to both ➡️ Block playback and render the "Locked" state, prompting the user to subscribe to a membership.

## 4. Frontend Application (Next.js)
The customer journey will be mapped across these routes:

*   `/classes` — The storefront for upcoming live classes. Users purchase one-time tickets here.
*   `/library` — The "Recorded Library" vault. Displays past classes. Locked by the Gatekeeper logic.
*   `/memberships` — The pricing and checkout page for the subscription.
*   `/account` — Customer dashboard containing:
    *   **My Classes:** Links to upcoming Zoom meetings and owned recordings.
    *   **Membership Status:** Active/Inactive status.

## 5. Admin Layer
A lightweight custom dashboard (`/admin`) to view transactional data that doesn't belong in Sanity:
*   View all customers.
*   View `class_enrollments` (who bought which live class).
*   View active `memberships`.
