import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  try {
    const response = await axios.post('http://localhost:5000/auth/login', { email, password });
    
    return NextResponse.json({ token: response.data.token });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}
