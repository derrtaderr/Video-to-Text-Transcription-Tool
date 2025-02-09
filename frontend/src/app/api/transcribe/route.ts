import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Forward the request to our Python server
    const response = await fetch('http://localhost:8000/api/transcribe', {
      method: 'POST',
      body: await request.formData(),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to transcribe video');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
} 