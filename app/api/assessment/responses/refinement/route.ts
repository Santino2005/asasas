import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ranking } = body;

    if (!userId || !ranking || !Array.isArray(ranking)) {
      return NextResponse.json(
        { error: 'User ID and ranking array are required' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Insert refinement responses
    for (let i = 0; i < ranking.length; i++) {
      const item = ranking[i];
      await sql(
        `INSERT INTO refinement_responses (user_id, ranking_order, card_id, card_text)
         VALUES ($1, $2, $3, $4)`,
        [userId, i + 1, item.cardId, item.cardText]
      );
    }

    return NextResponse.json(
      { success: true, saved: ranking.length },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Refinement response error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save refinement responses' },
      { status: 500 }
    );
  }
}
