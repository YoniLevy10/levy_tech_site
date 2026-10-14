import { NextResponse } from "next/server"
import { fetchAllProjects } from "@/lib/github"

export const revalidate = 21600 // 6h

export async function GET() {
  try {
    const projects = await fetchAllProjects()
    return NextResponse.json(projects)
  } catch (error) {
    // Missing/invalid GITHUB_TOKEN must not break prerender — return empty list
    console.warn("[api/projects] GitHub unavailable:", error)
    return NextResponse.json([])
  }
}
