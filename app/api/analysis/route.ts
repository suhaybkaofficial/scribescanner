import { NextResponse } from 'next/server'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai'

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export async function POST(request: Request) {
  try {
    const { text } = await request.json()
    console.log('Received text:', text)

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables')
    }

    // Use Gemini API for writing style analysis
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const chatSession = model.startChat({ generationConfig })

    const prompt = `Analyze the following text for writing style, tone, and readability. Provide suggestions for improvement:

${text}

Please format your response as JSON with the following structure:
{
  "style": "Brief description of the writing style",
  "tone": "Description of the tone",
  "readability": "Assessment of readability",
  "suggestions": ["Array of specific suggestions for improvement"]
}
`
    const result = await chatSession.sendMessage(prompt)
    const responseText = result.response.text()
    console.log('Raw API response:', responseText)

    // Remove code block markers if present
    const cleanedResponse = responseText.replace(/^```json\n|\n```$/g, '').trim()

    let analysisResult
    try {
      analysisResult = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      return NextResponse.json({ error: 'Invalid response format from AI model', rawResponse: cleanedResponse }, { status: 500 })
    }

    if (!analysisResult || typeof analysisResult !== 'object') {
      return NextResponse.json({ error: 'Unexpected response format from AI model', rawResponse: cleanedResponse }, { status: 500 })
    }

    return NextResponse.json({ analysisResult })
  } catch (error) {
    console.error('Error during analysis:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
