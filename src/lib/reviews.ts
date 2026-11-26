/**
 * Guest reviews shown on the site, copied word for word from the salon's
 * Google Business listing (SITE_INFO.google.placeUrl). Names are shortened to
 * first name + last initial for the reviewers' privacy.
 *
 * Only add reviews that are real and public on Google. Keep the wording exact.
 * (No Review/AggregateRating structured data: Google does not show self-published
 * reviews of a business as rich results, and marking them up can be flagged.)
 */
export type GuestReview = {
  quote: string
  name: string
  service: string
}

export const GUEST_REVIEWS: GuestReview[] = [
  {
    quote:
      'Finally found a place that knows how to handle hair spa treatments properly! My hair feels so soft and healthy now. The stylists are skilled and the prices are very reasonable for the quality you get.',
    name: 'Vidhi S.',
    service: 'Hair spa',
  },
  {
    quote:
      'I visited Angel Touch for a pre-wedding grooming session and was so impressed. They handled everything with such care. My makeup and hair for the function looked natural yet elegant. Thank you, team!',
    name: 'Neepa P.',
    service: 'Pre-wedding makeup & hair',
  },
  {
    quote:
      'I’m very picky about cleanliness, and Angel Touch exceeded my expectations. Everything is sanitized, and the cabins are spotless. It’s a very safe and comfortable environment for ladies.',
    name: 'Bijal B.',
    service: 'Salon visit',
  },
  {
    quote:
      'Angel Touch is my go-to spot for waxing and threading. They are quick, gentle, and very thorough. The staff makes you feel comfortable from the moment you walk in. Truly a specialized wellness center for women.',
    name: 'Dhruvi P.',
    service: 'Waxing & threading',
  },
  {
    quote:
      'Very nice service by Ms Heena Thakar and Ms. Bindu. Gentle and polite behaviour. Good technical knowledge for skin and hair. Many treatments are available. Large space and maintain individual privacy for the waxing and massage and other services.',
    name: 'Mitali P.',
    service: 'Skin & hair care',
  },
  {
    quote: 'Amazing shirodhara. It was most relaxing one.',
    name: 'Hirvita S.',
    service: 'Shirodhara',
  },
]
