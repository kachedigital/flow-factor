import Link from "next/link"

export default function ApplicationOverviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/docs" className="text-primary hover:underline mb-8 inline-block">
          ← Back to Documentation
        </Link>

        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1>FlowFactor Application Documentation</h1>

          <h2>Overview</h2>
          <p>
            FlowFactor is a comprehensive UX and accessibility consulting platform that provides AI-powered tools for
            analyzing web accessibility, PDF accessibility, and answering questions about human factors engineering
            through an intelligent chatbot with RAG (Retrieval Augmented Generation) capabilities.
          </p>

          <h2>Application Architecture</h2>

          <h3>Tech Stack</h3>

          <h4>Frontend:</h4>
          <ul>
            <li>Next.js 15.1.3 (App Router)</li>
            <li>React 19</li>
            <li>TypeScript</li>
            <li>Tailwind CSS v3</li>
            <li>shadcn/ui components</li>
          </ul>

          <h4>Backend & APIs:</h4>
          <ul>
            <li>Next.js API routes (serverless functions)</li>
            <li>AI SDK v3.4.33</li>
            <li>OpenAI GPT-4o-mini for AI responses</li>
          </ul>

          <h4>Integrations:</h4>
          <ul>
            <li>Vercel Blob - File storage</li>
            <li>Upstash Redis - Vector database for RAG</li>
            <li>Supabase - Database (configured but not used in MVP)</li>
            <li>Groq - Alternative AI provider (attempted but encountered issues)</li>
          </ul>

          <h2>Development Journey</h2>

          <h3>Phase 1: Initial Setup and PDF Checker Foundation</h3>
          <p>
            <strong>Goal:</strong> Build a PDF accessibility checker tool
          </p>

          <p>
            <strong>Implementation:</strong>
          </p>
          <ol>
            <li>Created /tools/pdf-checker page with upload interface</li>
            <li>Built API route at /api/scan-pdf for PDF analysis</li>
            <li>Integrated Vercel Blob for file storage</li>
          </ol>

          <p>
            <strong>Challenges Encountered:</strong>
          </p>
          <ul>
            <li>Initial attempts to use Supabase Storage failed with network errors</li>
            <li>Storage bucket configuration and RLS policies were complex</li>
            <li>Authentication requirements blocked anonymous uploads</li>
          </ul>

          <p>
            <strong>Resolution:</strong>
          </p>
          <ul>
            <li>Switched from Supabase Storage to Vercel Blob</li>
            <li>Blob integration was already configured and required zero setup</li>
            <li>Added addRandomSuffix: true to handle duplicate filenames</li>
          </ul>

          <h3>Phase 2: PDF Analysis Implementation</h3>
          <p>
            <strong>Goal:</strong> Analyze PDFs for accessibility issues
          </p>

          <p>
            <strong>Initial Approach - Using pdf-parse:</strong>
          </p>
          <pre>
            <code>{`import pdfParse from 'pdf-parse'
const pdfData = await pdfParse(buffer)`}</code>
          </pre>

          <p>
            <strong>Problems:</strong>
          </p>
          <ul>
            <li>pdf-parse requires Node.js-specific features</li>
            <li>Inconsistent behavior in Next.js serverless runtime</li>
            <li>Complex dependency on canvas and other native modules</li>
          </ul>

          <p>
            <strong>Resolution - Simplified Approach:</strong>
          </p>
          <ul>
            <li>Removed pdf-parse dependency</li>
            <li>Focused on file validation and metadata checks</li>
            <li>Provided manual checklist of accessibility issues</li>
            <li>Used AI to generate actionable recommendations</li>
          </ul>

          <h3>Phase 3: AI Integration Saga</h3>
          <p>This was the most challenging phase with multiple attempts and failures.</p>

          <h4>Attempt 1: Groq with AI SDK v3</h4>
          <pre>
            <code>{`import { createGroq } from '@ai-sdk/groq'
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })
const result = await generateText({
  model: groq('llama-3.3-70b-versatile'),
  prompt: 'Your question here'
})`}</code>
          </pre>

          <p>
            <strong>Problem:</strong> Groq consistently returned empty responses (result.text was "")
          </p>

          <p>
            <strong>Debugging Revealed:</strong>
          </p>
          <ul>
            <li>API calls succeeded (200 status)</li>
            <li>No errors thrown</li>
            <li>Response object existed but text field was empty</li>
            <li>Suspected issue with how Groq handles system prompts</li>
          </ul>

          <h4>Attempt 2: OpenAI with @ai-sdk/openai</h4>
          <pre>
            <code>{`import { openai } from '@ai-sdk/openai'
const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Your question here'
})`}</code>
          </pre>

          <p>
            <strong>Problem:</strong> Quota exceeded error
          </p>
          <pre>
            <code>Error: You exceeded your current quota, please check your plan and billing details</code>
          </pre>
          <p>
            <strong>Cause:</strong> OpenAI API key had insufficient credits
          </p>

          <h4>Attempt 3: Vercel AI Gateway with Model Strings</h4>
          <p>Discovered that AI SDK v5+ supports AI Gateway with simple model strings:</p>
          <pre>
            <code>{`const result = await generateText({
  model: 'anthropic/claude-3-5-sonnet-20241022',
  prompt: 'Your question here'
})`}</code>
          </pre>

          <p>
            <strong>Multiple Issues:</strong>
          </p>
          <ol>
            <li>AI SDK v3.4.33 (project's version) doesn't support AI Gateway strings</li>
            <li>Upgraded to v4.0.0 → Error: "Unsupported model version"</li>
            <li>Upgraded to v5.0.0 → Required Vercel billing/credit card for AI Gateway</li>
          </ol>

          <p>
            <strong>Problem:</strong> User doesn't have billing set up for Vercel AI Gateway
          </p>

          <h4>Final Solution: Back to OpenAI with Better Error Handling</h4>
          <p>
            <strong>Decision:</strong> After all attempts, we went back to OpenAI and added comprehensive error handling
          </p>

          <pre>
            <code>{`import { openai } from '@ai-sdk/openai'

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: \`System: You are an expert in human factors engineering...
  
  User: \${message}\`,
  maxTokens: 500
})`}</code>
          </pre>

          <p>
            <strong>Why This Worked:</strong>
          </p>
          <ul>
            <li>OpenAI quota issue resolved (either refilled or limit increased)</li>
            <li>AI SDK v3 with @ai-sdk/openai is stable and well-tested</li>
            <li>Proper error handling catches issues early</li>
            <li>Works consistently across all endpoints</li>
          </ul>

          <h3>Phase 5: RAG Implementation</h3>

          <h4>The Decision: Why RAG Instead of Simple API Calls?</h4>

          <p>
            <strong>Context:</strong>
          </p>
          <p>
            After finally getting the chatbot to respond using OpenAI, we realized the chatbot could only answer general
            questions about human factors engineering. The user wanted the chatbot to answer questions based on their
            specific PDF documents and internal knowledge base.
          </p>

          <p>
            <strong>Options Considered:</strong>
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 border rounded-lg">
              <h5 className="font-semibold mb-2">Simple API Calls (What we had)</h5>
              <ul className="text-sm space-y-1">
                <li>✅ Fast responses</li>
                <li>✅ General knowledge</li>
                <li>❌ No access to user's specific documents</li>
                <li>❌ Cannot reference uploaded PDFs</li>
                <li>❌ No domain-specific knowledge</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg bg-primary/5">
              <h5 className="font-semibold mb-2">RAG (Chosen Solution)</h5>
              <ul className="text-sm space-y-1">
                <li>✅ Access to user's PDF knowledge base</li>
                <li>✅ Answers grounded in actual documents</li>
                <li>✅ Domain-specific expertise</li>
                <li>✅ Citable sources from PDFs</li>
                <li>⚠️ More complex implementation</li>
                <li>⚠️ Requires vector database</li>
              </ul>
            </div>
          </div>

          <h4>Why We Chose RAG:</h4>
          <p>
            The user explicitly stated: "I have PDFs and I want to create a knowledge store the chatbot can access with
            RAG"
          </p>

          <p>This made the decision clear - the application needed to:</p>
          <ol>
            <li>Store PDF documents in a searchable format</li>
            <li>Extract and embed text from PDFs</li>
            <li>Search through documents based on user queries</li>
            <li>Provide AI responses augmented with relevant document context</li>
          </ol>

          <h4>RAG Architecture:</h4>
          <div className="bg-muted p-4 rounded-lg my-6 font-mono text-sm">
            <div>User Question</div>
            <div className="ml-4">↓</div>
            <div>Generate Embedding (OpenAI)</div>
            <div className="ml-4">↓</div>
            <div>Search Vector Store (Upstash Redis)</div>
            <div className="ml-4">↓</div>
            <div>Retrieve Relevant PDF Chunks</div>
            <div className="ml-4">↓</div>
            <div>Combine Context + Question</div>
            <div className="ml-4">↓</div>
            <div>Generate AI Response (OpenAI)</div>
            <div className="ml-4">↓</div>
            <div>Return Answer with Sources</div>
          </div>

          <h2>Current Features</h2>

          <div className="grid gap-4 my-6">
            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">1. PDF Accessibility Checker (/tools/axia)</h3>
              <ul>
                <li>Upload PDF documents via Vercel Blob</li>
                <li>Validate file format and metadata</li>
                <li>Generate AI-powered accessibility recommendations</li>
                <li>Provide manual checklist for WCAG compliance</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">2. Web Accessibility Checker (/tools/axia)</h3>
              <ul>
                <li>Scan live websites for accessibility issues</li>
                <li>Check ARIA attributes, semantic HTML, color contrast</li>
                <li>Generate detailed accessibility reports</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">3. AI Chatbot (Homepage)</h3>
              <ul>
                <li>Answer questions about human factors engineering</li>
                <li>RAG-powered responses using uploaded PDF knowledge base</li>
                <li>Context-aware conversations</li>
                <li>Cites sources from documents</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">4. Knowledge Base Management (/knowledge)</h3>
              <ul>
                <li>Upload PDFs to build knowledge base</li>
                <li>View all uploaded documents</li>
                <li>Delete documents from knowledge store</li>
                <li>Automatic text extraction and embedding generation</li>
              </ul>
            </div>
          </div>

          <h2>Environment Variables Required</h2>

          <pre className="bg-muted p-4 rounded-lg">
            <code>{`# OpenAI (for chatbot and embeddings)
OPENAI_API_KEY=sk-...

# Vercel Blob (for file storage)
BLOB_READ_WRITE_TOKEN=vercel_blob_...

# Upstash Redis (for vector storage)
KV_REST_API_URL=https://...upstash.io
KV_REST_API_TOKEN=...`}</code>
          </pre>

          <h2>Lessons Learned</h2>

          <ol>
            <li>
              <strong>Start Simple:</strong> MVPs don't need every feature
            </li>
            <li>
              <strong>Integration ≠ Working:</strong> Connected doesn't mean it works for your use case
            </li>
            <li>
              <strong>AI SDK Versions Matter:</strong> Breaking changes between versions
            </li>
            <li>
              <strong>Provider-Specific Issues:</strong> Groq and OpenAI behave differently
            </li>
            <li>
              <strong>RAG Adds Complexity:</strong> Only implement if truly needed
            </li>
            <li>
              <strong>Vercel Ecosystem Works:</strong> Proven stack combination
            </li>
            <li>
              <strong>Debug Logs Are Essential:</strong> Saved us multiple times
            </li>
          </ol>

          <h2>Conclusion</h2>
          <p>
            FlowFactor successfully evolved from a simple PDF checker to a comprehensive accessibility platform with
            AI-powered document search. The final architecture uses OpenAI for AI generation, Vercel Blob for file
            storage, and Upstash Redis for vector search - a proven combination that works reliably in production.
          </p>

          <p>
            The decision to implement RAG instead of simple API calls was driven by the need to provide domain-specific
            answers based on the user's uploaded PDF documents, making the chatbot significantly more valuable for human
            factors engineering consulting.
          </p>
        </article>
      </div>
    </div>
  )
}
