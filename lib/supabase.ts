import { createClient } from "@supabase/supabase-js"
export { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables")
}

// Create a single supabase client for interacting with your database
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Server-side client (for API routes and server actions)
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing server-side Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

// Client-side singleton pattern
let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient && supabaseUrl && supabaseAnonKey) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseClient
}

// Auth helpers
export async function signUp(email: string, password: string) {
  if (!supabase) throw new Error("Supabase client not available")

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || "https://flowfactor-test.vercel.app",
    },
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error("Supabase client not available")

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  if (!supabase) throw new Error("Supabase client not available")

  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  if (!supabase) throw new Error("Supabase client not available")

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    return { user: user || null, error }
  } catch (error) {
    return { user: null, error }
  }
}

// Database helpers
export async function insertData(table: string, data: any) {
  if (!supabase) throw new Error("Supabase client not available")

  const { data: result, error } = await supabase.from(table).insert(data).select()
  return { data: result, error }
}

export async function fetchData(table: string, filters?: any) {
  if (!supabase) throw new Error("Supabase client not available")

  let query = supabase.from(table).select("*")

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
  }

  const { data, error } = await query
  return { data, error }
}

export async function updateData(table: string, id: string, updates: any) {
  if (!supabase) throw new Error("Supabase client not available")

  const { data, error } = await supabase.from(table).update(updates).eq("id", id).select()
  return { data, error }
}

export async function deleteData(table: string, id: string) {
  if (!supabase) throw new Error("Supabase client not available")

  const { data, error } = await supabase.from(table).delete().eq("id", id)
  return { data, error }
}

// Storage helpers
export async function uploadFile(bucket: string, path: string, file: File) {
  if (!supabase) throw new Error("Supabase client not available")
  if (!file) throw new Error("File is required")
  if (!file.name) throw new Error("File must have a name")
  if (typeof file.size !== "number") throw new Error("File must have a valid size")

  const { data, error } = await supabase.storage.from(bucket).upload(path, file)
  return { data, error }
}

export async function getFileUrl(bucket: string, path: string) {
  if (!supabase) throw new Error("Supabase client not available")

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFile(bucket: string, path: string) {
  if (!supabase) throw new Error("Supabase client not available")

  const { data, error } = await supabase.storage.from(bucket).remove([path])
  return { data, error }
}
