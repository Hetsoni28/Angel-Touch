import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, LegalSection } from '@/components/organisms/LegalPage'
import { SITE_INFO } from '@/lib/siteInfo'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'The terms that apply when you use the Angel Touch website, book treatments, buy products or join our classes and academy courses.',
  alternates: { canonical: 'https://angeltouch.in/terms' },
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated="20 October 2026"
      intro={
        <p>
          These terms apply when you use angeltouch.in or use the services of {SITE_INFO.businessName}{' '}
          (&ldquo;Angel Touch&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), including treatments,
          products, live classes, recordings and academy courses. By using the website or booking with us,
          you agree to these terms.
        </p>
      }
    >
      <LegalSection title="Our services">
        <p>Angel Touch is a women-only Ayurvedic salon, wellness studio and beauty academy at {SITE_INFO.address}. Treatments and academy courses are offered to women only.</p>
        <p>Information on this website, including treatment descriptions and product details, is for general guidance. It is not medical advice and does not replace a consultation with a doctor.</p>
      </LegalSection>

      <LegalSection title="Booking treatments">
        <ul>
          <li>Appointments are booked by WhatsApp, phone or in person, and are confirmed only once we reply to confirm them.</li>
          <li>Prices are shared when you enquire and confirmed at the time of booking.</li>
          <li>Please tell us before your treatment about any allergies, skin or scalp conditions, pregnancy, medication or recent procedures. We may recommend a patch test, or decline or change a treatment, if we believe it is not suitable for you.</li>
          <li>Please arrive on time. If you arrive late, your treatment may need to be shortened so that the next guest is not delayed.</li>
        </ul>
        <p>Cancellations and rescheduling are covered in our <Link href="/refund">Refund &amp; Cancellation Policy</Link>.</p>
      </LegalSection>

      <LegalSection title="Products">
        <p>Our products are handmade with natural ingredients, so colour, texture and fragrance can vary slightly between batches. Please read the ingredient list and do a patch test before first use. Stop using a product and consult a doctor if you experience irritation.</p>
        <p>Product orders are placed by enquiring with us on WhatsApp. An order is confirmed only once we confirm availability, price and delivery details with you.</p>
      </LegalSection>

      <LegalSection title="Live classes, recordings and academy courses">
        <ul>
          <li>Live classes are held online on Zoom. Joining links are personal to you and must not be shared.</li>
          <li>If you are registered for a live class, you receive the recording of that class.</li>
          <li>Membership, once available, gives access to the library of past class recordings. It does not include upcoming live classes.</li>
          <li>Class materials, recordings, formulations and course content belong to Angel Touch. They are for your personal learning only. You may not record, copy, share, resell or publish them, in full or in part, without our written permission.</li>
          <li>We may revoke access, without refund, if class links, recordings or materials are shared or misused.</li>
          <li>Certificates for academy courses are issued only after you complete the course requirements.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Your account">
        <p>Please give accurate details when you create an account, keep your password private, and let us know if you think someone else has used your account. You are responsible for activity on your account.</p>
      </LegalSection>

      <LegalSection title="Website content">
        <p>Text, photographs, logos and other content on this website belong to Angel Touch or are used with permission. You may not copy or reuse them without our written permission.</p>
      </LegalSection>

      <LegalSection title="Limits of our responsibility">
        <p>We take care to provide safe treatments and accurate information. To the extent the law allows, we are not responsible for reactions or results caused by information you did not share with us, by not following aftercare advice, or by using products against their instructions. Nothing in these terms limits rights you have under Indian consumer law.</p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>These terms are governed by the laws of India. Any dispute will be subject to the courts of Ahmedabad, Gujarat.</p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>We may update these terms from time to time. The date at the top shows when they last changed. Please also read our <Link href="/privacy">Privacy Policy</Link>.</p>
      </LegalSection>
    </LegalPage>
  )
}
