import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { question } = await request.json()

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      )
    }

    // Get OpenRouter API key from environment variables
    const apiKey = process.env.OPENROUTER_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured' },
        { status: 500 }
      )
    }

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://guru-jet.vercel.app',
        'X-Title': 'Guru-Dhrupad',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'system',
            content: 'You are a Dhrupad Guru, an expert in the ancient Indian classical music form of Dhrupad. You provide thoughtful, knowledgeable guidance on Dhrupad singing techniques, ragas, talas, and the spiritual aspects of this music tradition. Respond with wisdom, patience, and deep understanding of this sacred art form.'
          },
          {
            role: 'user',
            content: question
          }
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenRouter API error:', errorData)
      return NextResponse.json(
        { error: errorData.error?.message || 'Failed to get response from Guru' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const answer = data.choices?.[0]?.message?.content || 'No response from Guru'

    return NextResponse.json({ answer })
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}
