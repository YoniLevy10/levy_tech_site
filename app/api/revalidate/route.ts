import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
  const secret = process.env.WEBHOOK_SECRET
  const incoming = req.nextUrl.searchParams.get("secret")

  if (secret && incoming !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  revalidatePath("/", "layout")
  revalidatePath("/projects", "layout")

  return NextResponse.json({ revalidated: true, ts: Date.now() })
}
