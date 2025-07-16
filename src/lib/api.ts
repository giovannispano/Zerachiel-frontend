'use server'

import axios from 'axios'
import { cookies } from 'next/headers'


export async function loginUser(email: string, password: string) {
  const response = await axios.post('https://zerachiel-backend.vercel.app/auth/login', {
    email,
    password,
  });

  (await cookies()).set('token', response.data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 settimana
  })

  return response.data
}