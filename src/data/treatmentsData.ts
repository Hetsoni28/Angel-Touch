export interface TreatmentItem {
  _id: string
  name: string
  slug: string
  category: string
  imageUrl?: string
  description?: string
  featured?: boolean
}

export const CATEGORY_MAP: Record<string, string> = {
  'threading': '1. Threading',
  'bleach-dtan': '2. Bleach / D-Tan',
  'clean-up': '3. Clean Up',
  'waxing': '4. Waxing',
  'facial': '5. Facial',
  'skin': '6. Skin Care',
  'shirodhara': '7. Shirodhara',
  'hair-cut': '8. Hair Cut',
  'scalp-analysis-hair-regrowth': '9. Scalp Analysis & Hair Regrowth',
  'hair-treatments': '10. Hair Treatments',
  'technical-style-services': '11. Technical & Style Services',
  'special-hair-care': '12. Special Hair Care',
  'hair-care-style': '13. Hair Care & Style',
  'hair-spa': '14. Hair Spa',
  'body-scrub': '15. Body Scrub',
  'body-wrap': '16. Body Wrap',
  'steam-bath': '17. Steam Bath',
  'hand-feet-care': '18. Hand & Feet Care',
  'body-care-spa': '19. Body Care & Spa',
  'body-spa': '20. Body Spa',
  'family-makeup': '21. All Family Makeup Services',
  'occasion-makeup': '22. Engagement / Occasion Makeup',
  'bridal-makeup': '23. Bridal Makeup Services',
  'bridal-packages': '24. Bridal Packages',
  'nail-art': '25. Nail Art Services',
}

export const OFFICIAL_CATEGORIES = [
  { key: 'threading', label: '1. Threading' },
  { key: 'bleach-dtan', label: '2. Bleach / D-Tan' },
  { key: 'clean-up', label: '3. Clean Up' },
  { key: 'waxing', label: '4. Waxing' },
  { key: 'facial', label: '5. Facial' },
  { key: 'skin', label: '6. Skin Care' },
  { key: 'shirodhara', label: '7. Shirodhara' },
  { key: 'hair-cut', label: '8. Hair Cut' },
  { key: 'scalp-analysis-hair-regrowth', label: '9. Scalp Analysis & Hair Regrowth' },
  { key: 'hair-treatments', label: '10. Hair Treatments' },
  { key: 'technical-style-services', label: '11. Technical & Style Services' },
  { key: 'special-hair-care', label: '12. Special Hair Care' },
  { key: 'hair-care-style', label: '13. Hair Care & Style' },
  { key: 'hair-spa', label: '14. Hair Spa' },
  { key: 'body-scrub', label: '15. Body Scrub' },
  { key: 'body-wrap', label: '16. Body Wrap' },
  { key: 'steam-bath', label: '17. Steam Bath' },
  { key: 'hand-feet-care', label: '18. Hand & Feet Care' },
  { key: 'body-care-spa', label: '19. Body Care & Spa' },
  { key: 'body-spa', label: '20. Body Spa' },
  { key: 'family-makeup', label: '21. All Family Makeup Services' },
  { key: 'occasion-makeup', label: '22. Engagement / Occasion Makeup' },
  { key: 'bridal-makeup', label: '23. Bridal Makeup Services' },
  { key: 'bridal-packages', label: '24. Bridal Packages' },
  { key: 'nail-art', label: '25. Nail Art Services' },
]

export const OFFICIAL_MENU_TREATMENTS: TreatmentItem[] = [
  // 1. Threading
  {
    _id: 'th-1',
    name: 'Eyebrow Threading',
    slug: 'eyebrow-threading',
    category: 'threading',
    description: 'Precision eyebrow shaping tailored to your natural facial geometry using high-grade organic thread and soothing aloe finish.',
  },
  {
    _id: 'th-2',
    name: 'Forehead Threading',
    slug: 'forehead-threading',
    category: 'threading',
    description: 'Clean, gentle hair removal across the forehead for a smooth, refined hairline and radiant complexion.',
  },
  {
    _id: 'th-3',
    name: 'Upper Lips Threading',
    slug: 'upper-lips-threading',
    category: 'threading',
    description: 'Quick and gentle fine hair removal above the lip line, finished with calming rose mist.',
  },
  {
    _id: 'th-4',
    name: 'Chin Threading',
    slug: 'chin-threading',
    category: 'threading',
    description: 'Focused threading to remove stubborn or fine chin hair, restoring a smooth, clean texture.',
  },
  {
    _id: 'th-5',
    name: 'Full Face Threading',
    slug: 'full-face-threading',
    category: 'threading',
    description: 'Complete facial threading covering forehead, upper lip, chin, and sides, completed with refreshing rose water and herbal calming gel.',
  },

  // 2. Bleach / D-Tan
  {
    _id: 'bl-1',
    name: 'Herbal Gold Radiance Bleach',
    slug: 'herbal-gold-radiance-bleach',
    category: 'bleach-dtan',
    description: 'Gentle herbal bleaching enriched with pure 24K gold dust and botanical extracts to lighten facial hair while protecting skin moisture.',
  },
  {
    _id: 'bl-2',
    name: 'Face & Neck Tan Clear D-Tan Pack',
    slug: 'face-neck-tan-clear-dtan',
    category: 'bleach-dtan',
    description: 'Advanced non-bleach sun-tan removal treatment using lactic acid, kojic acid, and pure sandalwood to restore even tone and clarity.',
  },

  // 3. Clean Up
  {
    _id: 'cu-1',
    name: 'Fresh Fruit Hydrating Clean Up',
    slug: 'fresh-fruit-hydrating-clean-up',
    category: 'clean-up',
    description: 'A refreshing quick skin ritual with real fruit pulp enzymes, gentle steam extraction, and hydrating papaya pack for youthful radiance.',
  },
  {
    _id: 'cu-2',
    name: 'Neem & Tulsi Anti-Blemish Clean Up',
    slug: 'neem-tulsi-anti-blemish-clean-up',
    category: 'clean-up',
    description: 'Purifying treatment specifically designed for oily and acne-prone skin, calming inflammation and clearing congested pores.',
  },
  {
    _id: 'cu-3',
    name: 'Deep Pore Clarifying Thermal Clean Up',
    slug: 'deep-pore-clarifying-clean-up',
    category: 'clean-up',
    description: 'Intense micro-exfoliation and gentle ultrasonic blackhead removal with a cooling tea tree clay mask for fresh, breathable skin.',
  },

  // 4. Waxing
  {
    _id: 'wx-1',
    name: 'Full Arms & Underarms Waxing',
    slug: 'full-arms-underarms-waxing',
    category: 'waxing',
    description: 'Smooth, hygienic hair removal using natural honey wax with anti-inflammatory chamomile oil for soft, hair-free skin.',
  },
  {
    _id: 'wx-2',
    name: 'Full Legs Honey Herbal Waxing',
    slug: 'full-legs-honey-herbal-waxing',
    category: 'waxing',
    description: 'Thorough hair removal from upper thigh to ankle with skin-soothing post-wax herbal moisturiser.',
  },
  {
    _id: 'wx-3',
    name: 'Premium Rica Liposoluble Waxing',
    slug: 'premium-rica-liposoluble-waxing',
    category: 'waxing',
    description: 'Colophony-free Italian Rica wax designed for delicate, sensitive skin, providing pain-free removal and superior skin softness.',
  },

  // 5. Facial
  {
    _id: 'fc-1',
    name: 'Advanced Aroma Botanical Facial',
    slug: 'advanced-aroma-facial',
    category: 'facial',
    featured: true,
    description: 'A deeply restorative signature facial using pure therapeutic essential oils to clarify, hydrate, and balance skin tone.',
  },
  {
    _id: 'fc-2',
    name: 'Kesar & Kumkumadi Royal Radiance Facial',
    slug: 'kesar-kumkumadi-royal-radiance-facial',
    category: 'facial',
    featured: true,
    description: 'Time-honoured Ayurvedic royal treatment formulated with pure Kashmiri saffron and Kumkumadi Tailam for luminous, youthful skin.',
  },
  {
    _id: 'fc-3',
    name: 'O3+ Bridal Glow Power Facial',
    slug: 'o3-bridal-glow-power-facial',
    category: 'facial',
    featured: true,
    description: 'High-performance oxygenating facial providing immediate luminosity, even skin texture, and long-lasting camera-ready bridal brilliance.',
  },
  {
    _id: 'fc-4',
    name: 'Ayurvedic Shahnaz Gold Glow Facial',
    slug: 'ayurvedic-shahnaz-gold-glow-facial',
    category: 'facial',
    description: 'Rejuvenating anti-toxin facial with 24K gold foil and precious botanical extracts to restore youthful elasticity and golden complexion.',
  },
  {
    _id: 'fc-5',
    name: 'Skin Brightening Vitamin C Facial',
    slug: 'skin-brightening-vitamin-c-facial',
    category: 'facial',
    description: 'Targeted brightening facial infused with active Vitamin C and kakadu plum to reverse sun damage, fade spots, and boost collagen.',
  },
  {
    _id: 'fc-6',
    name: 'Deep Marine Hydrating Dew Facial',
    slug: 'deep-marine-hydrating-dew-facial',
    category: 'facial',
    description: 'Intense moisture bath for dry, dehydrated skin with marine algae extracts, hyaluronic serum, and cryogenic cooling mask.',
  },
  {
    _id: 'fc-7',
    name: 'Papaya Anti-Pigmentation Facial',
    slug: 'papaya-anti-pigmentation-facial',
    category: 'facial',
    description: 'Natural fruit enzyme therapy designed to gently exfoliate melanin clusters, fade tanning, and reveal a clear, even complexion.',
  },
  {
    _id: 'fc-8',
    name: 'Collagen Firming & Anti-Ageing Facial',
    slug: 'collagen-firming-anti-ageing-facial',
    category: 'facial',
    description: 'Stimulating lymphatic lift facial utilizing firming plant peptides and acupressure to tone facial muscles and soften fine lines.',
  },

  // 6. Skin
  {
    _id: 'sk-1',
    name: 'Acne Calming & Herbal Clarifying Treatment',
    slug: 'acne-calming-clarifying-treatment',
    category: 'skin',
    description: 'Targeted clinical skincare therapy utilizing medicated neem, camphor, and high-frequency antibacterial therapy to eliminate active breakouts.',
  },
  {
    _id: 'sk-2',
    name: 'Hyperpigmentation & Dark Spot Correction',
    slug: 'hyperpigmentation-dark-spot-correction',
    category: 'skin',
    description: 'Focused Ayurvedic protocol blending Manjistha, licorice, and AHA fruit acids to reduce stubborn post-acne blemishes and melasma.',
  },
  {
    _id: 'sk-3',
    name: 'Skin Barrier Intense Moisture Repair Ritual',
    slug: 'skin-barrier-moisture-repair',
    category: 'skin',
    description: 'Restorative barrier repair treatment for compromised, peeling, or sensitized skin using ceramides, squalane, and pure centella asiatica.',
  },

  // 7. Shirodhara
  {
    _id: 'sh-1',
    name: 'Classical Medicated Herbal Oil Shirodhara',
    slug: 'shirodhara',
    category: 'shirodhara',
    featured: true,
    description: 'A continuous, rhythmic stream of warm medicated herbal oil poured over the third eye center to dissolve mental fatigue and insomnia.',
  },
  {
    _id: 'sh-2',
    name: 'Ksheeradhara (Medicated Milk Stream Therapy)',
    slug: 'ksheeradhara-milk-stream-therapy',
    category: 'shirodhara',
    description: 'Cooling Ayurvedic therapy using medicated herbal milk infused with sandalwood and vetiver, ideal for relieving Pitta heat, headaches, and anxiety.',
  },
  {
    _id: 'sh-3',
    name: 'Shirodhara with Head, Neck & Marma Massage',
    slug: 'shirodhara-head-neck-marma-massage',
    category: 'shirodhara',
    description: 'Complete restorative package combining warm stream Shirodhara with deeply therapeutic pressure on head, neck, and shoulder energy points.',
  },

  // 8. Hair Cut
  {
    _id: 'hc-1',
    name: 'Advanced Layered Hair Cut with Blowdry',
    slug: 'advanced-layered-hair-cut',
    category: 'hair-cut',
    description: 'Custom layered cut designed to enhance natural volume and texture, complemented with a professional styling blowdry.',
  },
  {
    _id: 'hc-2',
    name: 'Precision Feather & Step Cut with Hair Wash',
    slug: 'feather-step-cut-hair-wash',
    category: 'hair-cut',
    description: 'Texturising cut creating effortless movement and soft framing, including refreshing herbal shampoo and smoothing conditioning.',
  },

  // 9. Scalp Analysis & Hair Regrowth
  {
    _id: 'sa-1',
    name: 'Micro-Camera Scalp & Follicle Analysis',
    slug: 'micro-camera-scalp-analysis',
    category: 'scalp-analysis-hair-regrowth',
    description: 'High-magnification digital diagnosis of scalp sebum, follicle health, thinning patterns, and customized Ayurvedic botanical recommendations.',
  },
  {
    _id: 'sa-2',
    name: 'Ayurvedic Bhringraj Hair Regrowth Therapy',
    slug: 'ayurvedic-bhringraj-hair-regrowth',
    category: 'scalp-analysis-hair-regrowth',
    description: 'Intensive scalp stimulation with hand-pressed Bhringraj, Brahmi, and Amla oils, combined with high-frequency micro-current to activate dormant follicles.',
  },

  // 10. Hair Treatments
  {
    _id: 'ht-1',
    name: 'Keratin Protein Deep Reconstruction Treatment',
    slug: 'keratin-protein-deep-reconstruction',
    category: 'hair-treatments',
    description: 'Intensive salon treatment that restores depleted keratin bonds, eliminates frizz, and seals hair cuticles for mirror-like shine.',
  },
  {
    _id: 'ht-2',
    name: 'Organic Hair Smoothening Ritual',
    slug: 'organic-hair-smoothening-ritual',
    category: 'hair-treatments',
    description: 'Formaldehyde-free organic smoothening system providing natural straightness, softness, and easy manageability for up to 6 months.',
  },

  // 11. Technical & Style Services
  {
    _id: 'ts-1',
    name: 'Ammonia-Free Global Hair Colouring',
    slug: 'ammonia-free-global-hair-colour',
    category: 'technical-style-services',
    description: 'Gentle, full-coverage hair color infused with conditioning argan oil for rich, glossy tones without scalp irritation.',
  },
  {
    _id: 'ts-2',
    name: 'Balayage & Ombre Sun-Kissed Highlights',
    slug: 'balayage-ombre-highlights',
    category: 'technical-style-services',
    description: 'Hand-painted seamless highlights creating natural dimension, depth, and luminosity customized to your skin undertone.',
  },

  // 12. Special Hair Care
  {
    _id: 'shc-1',
    name: 'Scalp Detox & Dandruff Relief Therapy',
    slug: 'scalp-detox-dandruff-relief',
    category: 'special-hair-care',
    description: 'Deep-cleansing scalp exfoliation with tea tree, neem, and salicylic wash to clear stubborn dandruff flakes and soothe itching.',
  },

  // 13. Hair Care & Style
  {
    _id: 'hcs-1',
    name: 'Everyday Luxury Hair Wash & Volumising Blowdry',
    slug: 'luxury-hair-wash-blowdry',
    category: 'hair-care-style',
    description: 'Invigorating scalp wash with herbal botanicals followed by a salon-grade voluminous blowdry that lasts for days.',
  },

  // 14. Hair Spa
  {
    _id: 'hsp-1',
    name: 'Botanical Ayurvedic Hair Spa with Hot Towel Steam',
    slug: 'botanical-hair-spa',
    category: 'hair-spa',
    featured: true,
    description: 'Intensive nourishment for scalp and lengths using warm botanical oils, steam infusion, and herbal mask to restore strength and bounce.',
  },
  {
    _id: 'hsp-2',
    name: 'Moroccan Argan Deep Nourishing Hair Spa',
    slug: 'moroccan-argan-hair-spa',
    category: 'hair-spa',
    description: 'Luxury moisturizing ritual with pure Moroccan argan elixir, delivering deep hydration, silkiness, and cuticle repair for damaged hair.',
  },

  // 15. Body Scrub
  {
    _id: 'bs-1',
    name: 'Ayurvedic Ubtan & Turmeric Herbal Body Scrub',
    slug: 'ayurvedic-ubtan-body-scrub',
    category: 'body-scrub',
    description: 'Traditional whole-body exfoliation with chickpea flour, wild turmeric, sandalwood, and rose water to buff away dead cells and brighten skin.',
  },

  // 16. Body Wrap
  {
    _id: 'bw-1',
    name: 'Detoxifying Green Clay Herbal Body Wrap',
    slug: 'detoxifying-green-clay-body-wrap',
    category: 'body-wrap',
    description: 'Mineral-rich bentonite and French green clay body mask that draws out subcutaneous impurities and deeply re-mineralises the body.',
  },

  // 17. Steam Bath
  {
    _id: 'sb-1',
    name: 'Classical Swedana Herbal Steam Bath',
    slug: 'classical-swedana-steam-bath',
    category: 'steam-bath',
    description: 'Traditional Ayurvedic steam chamber therapy infused with dashamoola and eucalyptus herbs to dilate circulation channels and eliminate toxins.',
  },

  // 18. Hand & Feet Care
  {
    _id: 'hfc-1',
    name: 'Rose Petal Luxury Spa Manicure',
    slug: 'rose-petal-spa-manicure',
    category: 'hand-feet-care',
    description: 'Indulgent hand soak in warm rose petal milk, dead skin exfoliation, cuticle grooming, hand massage with saffron butter, and nail shaping.',
  },
  {
    _id: 'hfc-2',
    name: 'Ayurvedic Kansa Wand Spa Pedicure',
    slug: 'ayurvedic-kansa-wand-spa-pedicure',
    category: 'hand-feet-care',
    description: 'Holistic foot treatment combining dead sea salt scrub, cracked heel care, and detoxifying Kansa bronze wand massage for deep relaxation.',
  },

  // 19. Body Care & Spa
  {
    _id: 'bcs-1',
    name: 'Back, Neck & Shoulder Tension Relief Therapy',
    slug: 'back-neck-shoulder-tension-relief',
    category: 'body-care-spa',
    description: 'Therapeutic pressure massage focusing on chronic knots in upper back, trapeziums, and neck using warm Mahanarayan herbal oil.',
  },

  // 20. Body Spa
  {
    _id: 'bsp-1',
    name: 'Signature Full Body Abhyanga with Medicated Oils',
    slug: 'signature-full-body-abhyanga',
    category: 'body-spa',
    description: 'Rhythmic, warm herbal oil massage from scalp to toes following energy channels (Nadis) to lubricate joints, tone muscles, and ground the mind.',
  },

  // 21. All Family Makeup Services
  {
    _id: 'fmk-1',
    name: 'Family & Siders Party Glam Makeup',
    slug: 'family-siders-party-glam-makeup',
    category: 'family-makeup',
    description: 'Elegant, long-lasting festive makeup and hair styling for mother, sisters, and wedding guests, tailored to complement ethnic attire.',
  },

  // 22. Engagement / Ring Ceremony / Baby Shower Makeup Services
  {
    _id: 'omk-1',
    name: 'Engagement HD Glam Makeup & Hair Do',
    slug: 'engagement-hd-glam-makeup',
    category: 'occasion-makeup',
    description: 'Modern, luminous high-definition makeup with soft contouring and bespoke hairstyling designed for ring ceremonies and sangeet celebrations.',
  },
  {
    _id: 'omk-2',
    name: 'Traditional Godh Bharai / Baby Shower Glow Makeup',
    slug: 'godh-bharai-baby-shower-makeup',
    category: 'occasion-makeup',
    description: 'Soft, graceful natural glow makeup with lightweight hydrating base and traditional floral hair adornment for maternity ceremonies.',
  },

  // 23. Bridal Makeup Services
  {
    _id: 'bm-1',
    name: 'Signature Traditional Gujarati Bridal Makeup',
    slug: 'bridal-styling',
    category: 'bridal-makeup',
    featured: true,
    description: 'Flawless, royal bridal makeover with authentic Panetar and Gharchola dupatta draping, jewelry setting, and waterproof HD makeup.',
  },
  {
    _id: 'bm-2',
    name: 'Royal Luxury HD Bridal Makeover & Draping',
    slug: 'royal-luxury-hd-bridal-makeover',
    category: 'bridal-makeup',
    description: 'High-definition bridal makeup using international luxury cosmetics, complete with elaborate hairstyle, lashes, and professional draping.',
  },

  // 24. Bridal Packages
  {
    _id: 'bp-1',
    name: '7-Day Pre-Bridal Radiance Glow Program',
    slug: 'pre-bridal-radiance-glow-program',
    category: 'bridal-packages',
    description: 'A 7-day curated salon program including full body polishing, Ayurvedic facials, hair spa, manicure, pedicure, and full body waxing.',
  },

  // 25. Nail Art Services
  {
    _id: 'na-1',
    name: 'Bridal French Tip & Glitter Accent Nail Art',
    slug: 'bridal-french-tip-glitter-nail-art',
    category: 'nail-art',
    description: 'Sophisticated bridal manicured nails with gel extensions, elegant ombré French tips, and delicate gold glitter or stone accents.',
  },
]
