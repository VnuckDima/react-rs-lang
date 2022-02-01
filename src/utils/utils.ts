const HEAD_URL = 'http://localhost:3001';

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
  return data;
}

export function validateEmail(email: string) {
  const validate = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  return validate.test(email);
}

export function validatePassword(password: string) {
  const validate = /(?=.*[0-9])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{8,}/;
  return validate.test(password);
}
