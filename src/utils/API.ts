import {
  IStatistic,
  IUserAddWords,
  IUserDataInLS,
  IUserTokensInLS,
  wordExtended,
} from '../types/types';
import {
  checkAuthTimer,
  makeBVFROMRUArrayQuestions,
  saveUserDataInLS,
  saveUserTokenInLS,
} from './utils';

export const HEAD_URL = 'https://react-learn-words-rs-school.herokuapp.com';
export const token = () => {
  const value = localStorage.getItem('userTokens') ? JSON.parse(localStorage.getItem('userTokens')!).token : '';
  return value;
};
export const HEADERS_WHEN_USER_LOGIN = (token: string) => ({ // Прошу придумать нормальное название
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
});

export const FILTER_WORDS_URL = (userId: string, filterType: string) => `${HEAD_URL}/users/${userId}/aggregatedWords?wordsPerPage=1000&filter={"userWord.difficulty":"${filterType}"}`;
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
  const entryTime = localStorage.getItem('entryTime')!;
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
      if (!checkAuthTimer(entryTime)) {
        await refreshToken(userData.userId, tokenData.refreshToken);
      }
    } catch (error) {
      localStorage.removeItem('userData');
      localStorage.removeItem('userTokens');
      return window.location.replace(loginUrl);
    }
    newOptions.headers.Authorization = `Bearer ${tokenData.token}`;
  }
  return fetch(url, newOptions);
}

export async function getWordsPerPage(page: number, group: number) {
  const res = await fetch(`${HEAD_URL}/words?group=${group}&page=${page}`);
  const data = await res.json();
  return data;
}

export async function buildArrayQuestions(
  page: number,
  learnWords: IUserAddWords,
  group: number,
  maxWordsInGame: number,
) {
  const answers: wordExtended[] = [];
  const countPages = Array(page).fill(1);
  const promises = countPages.map(async (item, ind) => {
    const chunkWords = await fetch(`${HEAD_URL}/words?group=${group}&page=${page - 1 - ind}`);
    return chunkWords;
  });
  const responses = await Promise.all(promises);
  const arraysWords = await Promise.all(responses.map((arr) => arr.json()));
  // arraysWords - массив массивов с каждой страницы
  arraysWords.forEach((item) => {
    if (answers.length < maxWordsInGame) {
      const arrayWords = item.filter((word: { id: string; }) => (
        word.id in learnWords
          ? false
          : word
      ));
      answers.push(...arrayWords);
    }
  });
  // answers все слова - изученные слова
  if (answers.length > maxWordsInGame) {
    answers.length = maxWordsInGame;
  }
  if (answers.length < 5) {
    return [];
  }
  return makeBVFROMRUArrayQuestions(answers);
}

export async function getUserStatistics(userId: string) {
  const res = await fetchWithAuth(`${HEAD_URL}/users/${userId}/statistics`, { headers: HEADERS_WHEN_USER_LOGIN(token()) });
  if (res) {
    const data = await res.json();
    return data;
  }
  return {};
}

export async function resetUserStatistics(userId: string) {
  const oldStats = await getUserStatistics(userId);
  const newStats: IStatistic = {
    learnedWords: oldStats.learnedWords,
    optional: {
      allTimeStat: oldStats.optional.allTimeStat,
      oneDayStats: {
        newWords: 0,
        learned: 0,
        games: [],
      },
    },
  };
  fetchWithAuth(
    `${HEAD_URL}/users/${userId}/statistics`,
    {
      method: 'PUT',
      headers: HEADERS_WHEN_USER_LOGIN(token()),
      body: JSON.stringify(newStats),
    },
  );
}

export async function updateUserStatistic(userId: string, newData: IStatistic) {
  const oldStats = await getUserStatistics(userId);
  const newStats: IStatistic = {
    learnedWords: oldStats.learnedWords + newData.learnedWords,
    optional: {
      allTimeStat: {
        games: [...oldStats.optional.allTimeStat.games, ...newData.optional.allTimeStat.games],
      },
      oneDayStats: {
        newWords: oldStats.optional.oneDayStats.newWords + newData.optional.oneDayStats.newWords,
        learned: oldStats.optional.oneDayStats.learned + newData.optional.oneDayStats.learned,
        games: [...oldStats.optional.oneDayStats.games, ...newData.optional.oneDayStats.games],
      },
    },
  };
  fetchWithAuth(
    `${HEAD_URL}/users/${userId}/statistics`,
    {
      method: 'PUT',
      headers: HEADERS_WHEN_USER_LOGIN(token()),
      body: JSON.stringify(newStats),
    },
  );
}
