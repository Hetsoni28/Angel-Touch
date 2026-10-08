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
    "imageUrl": images[0].asset->url,
    "description": description[0].children[0].text,
    duration
  } | order(name asc)
`
