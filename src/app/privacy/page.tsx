import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalPage, LegalSection } from '@/components/organisms/LegalPage'
import { SITE_INFO } from '@/lib/siteInfo'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Angel Touch by Heena Thaker collects, uses and protects your personal information when you use our website, book treatments or join our classes.',
  alternates: { canonical: 'https://angeltouch.in/privacy' },
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="20 October 2026"
      intro={
        <p>
          This policy explains what personal information {SITE_INFO.businessName} (&ldquo;Angel Touch&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you use angeltouch.in, contact us, book a
          treatment or join a class, and how we use and protect it. We handle your information in line
          with applicable Indian law, including the Digital Personal Data Protection Act, 2023.
        </p>
      }
    >
      <LegalSection title="Information we collect">
        <p><strong>When you create an account:</strong> your name, email address and password. Your password is stored securely by our login provider and is never visible to us. You may also add a phone number to your profile.</p>
        <p><strong>When you contact us:</strong> anything you choose to share when you message us on WhatsApp, call us or visit the studio, such as your name, phone number, the treatment, product or class you are asking about, and any skin, hair or health details you tell us so we can advise you safely.</p>
        <p><strong>When you join a class:</strong> a record of the classes you have registered for and, where applicable, your membership status.</p>
        <p><strong>When you pay online</strong> (once online payments are available): a record of the payment, such as the amount, date and transaction reference. Card, UPI and bank details are handled by our payment provider, Razorpay, and are never stored by us.</p>
        <p><strong>Technical information:</strong> our website uses only the cookies needed to keep you signed in and to remember small preferences. We do not use advertising or tracking cookies.</p>
      </LegalSection>

      <LegalSection title="How we use your information">
        <ul>
          <li>To respond to your enquiries and confirm appointments, class registrations and orders.</li>
          <li>To give you access to your account, your classes and any recordings you are entitled to.</li>
          <li>To advise you on treatments and products that are suitable for you.</li>
          <li>To send you the details you need, such as class joining links and booking confirmations.</li>
          <li>To keep our records accurate and meet our legal and accounting obligations.</li>
        </ul>
        <p>We do not sell or rent your personal information to anyone.</p>
      </LegalSection>

      <LegalSection title="Who we share it with">
        <p>We share information only with the service providers that help us run Angel Touch, and only as much as they need:</p>
        <ul>
          <li><strong>Supabase</strong>, which stores accounts, class registrations and membership records.</li>
          <li><strong>Vercel</strong>, which hosts this website.</li>
          <li><strong>Razorpay</strong>, which processes online payments once they are available.</li>
          <li><strong>WhatsApp (Meta)</strong>, when you choose to message us there.</li>
          <li><strong>Zoom</strong>, which we use to run live online classes.</li>
        </ul>
        <p>We may also disclose information if the law requires us to.</p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>We keep your account information for as long as your account is open. Class, membership and payment records are kept for as long as we need them to provide your access and to meet our legal and tax obligations. WhatsApp conversations stay in our business WhatsApp until we delete them.</p>
      </LegalSection>

      <LegalSection title="Your choices and rights">
        <p>You can view and update your name and phone number from your profile at any time. You can also ask us to:</p>
        <ul>
          <li>tell you what personal information we hold about you,</li>
          <li>correct anything that is wrong,</li>
          <li>delete your account and personal information, unless we must keep certain records by law.</li>
        </ul>
        <p>To make a request, message us on WhatsApp or call {SITE_INFO.phoneDisplay}. We will reply as soon as we can.</p>
      </LegalSection>

      <LegalSection title="Keeping your information safe">
        <p>Your account data is protected with access controls so that each customer can see only their own records. Website traffic is encrypted, and payment details never pass through our systems.</p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>If we change how we handle personal information, we will update this page and the date at the top. Please also read our <Link href="/terms">Terms &amp; Conditions</Link> and <Link href="/refund">Refund &amp; Cancellation Policy</Link>.</p>
      </LegalSection>
    </LegalPage>
  )
}
