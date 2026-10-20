/**
 * Business details used on the FAQ and policy pages.
 * Keep in sync with the contact page if anything changes.
 */
export const SITE_INFO = {
  businessName: 'Angel Touch by Heena Thaker',
  shortName: 'Angel Touch',
  siteUrl: 'https://angeltouch.in',
  phoneDisplay: '+91 97231 79638',
  phoneHref: 'tel:+919723179638',
  address: 'UGF-6, Policlinic Chamber, Opp. Judges Bunglow Road, Satellite, Ahmedabad, Gujarat 380015',
  hours: [
    { days: 'Monday to Saturday', time: '10:00 AM to 8:00 PM' },
    { days: 'Sunday', time: '10:00 AM to 4:30 PM' },
  ],
} as const
