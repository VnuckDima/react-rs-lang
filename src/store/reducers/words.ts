import React from 'react';
import { IWordsAction, IWordReducer } from '../../types/types';

const initialState: IWordReducer = {
  words: [],
  isLoaded: false,
};

function wordsReducer(state: IWordReducer = initialState, action: IWordsAction): IWordReducer {
  switch (action.type) {
    case 'UPLOAD_WORDS': {
      return { isLoaded: true, words: action.payload };
    }
    default:
      return state;
  }
}

export default wordsReducer;
