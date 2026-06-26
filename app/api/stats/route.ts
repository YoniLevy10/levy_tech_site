import { NextResponse } from "next/server"
import { fetchGitHubStats } from "@/lib/github"

export const revalidate = 21600

export async function GET() {
  try {
    const stats = await fetchGitHubStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.error("[api/stats]", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
