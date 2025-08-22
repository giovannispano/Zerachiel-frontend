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
export async function registerUser(email: string, password: string, first_name?: string, last_name?: string, family_member?: boolean, tax_code?: string) {
  first_name = first_name?.trim() || " ";
  last_name = last_name?.trim() || " ";
  tax_code = tax_code?.trim() || " ";
  try {
    const response = await axios.post('https://zerachiel-backend.vercel.app/auth/register', {
      email,
      password,
      first_name,
      last_name,
      family_member,
      tax_code,
    });
    return response.data

  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Errore server:", err.response?.data || err.message);
      throw err.response?.data?.message;
    }
  }
}