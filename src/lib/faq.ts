import { PAYMENTS_ENABLED } from '@/lib/features'
import { SITE_INFO } from '@/lib/siteInfo'

export interface FaqItem {
  question: string
  answer: string
}

export interface FaqGroup {
  title: string
  items: FaqItem[]
}

/**
 * FAQ content for /faq (also emitted as FAQPage structured data).
 * Every answer reflects how the business actually works — update it here
 * if a rule changes.
 */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: 'About Angel Touch',
    items: [
      {
        question: 'What is Angel Touch?',
        answer:
          'Angel Touch by Heena Thaker is a women-only Ayurvedic salon, wellness sanctuary and beauty academy in Satellite, Ahmedabad. We offer Shirodhara, Abhyanga massage, aroma and herbal facials, botanical hair care, bridal styling, handmade Ayurvedic products, formulation masterclasses and certified academy courses.',
      },
      {
        question: 'Is Angel Touch only for women?',
        answer:
          'Yes. Angel Touch is a private space dedicated entirely to women. All treatments, beauty services and academy courses are designed for women.',
      },
      {
        question: 'Where are you, and when are you open?',
        answer: `We are at ${SITE_INFO.address}. We are open ${SITE_INFO.hours
          .map((h) => `${h.days}, ${h.time}`)
          .join(', and ')}.`,
      },
    ],
  },
  {
    title: 'Treatments and booking',
    items: [
      {
        question: 'How do I book an appointment?',
        answer: `Message us on WhatsApp or call ${SITE_INFO.phoneDisplay}. Each treatment on the Treatments page has a Book on WhatsApp button that fills in the treatment name for you. Your appointment is confirmed once we reply.`,
      },
      {
        question: 'Why are treatment prices not shown on the website?',
        answer:
          'Many treatments are adjusted to your skin, hair and needs, so we share the price when you enquire and confirm it when you book.',
      },
      {
        question: 'Where can I get authentic Shirodhara in Ahmedabad?',
        answer:
          'At Angel Touch in Satellite, Ahmedabad. Our traditional Shirodhara uses warm medicated herbal oils and is done in a calm, private setting for women. It is commonly chosen for deep relaxation and stress relief.',
      },
      {
        question: 'What if I need to cancel or reschedule?',
        answer:
          'Please let us know at least 24 hours before your appointment. Our Refund & Cancellation Policy has the full details.',
      },
    ],
  },
  {
    title: 'Products',
    items: [
      {
        question: 'How do I buy Angel Touch products?',
        answer:
          'Open any product in the shop and tap Enquire About Product. It opens WhatsApp with the product name filled in, and we will confirm availability, price and delivery with you.',
      },
    ],
  },
  {
    title: 'Classes, recordings and academy',
    items: [
      {
        question: 'How do live classes work?',
        answer:
          'Live masterclasses are held online on Zoom. Register from the class page and we will confirm your seat and share the joining details with you.',
      },
      {
        question: 'If I join a live class, do I get the recording?',
        answer: 'Yes. Everyone registered for a live class receives the recording of that class.',
      },
      {
        question: 'What does membership include?',
        answer: PAYMENTS_ENABLED
          ? 'Membership gives you access to the library of past class recordings. It does not include upcoming live classes, which are registered for separately.'
          : 'Membership will give you access to the library of past class recordings. It does not include upcoming live classes. Membership is opening soon. Message us on WhatsApp and we will let you know when it launches.',
      },
      {
        question: 'Can I get the recording of a class I missed?',
        answer: PAYMENTS_ENABLED
          ? 'Yes. Past recordings are available with membership, or you can ask us about a single recording on WhatsApp.'
          : 'Yes. Open the Recorded Library and tap Enquire on the class you want, or message us on WhatsApp.',
      },
      {
        question: 'Which academy courses do you offer?',
        answer:
          'The Beauty Academy offers certified diploma and individual courses in areas such as cosmetology, trichology, clinical aesthetics, machinery, chemical peels and aromatherapy, taught by Heena Thaker. See the Academy page for the full list and enquire on WhatsApp for dates and fees.',
      },
    ],
  },
]
