import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads');
    try {
      await writeFile(path.join(uploadsDir, file.name), Buffer.from(await file.arrayBuffer()));
    } catch (error) {
      console.error('Error saving file:', error);
      return NextResponse.json(
        { error: 'Error saving file' },
        { status: 500 }
      );
    }

    // TODO: Call Python transcription script
    // For now, return a mock response
    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      transcript: 'Transcript will appear here...'
    });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 