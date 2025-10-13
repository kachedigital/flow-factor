import { NextResponse } from "next/server"
import { insertData, fetchData } from "@/lib/supabase"

export async function POST(request: Request) {
  const { mood, context, user_id } = await request.json()

  const { data, error } = await insertData("mood_entries", {
    mood,
    context,
    user_id,
    created_at: new Date().toISOString(),
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ entry: data })
}

export async function GET() {
  const { data, error } = await fetchData("mood_entries", undefined, {
    orderBy: { column: "created_at", ascending: false },
    limit: 10,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ entries: data })
}
