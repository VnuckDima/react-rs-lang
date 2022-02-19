import React, { Dispatch } from 'react';
import {
  IStatistic,
  IUserAction,
  IUserAddWords,
  TBody,
  userType,
} from '../../types/types';
import {
  fetchWithAuth,
  FILTER_WORDS_URL,
  HEADERS_WHEN_USER_LOGIN,
  HEAD_URL,
  token,
} from '../../utils/API';
import {
  getInitialBody,
  makeObjectFromAllWordsArray,
  makeObjectFromArray,
} from '../../utils/utils';

export function addUserWord(wordId: string, userId: string, difficulty: string, correct?: boolean) {
  return async (dispatch: Dispatch<IUserAction>) => {
    const body = typeof correct === 'undefined' ? {} : getInitialBody(correct);
    const res = await fetchWithAuth(`${HEAD_URL}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: HEADERS_WHEN_USER_LOGIN(token()),
      body: JSON.stringify({ difficulty, optional: body }),
    });
    if (res) {
      const data = { id: userId, wordId, userWord: { difficulty, optional: body } };
      dispatch({ type: userType.ADD_ALL_WORD, payload: data });
      switch (difficulty) {
        case 'hard': {
          dispatch({ type: userType.ADD_HARD_WORD, payload: data });
          break;
        }
        case 'learned': {
          dispatch({ type: userType.ADD_LEARNED_WORD, payload: data });
          break;
        }
        default: {
          break;
        }
      }
    }
  };
}

export function updateWord(userId: string, wordId: string, difficulty: string, newBody?: TBody) {
  return async (dispatch: Dispatch<IUserAction>) => {
    fetchWithAuth(
      `${HEAD_URL}/users/${userId}/words/${wordId}`,
      {
        headers: HEADERS_WHEN_USER_LOGIN(token()),
        method: 'PUT',
        body: JSON.stringify({ difficulty, optional: newBody }),
      },
    );
    const data = { id: userId, wordId, userWord: { difficulty, optional: newBody } };
    dispatch({ type: userType.UPDATE_WORD, payload: data });
  };
}

export function deleteUserWord(wordId: string, userId: string, difficulty: string) {
  return async (dispatch: Dispatch<IUserAction>) => {
    const res = await fetchWithAuth(`${HEAD_URL}/users/${userId}/words/${wordId}`, { headers: HEADERS_WHEN_USER_LOGIN(token()), method: 'DELETE' });
    const data = { wordId, difficulty };
    dispatch({ type: userType.DELETE_USER_WORD, payload: data });
  };
}

export function uploadUserWords(userId: string) {
  return async (dispatch: Dispatch<IUserAction>) => {
    dispatch(({ type: userType.START_LOADING }));
    const userHardWords = await fetchWithAuth(FILTER_WORDS_URL(userId, 'hard'), { headers: HEADERS_WHEN_USER_LOGIN(token()) });
    const userLearnedWords = await fetchWithAuth(FILTER_WORDS_URL(userId, 'learned'), { headers: HEADERS_WHEN_USER_LOGIN(token()) });
    if (userHardWords && userLearnedWords) {
      const responseHardWords = await userHardWords.json();
      const responseLearnedWords = await userLearnedWords.json();
      const hardWords: IUserAddWords = makeObjectFromArray(
        responseHardWords[0].paginatedResults,
        userId,
      );
      const learnedWords: IUserAddWords = makeObjectFromArray(
        responseLearnedWords[0].paginatedResults,
        userId,
      );
      dispatch(({
        type: userType.UPLOAD_USER_WORDS,
        payload: {
          hardWords,
          learnedWords,
        },
      }));
    }
  };
}

export function uploadAllWords(userId: string) {
  return async (dispatch: Dispatch<IUserAction>) => {
    // alert('Загрузка всех слов');
    const userAllWords = await fetchWithAuth(`${HEAD_URL}/users/${userId}/words`, { headers: HEADERS_WHEN_USER_LOGIN(token()) });
    if (userAllWords) {
      const responseAllWords = await userAllWords.json();
      const allWords: IUserAddWords = makeObjectFromAllWordsArray(
        responseAllWords,
        userId,
      );
      dispatch(({ type: userType.UPLOAD_ALL_WORDS, payload: allWords }));
    }
  };
}

export function updateUserStatistic(userId: string, oldStats: IStatistic, newData: IStatistic) {
  return async (dispatch: Dispatch<IUserAction>) => {
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
    dispatch(({ type: userType.UPDATE_STATISTIC, payload: newStats }));
  };
}

export function resetUserStatistic(userId: string, oldStats: IStatistic, newData: IStatistic) {
  return async (dispatch: Dispatch<IUserAction>) => {
    const newStats: IStatistic = {
      learnedWords: oldStats.learnedWords + newData.learnedWords,
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
    dispatch(({ type: userType.UPDATE_STATISTIC, payload: newStats }));
  };
}

export function getUserStatistic(userId: string) {
  return async (dispatch: Dispatch<IUserAction>) => {
    const res = await fetchWithAuth(`${HEAD_URL}/users/${userId}/statistics`, { headers: HEADERS_WHEN_USER_LOGIN(token()) });
    if (res) {
      const data = await res.json();
      console.log(data, 'statistic add redux');
      dispatch(({ type: userType.UPDATE_STATISTIC, payload: data }));
    }
  };
}
