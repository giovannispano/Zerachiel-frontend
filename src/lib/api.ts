'use server'

import axios from 'axios'
import { cookies } from 'next/headers'
const db_URL = process.env.DB_URL;
const stop = process.env.STOP;

export async function loginUser(email: string, password: string) {
  const response = await axios.post(`${db_URL}/auth/login`, {
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
  const randomNumber = Math.floor(Math.random() * 1000000);
  tax_code = tax_code?.trim() || randomNumber.toString();
  try {
    const res = await axios.get<{ name: string }[]>(`${stop}`);
    if (res.data.some(v => v.name.includes(`${stop}`))) {
      throw new Error("Registrazioni attualmente chiuse.")
    };
    const response = await axios.post(`${db_URL}/auth/register`, {
      email,
      password,
      first_name,
      last_name,
      family_member,
      tax_code,
    });
    return { success: true, data: response.data };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Errore server:", err.response?.data || err.message);
      return { success: false, error: err.response?.data?.message || "Errore durante la registrazione" };
    }
    else if (err instanceof Error) {
      return { success: false, error: err.message }
    };
    return { success: false, error: "Errore sconosciuto" };
  }
}