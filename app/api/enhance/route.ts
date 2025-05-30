import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: Request) {
  // Add CORS headers to the response
  const responseHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const { prompt } = await request.json()
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',  
      messages: [
        {
          role: 'system',
          content: 'You are a prompt engineer helping users get the most effective results from an AI assistant. Improve the below prompt by applying best practices: - Clarify the task using an actionable verb - Add or infer a relevant persona (e.g., expert, analyst, marketer) - Include relevant context or assumptions - Specify the desired output format (e.g., list, table, summary) - Keep it clear, concise (~40–50 words), and easy to understand. Output only the improved prompt — do not explain or comment on it.'
        },
        {
          role: 'user',
          content: `Please enhance the following prompt:\n\n"${prompt}"`
        }
      ],
      temperature: 0.7,  // Added for better creativity in prompt enhancement
      max_tokens: 1000    // Added to ensure sufficient length for enhanced prompts
    })

    return NextResponse.json({ enhanced: completion.choices[0].message.content }, {
      headers: responseHeaders
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to enhance prompt' }, {
      status: 500,
      headers: responseHeaders
    })
  }
}