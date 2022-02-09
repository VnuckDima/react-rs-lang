import React, { Dispatch } from 'react';
import { IUserAction, IUserAddWords, userType } from '../../types/types';
import {
  getUserWords,
  HEADERS_WHEN_USER_LOGIN,
  HEAD_URL,
  token,
} from '../../utils/API';
import { makeObjectFromArray } from '../../utils/utils';

export function addUserWord(wordId: string, userId: string, difficulty: string) {
  return async (dispatch: Dispatch<IUserAction>) => {
    const res = await fetch(`${HEAD_URL}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: HEADERS_WHEN_USER_LOGIN(token()),
      body: JSON.stringify({ difficulty, optional: {} }),
    });
    const data = await res.json();
    if (difficulty === 'hard') {
      dispatch({ type: userType.ADD_HARD_WORD, payload: data });
    } else {
      dispatch({ type: userType.ADD_LEARNED_WORD, payload: data });
    }
  };
}

export function deleteUserWord(wordId: string, userId: string, difficulty: string) {
  return async (dispatch: Dispatch<IUserAction>) => {
    const res = await fetch(`${HEAD_URL}/users/${userId}/words/${wordId}`, {
      method: 'DELETE',
      headers: HEADERS_WHEN_USER_LOGIN(token()),
    });
    const data = { wordId, difficulty };
    dispatch({ type: userType.DELETE_USER_WORD, payload: data });
  };
}

export function uploadUserWords(userId: string) {
  return async (dispatch: Dispatch<IUserAction>) => {
    dispatch(({ type: userType.START_LOADING }));
    const userHardWords = await getUserWords(userId, 'hard');
    const userLearnedWords = await getUserWords(userId, 'learned');
    const hardWords: IUserAddWords = makeObjectFromArray(userHardWords, userId);
    const learnedWords: IUserAddWords = makeObjectFromArray(userLearnedWords, userId);
    console.log(learnedWords, 'learned');
    dispatch(({ type: userType.UPLOAD_USER_WORDS, payload: { hardWords, learnedWords } }));
  };
}
