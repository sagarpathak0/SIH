
import { NextResponse } from 'next/server';

export async function GET() {
  
  await fetch(`${process.env.API_BASE_URL}/auth/logout`, { method: 'POST' });
  return NextResponse.redirect('/');
}
