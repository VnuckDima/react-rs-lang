import React, { Dispatch } from 'react';
import { IWordsAction } from '../../types/types';
import {
  fetchWithAuth,
  FILTER_WORDS_URL,
  HEADERS_WHEN_USER_LOGIN,
  HEAD_URL,
  token,
} from '../../utils/API';

export function loadWords(page: number, group: number) {
  return async (dispatch: Dispatch<IWordsAction>) => {
    const res = await fetch(`${HEAD_URL}/words?group=${group}&page=${page}`);
    const data = await res.json();
    dispatch({ type: 'UPLOAD_WORDS', payload: data });
  };
}

export function loadHardWords(userId: string) {
  return async (dispatch: Dispatch<IWordsAction>) => {
    const userHardWords = await fetchWithAuth(FILTER_WORDS_URL(userId, 'hard'), { headers: HEADERS_WHEN_USER_LOGIN(token()) });
    if (userHardWords) {
      const data = await userHardWords.json();
      const words = data[0].paginatedResults;
      words.forEach((word: any, ind: number) => {
        const id = word._id;
        delete words[ind]._id;
        words[ind].id = id;
      });
      dispatch({ type: 'UPLOAD_WORDS', payload: words });
    }
  };
}
