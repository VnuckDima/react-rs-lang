import React from 'react';
import { IWordReducer, IWordsAction, word } from '../../types/types';

const initialState: IWordReducer = {
  words: [],
  isLoaded: false,
};

function wordsReducer(state: IWordReducer = initialState, action: IWordsAction): IWordReducer {
  switch (action.type) {
    case 'UPLOAD_WORDS': {
      return { isLoaded: true, words: action.payload };
    }
    case 'IS_LOADING': {
      return { ...state, isLoaded: false };
    }
    default:
      return state;
  }
}

export default wordsReducer;
