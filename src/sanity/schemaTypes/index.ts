import { seo } from './seo'
import { productCategory } from './productCategory'
import { product } from './product'
import { treatment } from './treatment'
import { masterclassType } from './masterclass'
import { membershipPlan } from './membershipPlan'
import { siteSettings } from './siteSettings'
import { faq } from './faq'
import { blockContent } from './blockContent'

export const schemaTypes = [
  seo,
  blockContent,
  productCategory,
  product,
  treatment,
  masterclassType,
  membershipPlan,
  siteSettings,
  faq
]