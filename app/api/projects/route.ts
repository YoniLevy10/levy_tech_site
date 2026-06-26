import { NextResponse } from "next/server"
import { fetchAllProjects } from "@/lib/github"

export const revalidate = 21600 // 6h

export async function GET() {
  try {
    const projects = await fetchAllProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("[api/projects]", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
