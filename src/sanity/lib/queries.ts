import { groq } from 'next-sanity'

export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] {
    _id,
    name,
    "slug": slug.current,
    "category": category->name,
    "imageUrl": images[0].asset->url,
    "description": description[0].children[0].text,
    featured
  } | order(name asc)
`

export const ALL_CATEGORIES_QUERY = groq`
  *[_type == "productCategory"] {
    _id,
    name,
    "slug": slug.current
  } | order(name asc)
`


export const ALL_TREATMENTS_QUERY = groq`
  *[_type == "treatment"] {
    _id,
    name,
    "slug": slug.current,
    category,
    subcategory,
    duration,
    featured,
    description
  } | order(name asc)
`

export const ALL_MASTERCLASSES_QUERY = groq`
  *[_type == "masterclass"] {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": coalesce(image.asset->url, null),
    shortDescription,
    date,
    duration,
    price
  } | order(date asc)
`

export const MASTERCLASS_BY_SLUG_QUERY = groq`
  *[_type == "masterclass" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "imageUrl": coalesce(image.asset->url, null),
    shortDescription,
    date,
    duration,
    price,
    recordingUrl
  }
`

export const ALL_ACADEMY_COURSES_QUERY = groq`
  *[_type == "academyCourse"] {
    _id,
    num,
    name,
    "slug": slug.current,
    group,
    categoryKey,
    duration,
    description,
    syllabus,
    price,
    featured
  } | order(num asc)
`
