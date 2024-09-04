import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  try {
    // Send data to your backend to create a new user
    const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

    return NextResponse.json({ message: 'Account created successfully!', user: response.data.user });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: `Failed to create an account` }, { status: 400 },);
  }
}
