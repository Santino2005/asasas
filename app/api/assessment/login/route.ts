import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email } = body;

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      );
    }

    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      console.error('[v0] DATABASE_URL is not configured');
      throw new Error('DATABASE_URL not configured');
    }

    const sql = neon(DATABASE_URL);

    // Insert user into database
    const result = await sql(
      `INSERT INTO users (first_name, last_name, email) 
       VALUES ($1, $2, $3) 
       RETURNING id, first_name, last_name, email`,
      [firstName, lastName, email || null]
    );

    const user = result[0];

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Login error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create account' },
      { status: 500 }
    );
  }
}
