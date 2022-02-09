import React, { Dispatch } from 'react';
import { IAggregatedWord, IUserAction, userType } from '../../types/types';
import { HEADERS_WHEN_USER_LOGIN, HEAD_URL, token } from '../../utils/API';

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

export function uploadUserWords(userId: string, difficulty: string) {
  return async (dispatch: Dispatch<IUserAction>) => {
    const res = await fetch(`${HEAD_URL}/users/${userId}/aggregatedWords?filter={"userWord.difficulty":"${difficulty}"}`, {
      method: 'GET',
      headers: HEADERS_WHEN_USER_LOGIN(token()),
    });
    const data = await res.json();
    data[0].paginatedResults.forEach((word: IAggregatedWord) => {
      const result = {
        id: userId,
        difficulty: word.userWord.difficulty,
        wordId: word._id,
      };
      if (difficulty === 'hard') {
        dispatch({ type: userType.ADD_HARD_WORD, payload: result });
      } else {
        dispatch({ type: userType.ADD_LEARNED_WORD, payload: result });
      }
    });
  };
}
