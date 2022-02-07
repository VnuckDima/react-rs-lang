import { saveUserDataInLS } from './utils';

export const HEAD_URL = 'http://localhost:3001';
export const token = () => {
  const value = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!).token : '';
  return value;
};
export const HEADERS_WHEN_USER_LOGIN = (token: string) => ({ // Прошу придумать нормальное название
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

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
  // const hardWords = await getUserHardWords(data.userId, 'hard');
  // const learnedWords = await getUserHardWords(data.userId, 'learned');
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

export async function getUserHardWords(userId: string, difficulty: string) {
  const res = await fetch(`${HEAD_URL}/users/${userId}/aggregatedWords?filter={"userWord.difficulty":"${difficulty}"}`, {
    method: 'GET',
    headers: HEADERS_WHEN_USER_LOGIN(token()),
  });
  const data = await res.json();
  console.log(data);
  return data[0].paginatedResults;
}

export function testToken() {
  console.log('sda');
}
