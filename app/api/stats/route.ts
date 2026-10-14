import { NextResponse } from "next/server"
import { fetchGitHubStats } from "@/lib/github"

export const revalidate = 21600

export async function GET() {
  try {
    const stats = await fetchGitHubStats()
    return NextResponse.json(stats)
  } catch (error) {
    console.warn("[api/stats] GitHub unavailable:", error)
    return NextResponse.json({
      totalProjects: 0,
      activeProjects: 0,
      productionSystems: 0,
      commits30Days: 0,
      languagesUsed: 0,
    })
  }
}
