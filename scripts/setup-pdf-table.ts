import { createClient } from "@supabase/supabase-js"

// Use the environment variables that are already configured
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase credentials")
  console.error("Required: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupTable() {
  console.log("🔧 Checking pdf_documents table...")

  try {
    // Test if table exists by trying to select
    const { error: selectError } = await supabase.from("pdf_documents").select("count").limit(1)

    if (selectError) {
      if (selectError.message.includes("does not exist") || selectError.code === "42P01") {
        console.log("\n❌ Table does not exist!")
        console.log("\n📋 Please create it in your Supabase SQL Editor:")
        console.log("Go to: https://supabase.com/dashboard → Your Project → SQL Editor\n")
        console.log("=".repeat(60))
        console.log(`
CREATE TABLE IF NOT EXISTS pdf_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  blob_url TEXT NOT NULL UNIQUE,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  file_size BIGINT,
  extracted_text TEXT,
  category TEXT DEFAULT 'knowledge-base' CHECK (category IN ('knowledge-base', 'uploads'))
);

CREATE INDEX IF NOT EXISTS idx_pdf_documents_category ON pdf_documents(category);
CREATE INDEX IF NOT EXISTS idx_pdf_documents_uploaded_at ON pdf_documents(uploaded_at DESC);
        `)
        console.log("=".repeat(60) + "\n")
        console.log("✅ After creating the table, run: scripts/01-setup-and-migrate.ts")
      } else {
        console.error("❌ Connection error:", selectError.message)
      }
    } else {
      console.log("✅ Table already exists!")
      console.log("You can now run: scripts/01-setup-and-migrate.ts")
    }
  } catch (err) {
    console.error("❌ Setup check failed:", err)
  }
}

setupTable()
