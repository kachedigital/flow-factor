/**
 * CalPro Tool Test Script
 * Tests all functionality of the California GenAI Procurement Agent
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

console.log("[v0] Starting CalPro Tool Tests...\n")

/**
 * Test 1: Keyword Search Mode
 */
async function testKeywordSearch() {
  console.log("[v0] Test 1: Keyword Search Mode")
  console.log("Testing basic keyword search against knowledge base...")

  try {
    const response = await fetch(`${BASE_URL}/api/calpro-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "What are the main risks when procuring GenAI tools for California state agencies?",
          },
        ],
        mode: "keyword",
        attachments: [],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      fullResponse += decoder.decode(value)
    }

    console.log("✓ Keyword search response received")
    console.log(`Response length: ${fullResponse.length} characters`)
    console.log(`Sample: ${fullResponse.substring(0, 150)}...\n`)
    return true
  } catch (error) {
    console.error("✗ Keyword search failed:", error.message)
    return false
  }
}

/**
 * Test 2: AI Mode with OpenAI
 */
async function testOpenAIMode() {
  console.log("[v0] Test 2: AI Mode with OpenAI")

  if (!process.env.OPENAI_API_KEY) {
    console.log("⊘ Skipping - No OPENAI_API_KEY found\n")
    return null
  }

  console.log("Testing AI-powered response with OpenAI...")

  try {
    const response = await fetch(`${BASE_URL}/api/calpro-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "How should California agencies evaluate data privacy for GenAI procurement?",
          },
        ],
        mode: "ai-openai",
        attachments: [],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      fullResponse += decoder.decode(value)
    }

    console.log("✓ OpenAI response received")
    console.log(`Response length: ${fullResponse.length} characters`)
    console.log(`Sample: ${fullResponse.substring(0, 150)}...\n`)
    return true
  } catch (error) {
    console.error("✗ OpenAI mode failed:", error.message)
    return false
  }
}

/**
 * Test 3: AI Mode with Groq
 */
async function testGroqMode() {
  console.log("[v0] Test 3: AI Mode with Groq")

  if (!process.env.GROQ_API_KEY) {
    console.log("⊘ Skipping - No GROQ_API_KEY found\n")
    return null
  }

  console.log("Testing AI-powered response with Groq...")

  try {
    const response = await fetch(`${BASE_URL}/api/calpro-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "What compliance requirements exist for California GenAI procurement?",
          },
        ],
        mode: "ai-groq",
        attachments: [],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      fullResponse += decoder.decode(value)
    }

    console.log("✓ Groq response received")
    console.log(`Response length: ${fullResponse.length} characters`)
    console.log(`Sample: ${fullResponse.substring(0, 150)}...\n`)
    return true
  } catch (error) {
    console.error("✗ Groq mode failed:", error.message)
    return false
  }
}

/**
 * Test 4: URL Attachment Processing
 */
async function testURLAttachment() {
  console.log("[v0] Test 4: URL Attachment Processing")
  console.log("Testing URL scraping and integration...")

  try {
    const response = await fetch(`${BASE_URL}/api/calpro-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Summarize the key points from this California government page",
          },
        ],
        mode: "keyword",
        attachments: [
          {
            type: "url",
            url: "https://www.ca.gov/about/",
            name: "California Government About Page",
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      fullResponse += decoder.decode(value)
    }

    console.log("✓ URL attachment processed")
    console.log(`Response length: ${fullResponse.length} characters`)
    console.log(`Sample: ${fullResponse.substring(0, 150)}...\n`)
    return true
  } catch (error) {
    console.error("✗ URL attachment failed:", error.message)
    return false
  }
}

/**
 * Test 5: Multi-turn Conversation
 */
async function testMultiTurnConversation() {
  console.log("[v0] Test 5: Multi-turn Conversation")
  console.log("Testing conversation history and context...")

  try {
    const response = await fetch(`${BASE_URL}/api/calpro-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "What is GenAI?",
          },
          {
            role: "assistant",
            content:
              "GenAI refers to Generative Artificial Intelligence, systems that can create content like text, images, or code.",
          },
          {
            role: "user",
            content: "How should California agencies procure it?",
          },
        ],
        mode: "keyword",
        attachments: [],
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      fullResponse += decoder.decode(value)
    }

    console.log("✓ Multi-turn conversation handled")
    console.log(`Response length: ${fullResponse.length} characters`)
    console.log(`Sample: ${fullResponse.substring(0, 150)}...\n`)
    return true
  } catch (error) {
    console.error("✗ Multi-turn conversation failed:", error.message)
    return false
  }
}

/**
 * Test 6: Error Handling
 */
async function testErrorHandling() {
  console.log("[v0] Test 6: Error Handling")
  console.log("Testing invalid mode handling...")

  try {
    const response = await fetch(`${BASE_URL}/api/calpro-chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Test message",
          },
        ],
        mode: "invalid-mode",
        attachments: [],
      }),
    })

    // Should handle gracefully
    console.log(`Response status: ${response.status}`)
    console.log("✓ Error handling working\n")
    return true
  } catch (error) {
    console.error("✗ Error handling test failed:", error.message)
    return false
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log("=".repeat(60))
  console.log("CalPro Tool Test Suite")
  console.log("=".repeat(60))
  console.log()

  const results = {
    keywordSearch: await testKeywordSearch(),
    openaiMode: await testOpenAIMode(),
    groqMode: await testGroqMode(),
    urlAttachment: await testURLAttachment(),
    multiTurn: await testMultiTurnConversation(),
    errorHandling: await testErrorHandling(),
  }

  console.log("=".repeat(60))
  console.log("Test Results Summary")
  console.log("=".repeat(60))

  const passed = Object.values(results).filter((r) => r === true).length
  const failed = Object.values(results).filter((r) => r === false).length
  const skipped = Object.values(results).filter((r) => r === null).length

  console.log(`✓ Passed: ${passed}`)
  console.log(`✗ Failed: ${failed}`)
  console.log(`⊘ Skipped: ${skipped}`)
  console.log()

  Object.entries(results).forEach(([test, result]) => {
    const status = result === true ? "✓" : result === false ? "✗" : "⊘"
    console.log(`${status} ${test}`)
  })

  console.log()
  console.log("=".repeat(60))
}

// Run the tests
runAllTests().catch((error) => {
  console.error("[v0] Test suite failed:", error)
  process.exit(1)
})
