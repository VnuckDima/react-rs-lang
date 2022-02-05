import { saveUserDataInLS } from './utils';

export const HEAD_URL = 'http://localhost:3001';

export async function login(email: string, password: string) {
  const res = await fetch(`${HEAD_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await res.json();
  saveUserDataInLS(data);
  return data;
}

export async function registration(email: string, password: string, name: string) {
  const res = await fetch(`${HEAD_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  const data = await res.json();
}

export async function loadWords(page: number, group: number) {
  const res = await fetch(`${HEAD_URL}/words?group=${group}&page=${page}`);
  const data = await res.json();
  console.log(data);
  return data;
}
