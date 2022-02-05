import React, { Dispatch } from 'react';
import { IWordsAction } from '../../types/types';
import { HEAD_URL } from '../../utils/API';

export function loadWords(page: number, group: number) {
  return async (dispatch: Dispatch<IWordsAction>) => {
    const res = await fetch(`${HEAD_URL}/words?group=${group}&page=${page}`);
    const data = await res.json();
    console.log(data);
    dispatch({ type: 'UPLOAD_WORDS', payload: data });
  };
}

export function func12312() { }
