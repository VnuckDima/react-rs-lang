import { ILoginData, IUserDataInLS, IUserTokensInLS } from '../types/types';
import { saveUserDataInLS, saveUserTokenInLS } from './utils';

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

export const FILTER_WORDS_URL = (userId: string, filterType: string) => `${HEAD_URL}/users/${userId}/aggregatedWords?filter={"userWord.difficulty":"${filterType}"}`;
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
  const userData = {
    message: data.message,
    userId: data.userId,
    name: data.name,
  };
  const tokenData = {
    token: data.token,
    refreshToken: data.refreshToken,
  };
  saveUserDataInLS(userData);
  saveUserTokenInLS(tokenData);
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

async function refreshToken(userId: string, refreshToken: string) {
  return fetch(`${HEAD_URL}/users/${userId}/tokens`, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      if (res.status === 200) {
        const tokenData = await res.json();
        saveUserTokenInLS(tokenData);
        return Promise.resolve();
      }
      return Promise.reject();
    });
}

export async function fetchWithAuth(url: string, options: any) {
  const newOptions = { ...options };
  const loginUrl = '/login'; // url страницы для авторизации
  let tokenData: IUserTokensInLS = {
    token: '',
    refreshToken: '',
  }; // объявляем локальную переменную tokenData
  let userData: IUserDataInLS = {
    name: '',
    message: '',
    userId: '',
  };
  if (localStorage.getItem('userTokens') && localStorage.getItem('userData')) {
    tokenData = JSON.parse(localStorage.getItem('userTokens')!);
    userData = JSON.parse(localStorage.getItem('userData')!);
  } else {
    return window.location.replace(loginUrl);
  }

  if (!newOptions.headers) {
    newOptions.headers = {};
  }

  if (tokenData && userData) {
    try {
      await refreshToken(userData.userId, tokenData.refreshToken);
    } catch (error) {
      console.log('error update token');
      localStorage.clear();
      return window.location.replace(loginUrl);
    }
    newOptions.headers.Authorization = `Bearer ${tokenData.token}`;
  }
  return fetch(url, newOptions);
}
