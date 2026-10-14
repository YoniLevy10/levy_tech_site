/** Shared marketing-site constants (OpsBrain). */

export const BRAND_NAME = "OpsBrain"
export const CONTACT_EMAIL = "OpsBrain1@gmail.com"

/** Israel mobile 054-817-4688 in international format for wa.me */
export const WHATSAPP_E164 = "972548174688"

export const WHATSAPP_PREFILL_EN =
  "Hi OpsBrain — I'd like to discuss a custom system for my business."
export const WHATSAPP_PREFILL_HE =
  "שלום OpsBrain — אשמח לדבר על מערכת מותאמת לעסק שלי."
export const WHATSAPP_PREFILL_FR =
  "Bonjour OpsBrain — je souhaiterais discuter d'un systeme sur mesure pour mon entreprise."

export function whatsappUrl(message: string = WHATSAPP_PREFILL_HE): string {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://project-g7xfs.vercel.app"
