import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, questionId, questionTitle, selectedCorner, cornerLabel } = body;

    if (!userId || !questionId || !selectedCorner) {
      return NextResponse.json(
        { error: 'User ID, question ID, and selected corner are required' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Insert spatial response into database
    const result = await sql(
      `INSERT INTO spatial_responses (user_id, question_id, question_title, selected_corner, corner_label)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [userId, questionId, questionTitle, selectedCorner, cornerLabel]
    );

    return NextResponse.json(
      { success: true, responseId: result[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Spatial response error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save spatial response' },
      { status: 500 }
    );
  }
}
