import React from 'react';
import { IWordReducer, IWordsAction, word } from '../../types/types';

const initialState: IWordReducer = {
  words: [],
  isLoaded: false,
};

export enum wordsTypes {
  UPLOAD_WORDS = 'UPLOAD_WORDS',
  RESET_WORDS = 'RESET_WORDS'
}

function wordsReducer(state: IWordReducer = initialState, action: IWordsAction): IWordReducer {
  switch (action.type) {
    case wordsTypes.UPLOAD_WORDS: {
      return { isLoaded: true, words: action.payload };
    }
    case wordsTypes.RESET_WORDS: {
      return { words: [], isLoaded: false };
    }
    default:
      return state;
  }
}

export default wordsReducer;
