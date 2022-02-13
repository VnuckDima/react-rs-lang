import React, { Dispatch } from 'react';
import { IUserAction, IUserAddWords, userType } from '../../types/types';
import {
  fetchWithAuth,
  FILTER_WORDS_URL,
  HEADERS_WHEN_USER_LOGIN,
  HEAD_URL,
  token,
} from '../../utils/API';
import { makeObjectFromArray } from '../../utils/utils';

export function addUserWord(wordId: string, userId: string, difficulty: string) {
  return async (dispatch: Dispatch<IUserAction>) => {
    const res = await fetchWithAuth(`${HEAD_URL}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: HEADERS_WHEN_USER_LOGIN(token()),
      body: JSON.stringify({ difficulty, optional: {} }),
    });
    if (res) {
      const data = await res.json();
      if (difficulty === 'hard') {
        dispatch({ type: userType.ADD_HARD_WORD, payload: data });
      } else {
        dispatch({ type: userType.ADD_LEARNED_WORD, payload: data });
      }
    }
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
      dispatch(({ type: userType.UPLOAD_USER_WORDS, payload: { hardWords, learnedWords } }));
    }
  };
}
