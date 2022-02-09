import React from 'react';
import { IUserAction, IUserData, userType } from '../../types/types';

const resetUserState = {
  message: '',
  token: '',
  refreshToken: '',
  userId: '',
  name: 'Guest',
};

const initialUserState = JSON.parse(localStorage.getItem('userData')!) || resetUserState;

const initialState = {
  hardWords: {},
  learnedWords: {},
  user: initialUserState,
  isLoaded: false,
};

function userReducer(state: IUserData = initialState, action: IUserAction): IUserData {
  switch (action.type) {
    case userType.UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    case userType.ADD_HARD_WORD: {
      return {
        ...state,
        hardWords: {
          ...state.hardWords,
          [action.payload.wordId]: action.payload,
        },
      };
    }
    case userType.ADD_LEARNED_WORD: {
      return (
        {
          ...state,
          learnedWords:
            { ...state.learnedWords, [action.payload.wordId]: action.payload },
        }
      );
    }
    case userType.UPLOAD_USER_WORDS: {
      return {
        ...state,
        hardWords: action.payload.hardWords,
        learnedWords: action.payload.learnedWords,
        isLoaded: true,
      };
    }
    case userType.DELETE_USER_WORD: {
      const newState = { ...state };
      if (action.payload.difficulty === 'hard') {
        delete newState.hardWords[action.payload.wordId];
      } else {
        delete newState.learnedWords[action.payload.wordId];
      }
      return newState;
    }
    case userType.RESET_USER_DATA: {
      return { ...initialState, user: resetUserState };
    }
    case userType.START_LOADING: {
      return { ...state, isLoaded: false };
    }
    case userType.END_LOADING: {
      return { ...state, isLoaded: true };
    }
    default:
      return state;
  }
}

export default userReducer;
