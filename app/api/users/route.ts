import { NextResponse } from "next/server"
import { insertData, fetchData } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")

  const filters = email ? { email } : undefined
  const { data, error } = await fetchData("users", filters)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ users: data })
}

export async function POST(request: Request) {
  const body = await request.json()

  const { data, error } = await insertData("users", {
    email: body.email,
    name: body.name,
    created_at: new Date().toISOString(),
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ user: data })
}
