import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  try {
    const result = await sql`SELECT * FROM comments ORDER BY id DESC`;

    // DEBUG
    console.log('DEBUG - result from Neon:', result);

    // RESTITUISCE SOLO UN ARRAY!
    return NextResponse.json(result); // <-- o result.rows se sql restituisce {rows: [...]}
  } catch (err) {
    console.error('GET error:', err);
    return NextResponse.json({ error: 'Errore durante la lettura dei commenti' }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const { comment } = await request.json();
    await sql`INSERT INTO comments (comment) VALUES (${comment})`;
    return NextResponse.json({ message: 'Commento aggiunto' });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ error: 'Errore durante l\'inserimento' }, { status: 500 });
  }
}
