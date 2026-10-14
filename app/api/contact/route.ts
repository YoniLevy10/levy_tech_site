import { NextResponse } from "next/server"
import { z } from "zod"
import { CONTACT_EMAIL } from "@/lib/site"

export const runtime = "nodejs"

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email().max(200),
  message: z.string().trim().max(4000).optional().default(""),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "validation", details: parsed.error.flatten() }, { status: 400 })
  }

  const { name, company, email, message } = parsed.data
  const formspreeId = process.env.FORMSPREE_FORM_ID
  const resendKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL

  if (!formspreeId && !resendKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 })
  }

  try {
    if (formspreeId) {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          email,
          message,
          _subject: `OpsBrain inquiry from ${name}`,
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        console.error("Formspree error:", res.status, text)
        return NextResponse.json({ error: "upstream" }, { status: 502 })
      }

      return NextResponse.json({ ok: true, provider: "formspree" })
    }

    // Resend path
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "OpsBrain <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `OpsBrain inquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Company: ${company || "—"}`,
          `Email: ${email}`,
          "",
          message || "(no message)",
        ].join("\n"),
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("Resend error:", res.status, text)
      return NextResponse.json({ error: "upstream" }, { status: 502 })
    }

    return NextResponse.json({ ok: true, provider: "resend" })
  } catch (err) {
    console.error("Contact route error:", err)
    return NextResponse.json({ error: "server" }, { status: 500 })
  }
}
