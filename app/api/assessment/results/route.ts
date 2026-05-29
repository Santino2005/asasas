import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const sql = neon(process.env.DATABASE_URL!);

    // Get assessment results
    const cardCountResult = await sql(
      'SELECT COUNT(*) as count FROM card_responses WHERE user_id = $1 AND selected = true',
      [userId]
    );
    const spatialCountResult = await sql(
      'SELECT COUNT(*) as count FROM spatial_responses WHERE user_id = $1',
      [userId]
    );

    const totalCards = parseInt(cardCountResult[0]?.count || '0');
    const totalSpatial = parseInt(spatialCountResult[0]?.count || '0');

    // Insert assessment results
    const result = await sql(
      `INSERT INTO assessment_results (user_id, total_cards_selected, total_spatial_responses)
       VALUES ($1, $2, $3)
       RETURNING id, completed_at`,
      [userId, totalCards, totalSpatial]
    );

    return NextResponse.json(
      {
        success: true,
        resultsId: result[0].id,
        completedAt: result[0].completed_at,
        summary: {
          totalCards,
          totalSpatial,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Results error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get results' },
      { status: 500 }
    );
  }
}

    // Get assessment results
    const cardCount = await client.query(
      'SELECT COUNT(*) as count FROM card_responses WHERE user_id = $1 AND selected = true',
      [userId]
    );
    const spatialCount = await client.query(
      'SELECT COUNT(*) as count FROM spatial_responses WHERE user_id = $1',
      [userId]
    );

    const totalCards = parseInt(cardCount.rows[0]?.count || '0');
    const totalSpatial = parseInt(spatialCount.rows[0]?.count || '0');

    // Insert assessment results
    const result = await client.query(
      `INSERT INTO assessment_results (user_id, total_cards_selected, total_spatial_responses)
       VALUES ($1, $2, $3)
       RETURNING id, completed_at`,
      [userId, totalCards, totalSpatial]
    );

    return NextResponse.json(
      {
        success: true,
        resultsId: result.rows[0].id,
        completedAt: result.rows[0].completed_at,
        summary: {
          totalCards,
          totalSpatial,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Results error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get results' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
