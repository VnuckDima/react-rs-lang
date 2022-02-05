import React from 'react';
import { IWordsAction, word } from '../../types/types';

const initialState: word[] = [];

function userReducer(state: word[] = initialState, action: IWordsAction): word[] {
  switch (action.type) {
    case 'UPLOAD_WORDS': {
      return action.payload;
    }
    default:
      return state;
  }
}

export default userReducer;
