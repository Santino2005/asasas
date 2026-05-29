import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, cardId, cardText, selected, group, order } = body;

    if (!userId || !cardId) {
      return NextResponse.json(
        { error: 'User ID and card ID are required' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Insert card response into database
    const result = await sql(
      `INSERT INTO card_responses (user_id, card_id, card_text, selected, card_group, card_order)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [userId, cardId, cardText, selected, group, order]
    );

    return NextResponse.json(
      { success: true, responseId: result[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Card response error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save card response' },
      { status: 500 }
    );
  }
}
