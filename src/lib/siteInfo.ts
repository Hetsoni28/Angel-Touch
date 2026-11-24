/**
 * Business details used on the FAQ and policy pages.
 * Keep in sync with the contact page if anything changes.
 */
export const SITE_INFO = {
  businessName: 'Angel Touch by Heena Thaker',
  shortName: 'Angel Touch',
  siteUrl: 'https://www.angeltouch.in',
  phoneDisplay: '+91 97231 79638',
  phoneHref: 'tel:+919723179638',
  address: 'UGF-6, Policlinic Chamber, Opp. Judges Bunglow Road, Satellite, Ahmedabad, Gujarat 380015',
  /**
   * The Google Business Profile — the source of truth for the map pin.
   * https://www.google.com/maps/place/Angel+Touch+Beauty+%26+Wellness+For+Women/@23.0361022,72.5175152
   */
  google: {
    name: 'Angel Touch Beauty & Wellness For Women',
    lat: 23.0361022,
    lng: 72.5175152,
    /** Opens the listing itself (reviews, photos, Directions button). Built from the place's CID. */
    placeUrl: 'https://maps.google.com/?cid=16348297432984312039',
    /** Turn-by-turn directions to the pin. */
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=23.0361022%2C72.5175152',
    /** Embeddable map centred on the listing. */
    embedUrl:
      'https://maps.google.com/maps?q=Angel+Touch+Beauty+%26+Wellness+For+Women&ll=23.0361022,72.5175152&z=17&hl=en&output=embed',
  },
  hours: [
    { days: 'Monday to Saturday', time: '10:00 AM to 8:00 PM' },
    { days: 'Sunday', time: '10:00 AM to 4:30 PM' },
  ],
} as const
