import React, { Dispatch } from 'react';
import { IUserAction, userType } from '../../types/types';
import { HEAD_URL } from '../../utils/API';

const token = JSON.parse(localStorage.getItem('userData')!).token || '';

export function addHardWord(wordId: string, userId: string, word: { difficulty: string }) {
  return async (dispatch: Dispatch<IUserAction>) => {
    const res = await fetch(`${HEAD_URL}/users/${userId}/words/${wordId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    });
    const data = await res.json();
    console.log(data);
    // dispatch({ type: userType.ADD_HARD_WORD, payload: data });
  };
}

export function addLearnedWord(wordId: string, userId: string, word: { difficulty: string }) {
  return async (dispatch: Dispatch<IUserAction>) => {
    const res = await fetch(`${HEAD_URL}/users/${userId}/words/${wordId}`);
    const data = await res.json();
    console.log(data);
    // dispatch({ type: userType.ADD_HARD_WORD, payload: data });
  };
}
