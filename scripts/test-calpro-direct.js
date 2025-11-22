/**
 * Direct CalPro API Test
 * Tests the CalPro API endpoint directly without UI dependencies
 */

// Simple test to verify CalPro API is working
async function testCalProAPI() {
  console.log("🧪 Testing CalPro API...\n")

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const apiUrl = `${baseUrl}/api/calpro-chat`

  try {
    // Test 1: Basic keyword search
    console.log("Test 1: Keyword Search Mode")
    const keywordResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "What is the procurement process for AI software in California?" }],
        mode: "keyword",
      }),
    })

    if (!keywordResponse.ok) {
      throw new Error(`Keyword search failed: ${keywordResponse.statusText}`)
    }

    console.log("✓ Keyword search mode working")

    // Test 2: OpenAI mode (if key exists)
    if (process.env.OPENAI_API_KEY) {
      console.log("\nTest 2: OpenAI Mode")
      const openaiResponse = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Explain California GenAI procurement requirements" }],
          mode: "ai",
          model: "openai",
        }),
      })

      if (!openaiResponse.ok) {
        throw new Error(`OpenAI mode failed: ${openaiResponse.statusText}`)
      }

      console.log("✓ OpenAI mode working")
    } else {
      console.log("\n⊘ Test 2: OpenAI Mode - Skipped (no API key)")
    }

    // Test 3: URL attachment
    console.log("\nTest 3: URL Attachment")
    const urlResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Summarize this page",
            experimental_attachments: [{ url: "https://www.dgs.ca.gov/PD", contentType: "text/url" }],
          },
        ],
        mode: "keyword",
      }),
    })

    if (!urlResponse.ok) {
      throw new Error(`URL attachment test failed: ${urlResponse.statusText}`)
    }

    console.log("✓ URL attachment working")

    console.log("\n✅ All tests passed!")
  } catch (error) {
    console.error("\n❌ Test failed:", error.message)
    throw error
  }
}

// Run tests
testCalProAPI()
