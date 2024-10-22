import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import pdf from 'pdf-parse';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    let extractedText = '';

    if (file.type === 'application/pdf') {
      const data = await pdf(Buffer.from(buffer));
      extractedText = data.text;
    } else if (file.type === 'text/plain') {
      extractedText = await new Response(file).text();
    } else {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error('Error extracting text:', error);
    return NextResponse.json({ error: 'Failed to extract text' }, { status: 500 });
  }
}