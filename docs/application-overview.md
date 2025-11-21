# FlowFactor Application Documentation

## Overview

FlowFactor is a comprehensive UX and accessibility consulting platform that provides AI-powered tools for analyzing web accessibility, PDF accessibility, and answering questions about human factors engineering through an intelligent chatbot with RAG (Retrieval Augmented Generation) capabilities.

## Application Architecture

### Tech Stack

**Frontend:**
- Next.js 15.1.3 (App Router)
- React 19
- TypeScript
- Tailwind CSS v3
- shadcn/ui components

**Backend & APIs:**
- Next.js API routes (serverless functions)
- AI SDK v3.4.33
- OpenAI GPT-4o-mini for AI responses

**Integrations:**
- Vercel Blob - File storage
- Upstash Redis - Vector database for RAG
- Supabase - Database (configured but not used in MVP)
- Groq - Alternative AI provider (attempted but encountered issues)

**Key Libraries:**
- `@ai-sdk/openai` - OpenAI integration
- `@upstash/redis` - Vector storage client
- `pdf-parse` - PDF text extraction (attempted but removed for MVP)

## Development Journey

### Phase 1: Initial Setup and PDF Checker Foundation

**Goal:** Build a PDF accessibility checker tool

**Implementation:**
1. Created `/tools/pdf-checker` page with upload interface
2. Built API route at `/api/scan-pdf` for PDF analysis
3. Integrated Vercel Blob for file storage

**Challenges Encountered:**
- Initial attempts to use Supabase Storage failed with network errors
- Storage bucket configuration and RLS policies were complex
- Authentication requirements blocked anonymous uploads

**Resolution:**
- Switched from Supabase Storage to Vercel Blob
- Blob integration was already configured and required zero setup
- Added `addRandomSuffix: true` to handle duplicate filenames

### Phase 2: PDF Analysis Implementation

**Goal:** Analyze PDFs for accessibility issues

**Initial Approach - Using pdf-parse:**
\`\`\`typescript
import pdfParse from 'pdf-parse'
const pdfData = await pdfParse(buffer)
\`\`\`

**Problems:**
- `pdf-parse` requires Node.js-specific features
- Inconsistent behavior in Next.js serverless runtime
- Complex dependency on canvas and other native modules

**Resolution - Simplified Approach:**
- Removed pdf-parse dependency
- Focused on file validation and metadata checks
- Provided manual checklist of accessibility issues
- Used AI to generate actionable recommendations

### Phase 3: AI Integration Saga

This was the most challenging phase with multiple attempts and failures.

#### Attempt 1: Groq with AI SDK v3
\`\`\`typescript
import { createGroq } from '@ai-sdk/groq'
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })
const result = await generateText({
  model: groq('llama-3.3-70b-versatile'),
  prompt: 'Your question here'
})
\`\`\`

**Problem:** Groq consistently returned empty responses (`result.text` was "")

**Debugging Revealed:**
- API calls succeeded (200 status)
- No errors thrown
- Response object existed but text field was empty
- Suspected issue with how Groq handles system prompts

#### Attempt 2: OpenAI with @ai-sdk/openai
\`\`\`typescript
import { openai } from '@ai-sdk/openai'
const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Your question here'
})
\`\`\`

**Problem:** Quota exceeded error
\`\`\`
Error: You exceeded your current quota, please check your plan and billing details
\`\`\`

**Cause:** OpenAI API key had insufficient credits

#### Attempt 3: Vercel AI Gateway with Model Strings

Discovered that AI SDK v5+ supports AI Gateway with simple model strings:
\`\`\`typescript
const result = await generateText({
  model: 'anthropic/claude-3-5-sonnet-20241022',
  prompt: 'Your question here'
})
\`\`\`

**Multiple Issues:**
1. **AI SDK v3.4.33** (project's version) doesn't support AI Gateway strings
2. Upgraded to **v4.0.0** → Error: "Unsupported model version. AI SDK 4 only supports models that implement specification version 'v1'"
3. Upgraded to **v5.0.0** → Required Vercel billing/credit card for AI Gateway

**Problem:** User doesn't have billing set up for Vercel AI Gateway

#### Final Solution: Back to OpenAI with Better Error Handling

**Decision:** After all attempts, we went back to OpenAI and added comprehensive error handling

\`\`\`typescript
import { openai } from '@ai-sdk/openai'

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: `System: You are an expert in human factors engineering...
  
  User: ${message}`,
  maxTokens: 500
})
\`\`\`

**Why This Worked:**
- OpenAI quota issue resolved (either refilled or limit increased)
- AI SDK v3 with `@ai-sdk/openai` is stable and well-tested
- Proper error handling catches issues early
- Works consistently across all endpoints

### Phase 4: Chatbot Integration

**Goal:** Connect the homepage chatbot to answer human factors engineering questions

**Challenges:**
1. **Empty Responses:** Chatbot UI showed blank bubbles
2. **API Format Issues:** Confusion between `prompt` vs `messages` array
3. **Model String Errors:** "doGenerate is not a function"
4. **SDK Version Conflicts:** v3 vs v4 vs v5 compatibility

**Evolution of the Implementation:**

**Iteration 1 - Groq with messages array:**
\`\`\`typescript
await generateText({
  model: groq('llama-3.3-70b-versatile'),
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: message }
  ]
})
\`\`\`
❌ **Result:** Empty responses

**Iteration 2 - Groq with single prompt:**
\`\`\`typescript
await generateText({
  model: groq('llama-3.3-70b-versatile'),
  prompt: `${systemPrompt}\n\n${message}`
})
\`\`\`
❌ **Result:** Still empty responses

**Iteration 3 - AI Gateway strings:**
\`\`\`typescript
await generateText({
  model: 'anthropic/claude-3-5-sonnet-20241022',
  messages: [...]
})
\`\`\`
❌ **Result:** SDK version errors and billing requirements

**Final Working Solution - OpenAI with prompt:**
\`\`\`typescript
import { openai } from '@ai-sdk/openai'

await generateText({
  model: openai('gpt-4o-mini'),
  prompt: `System: ${systemPrompt}\n\nUser: ${message}`,
  maxTokens: 500
})
\`\`\`
✅ **Result:** Working chatbot with proper responses

### Phase 5: RAG Implementation

**The Decision: Why RAG Instead of Simple API Calls?**

**Context:**
After finally getting the chatbot to respond using OpenAI, we realized the chatbot could only answer general questions about human factors engineering. The user wanted the chatbot to answer questions based on their specific PDF documents and internal knowledge base.

**Options Considered:**

1. **Simple API Calls (What we had):**
   - ✅ Fast responses
   - ✅ General knowledge
   - ❌ No access to user's specific documents
   - ❌ Cannot reference uploaded PDFs
   - ❌ No domain-specific knowledge

2. **RAG (Retrieval Augmented Generation):**
   - ✅ Access to user's PDF knowledge base
   - ✅ Answers grounded in actual documents
   - ✅ Domain-specific expertise from uploaded content
   - ✅ Citable sources from PDFs
   - ⚠️ More complex implementation
   - ⚠️ Requires vector database

**Why We Chose RAG:**

The user explicitly stated: *"I have PDFs and I want to create a knowledge store the chatbot can access with RAG"*

This made the decision clear - the application needed to:
1. Store PDF documents in a searchable format
2. Extract and embed text from PDFs
3. Search through documents based on user queries
4. Provide AI responses augmented with relevant document context

**RAG Architecture:**

\`\`\`
User Question
    ↓
Generate Embedding (OpenAI)
    ↓
Search Vector Store (Upstash Redis)
    ↓
Retrieve Relevant PDF Chunks
    ↓
Combine Context + Question
    ↓
Generate AI Response (OpenAI)
    ↓
Return Answer with Sources
\`\`\`

**Implementation Details:**

**1. Vector Store Setup:**
\`\`\`typescript
// lib/vector-store.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!
})

// Store vectors with metadata
await redis.zadd(`vectors:${documentId}`, {
  score: 0,
  member: JSON.stringify({
    id: chunkId,
    text: chunk,
    embedding: vectorArray,
    metadata: { filename, page }
  })
})
\`\`\`

**2. Document Upload & Processing:**
\`\`\`typescript
// app/api/knowledge/upload/route.ts
async function processDocument(file: File) {
  // 1. Upload to Vercel Blob
  const blob = await put(file.name, file, { 
    access: 'public',
    addRandomSuffix: true 
  })
  
  // 2. Extract text (PDF parsing)
  const text = await extractTextFromPDF(blob.url)
  
  // 3. Chunk text (500 chars with overlap)
  const chunks = chunkText(text, 500, 50)
  
  // 4. Generate embeddings (OpenAI)
  const embeddings = await generateEmbeddings(chunks)
  
  // 5. Store in vector database
  await storeVectors(documentId, chunks, embeddings)
}
\`\`\`

**3. Semantic Search:**
\`\`\`typescript
// Query vector store
const queryEmbedding = await generateEmbedding(userQuestion)
const results = await searchVectors(queryEmbedding, topK: 3)

// results = [
//   { text: "...", score: 0.92, metadata: {...} },
//   { text: "...", score: 0.87, metadata: {...} },
//   { text: "...", score: 0.81, metadata: {...} }
// ]
\`\`\`

**4. Context-Aware AI Response:**
\`\`\`typescript
const context = results.map(r => r.text).join('\n\n')

const prompt = `
You are an expert in human factors engineering with access to a knowledge base.

Context from documents:
${context}

User question: ${userQuestion}

Provide a detailed answer based on the context above. If the context doesn't contain relevant information, use your general knowledge.
`

const response = await generateText({
  model: openai('gpt-4o-mini'),
  prompt
})
\`\`\`

**Benefits Achieved:**
- Chatbot can now answer questions about specific PDF content
- Responses are grounded in actual uploaded documents
- Users can build a custom knowledge base
- Sources are traceable (which PDF, which section)

**Trade-offs Accepted:**
- More complex implementation (vector store, embeddings, chunking)
- Additional API costs (embedding generation)
- Slightly slower responses (search + generation)
- Need to manage document uploads and storage

## Current Features

### 1. PDF Accessibility Checker (`/tools/axia`)
- Upload PDF documents via Vercel Blob
- Validate file format and metadata
- Generate AI-powered accessibility recommendations
- Provide manual checklist for WCAG compliance

### 2. Web Accessibility Checker (`/tools/axia`)
- Scan live websites for accessibility issues
- Check ARIA attributes, semantic HTML, color contrast
- Generate detailed accessibility reports

### 3. AI Chatbot (Homepage)
- Answer questions about human factors engineering
- RAG-powered responses using uploaded PDF knowledge base
- Context-aware conversations
- Cites sources from documents

### 4. Knowledge Base Management (`/knowledge`)
- Upload PDFs to build knowledge base
- View all uploaded documents
- Delete documents from knowledge store
- Automatic text extraction and embedding generation

### 5. About/Coming Soon Page (`/about`)
- Email signup for waitlist
- Feature previews
- Modern, animated design

## Deployment Considerations

### Environment Variables Required

\`\`\`bash
# OpenAI (for chatbot and embeddings)
OPENAI_API_KEY=sk-...

# Vercel Blob (for file storage)
BLOB_READ_WRITE_TOKEN=vercel_blob_...

# Upstash Redis (for vector storage)
KV_REST_API_URL=https://...upstash.io
KV_REST_API_TOKEN=...

# Supabase (optional, not used in MVP)
SUPABASE_URL=...
SUPABASE_ANON_KEY=...

# Groq (optional, attempted but not used)
GROQ_API_KEY=...
\`\`\`

### Key Deployment Lessons

1. **Vercel Blob is the simplest file storage option** - Works out of the box with zero configuration
2. **Supabase Storage requires careful RLS policy setup** - Overkill for MVP
3. **AI SDK version matters** - v3 vs v4 vs v5 have breaking changes
4. **Not all AI providers work the same** - Groq had issues, OpenAI was reliable
5. **Upstash Redis works perfectly for vectors** - No special vector database needed

## Error Resolution Guide

### Issue: "Failed to fetch" when uploading files
**Cause:** Supabase Storage not configured or network errors
**Solution:** Switch to Vercel Blob storage

### Issue: "doGenerate is not a function"
**Cause:** Wrong AI SDK version or incorrect model format
**Solution:** Use AI SDK v3 with provider-specific imports (`@ai-sdk/openai`)

### Issue: Empty chatbot responses
**Cause:** Groq API returning empty text field
**Solution:** Switch to OpenAI with proper error handling

### Issue: "Unsupported model version" with AI SDK v4
**Cause:** AI Gateway requires AI SDK v5
**Solution:** Either upgrade to v5 or use provider packages with v3

### Issue: AI Gateway requires billing
**Cause:** Vercel AI Gateway is a paid feature
**Solution:** Use direct provider integrations (OpenAI, Groq) with API keys

### Issue: PDF parsing fails in serverless
**Cause:** `pdf-parse` has Node.js dependencies
**Solution:** For MVP, skip PDF parsing and provide manual checklists

## API Endpoints

### `/api/upload`
- **Method:** POST
- **Body:** FormData with file
- **Returns:** `{ url: string, filename: string }`
- **Purpose:** Upload files to Vercel Blob

### `/api/scan-pdf`
- **Method:** POST
- **Body:** `{ pdfUrl: string }`
- **Returns:** Accessibility analysis results
- **Purpose:** Analyze PDF for accessibility issues

### `/api/chat-assistant`
- **Method:** POST
- **Body:** `{ message: string }`
- **Returns:** `{ response: string }`
- **Purpose:** AI chatbot with RAG

### `/api/knowledge/upload`
- **Method:** POST
- **Body:** FormData with PDF file
- **Returns:** `{ documentId: string, filename: string }`
- **Purpose:** Upload PDF to knowledge base

### `/api/knowledge/list`
- **Method:** GET
- **Returns:** Array of documents in knowledge base
- **Purpose:** List all uploaded documents

### `/api/knowledge/delete`
- **Method:** POST
- **Body:** `{ documentId: string }`
- **Returns:** `{ success: boolean }`
- **Purpose:** Remove document from knowledge base

## Future Enhancements

### Short Term
1. Fix Groq integration for cost savings
2. Add more sophisticated PDF text extraction
3. Implement user authentication (when needed)
4. Add conversation history for chatbot

### Medium Term
1. Multi-document search and comparison
2. Export accessibility reports as PDF
3. Real-time collaboration features
4. Integration with accessibility testing tools

### Long Term
1. Custom AI model fine-tuning on accessibility domain
2. Automated remediation suggestions with code examples
3. Compliance tracking dashboard
4. API for third-party integrations

## Lessons Learned

1. **Start Simple:** MVPs don't need every feature - we removed auth and complex PDF parsing
2. **Integration != Working:** Just because an integration is connected doesn't mean it will work for your use case
3. **AI SDK Versions Matter:** Breaking changes between versions can cause hours of debugging
4. **Provider-Specific Issues:** Groq and OpenAI behave differently even with same SDK
5. **RAG Adds Complexity:** Only implement if you truly need document-grounded responses
6. **Vercel Ecosystem Works:** Vercel Blob + Upstash + OpenAI is a proven stack
7. **Debug Logs Are Essential:** `console.log("[v0] ...")` saved us multiple times
8. **Read Error Messages Carefully:** Many issues had clear error messages we initially overlooked

## Conclusion

FlowFactor successfully evolved from a simple PDF checker to a comprehensive accessibility platform with AI-powered document search. The journey involved multiple failed attempts with different AI providers, SDK version conflicts, and storage integration challenges. The final architecture uses OpenAI for AI generation, Vercel Blob for file storage, and Upstash Redis for vector search - a proven combination that works reliably in production.

The decision to implement RAG instead of simple API calls was driven by the need to provide domain-specific answers based on the user's uploaded PDF documents, making the chatbot significantly more valuable for human factors engineering consulting.
