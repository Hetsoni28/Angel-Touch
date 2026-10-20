import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, LegalSection } from '@/components/organisms/LegalPage'
import { SITE_INFO } from '@/lib/siteInfo'

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description:
    'How cancellations, rescheduling and refunds work for Angel Touch treatments, live classes, recordings, academy courses and products.',
  alternates: { canonical: 'https://angeltouch.in/refund' },
}

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      lastUpdated="20 October 2026"
      intro={
        <p>
          We want every visit and every class to feel right. This page explains how to cancel or
          reschedule, and when you can get a refund. To make any request, message us on WhatsApp or call{' '}
          {SITE_INFO.phoneDisplay}.
        </p>
      }
    >
      <LegalSection title="Treatments">
        <ul>
          <li>To cancel or reschedule an appointment, please tell us at least <strong>24 hours</strong> before your booked time.</li>
          <li>If you paid an advance and give at least 24 hours&rsquo; notice, you can move it to a new appointment or ask for a refund.</li>
          <li>For cancellations with less than 24 hours&rsquo; notice, or if you do not arrive, the advance may not be refunded.</li>
          <li>If we need to cancel or reschedule your appointment, you can choose a new time or a full refund of any advance you paid.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Live classes">
        <ul>
          <li>If you cannot attend, tell us at least <strong>48 hours</strong> before the class and we will move your seat to another session of the same class.</li>
          <li>Registered students receive the class recording, so fees are not refunded for missing a class or after it has started.</li>
          <li>If we cancel or reschedule a class, you can join the new date or ask for a full refund.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Recordings and membership">
        <p>Recordings and membership are digital access. Once access has been given, payments for them are not refundable. If you cannot open a recording you are entitled to, contact us and we will fix it.</p>
      </LegalSection>

      <LegalSection title="Academy courses">
        <p>Fees, schedules and refund terms for academy courses are confirmed in writing when you enrol, because they differ from course to course. If we cancel a course before it starts, you will receive a full refund.</p>
      </LegalSection>

      <LegalSection title="Products">
        <ul>
          <li>For hygiene reasons, opened or used products cannot be returned.</li>
          <li>If your product arrives damaged, leaking or is not what you ordered, send us a photo within <strong>48 hours</strong> of receiving it. We will replace it or refund you.</li>
        </ul>
      </LegalSection>

      <LegalSection title="How refunds are paid">
        <p>Approved refunds are paid back to the original payment method, or by bank transfer or UPI for payments made in person, within <strong>7 to 10 working days</strong> of approval. Your bank may take a few extra days to show the amount.</p>
      </LegalSection>

      <LegalSection title="Related policies">
        <p>See also our <Link href="/terms">Terms &amp; Conditions</Link> and <Link href="/privacy">Privacy Policy</Link>.</p>
      </LegalSection>
    </LegalPage>
  )
}
