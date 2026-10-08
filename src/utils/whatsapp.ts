/**
 * WhatsApp Inquiry Utility
 * ─────────────────────────────────────────────
 * Formats structured messages and redirects to WhatsApp.
 * This avoids building a custom inquiry dashboard and sends leads
 * straight to the client's phone.
 */

// Format: Use country code without + or 00
const WHATSAPP_NUMBER = '919723179638' // Heena Thaker's business number

type InquiryType = 'TREATMENT' | 'PRODUCT' | 'GENERAL' | 'CLASS'

interface InquiryParams {
  type: InquiryType
  itemName?: string // e.g. "Ayurvedic Shirodhara" or "Kesar Radiance Oil"
  message?: string
}

export function generateWhatsAppLink({ type, itemName, message }: InquiryParams): string {
  let text = ''

  switch (type) {
    case 'TREATMENT':
      text = `Hello Angel Touch, I would like to inquire about booking the *${itemName}* treatment.`
      break
    case 'PRODUCT':
      text = `Hello Angel Touch, I am interested in purchasing the *${itemName}*. Could you share more details?`
      break
    case 'CLASS':
      text = `Hello Angel Touch, I would like to inquire about the upcoming *${itemName}* masterclass.`
      break
    case 'GENERAL':
    default:
      text = `Hello Angel Touch, I have an inquiry.`
      break
  }

  if (message) {
    text += `\n\n${message}`
  }

  const encodedText = encodeURIComponent(text)
  
  // Use wa.me shortlink for broad device compatibility (web, iOS, Android)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`
}
