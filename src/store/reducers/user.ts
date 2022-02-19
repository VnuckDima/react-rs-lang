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
  newWords: {},
  allWords: {},
  statistics: {
    learnedWords: 0,
    optional: {
      allTimeStat: { games: [] },
      oneDayStats: {
        newWords: 0,
        learned: 0,
        games: [],
      },
    },
  },
  user: initialUserState,
  isLoadedUserData: false,
};

function userReducer(state: IUserData = initialState, action: IUserAction): IUserData {
  switch (action.type) {
    case userType.UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    case userType.ADD_HARD_WORD: {
      return {
        ...state, hardWords: { ...state.hardWords, [action.payload.wordId]: action.payload },
      };
    }
    case userType.ADD_LEARNED_WORD: {
      return {
        ...state, learnedWords: { ...state.learnedWords, [action.payload.wordId]: action.payload },
      };
    }
    case userType.ADD_ALL_WORD: {
      return { ...state, allWords: { ...state.allWords, [action.payload.wordId]: action.payload } };
    }
    case userType.UPLOAD_ALL_WORDS: {
      return { ...state, allWords: action.payload };
    }
    case userType.UPDATE_WORD: {
      return { ...state, allWords: { ...state.allWords, [action.payload.wordId]: action.payload } };
    }
    case userType.UPLOAD_USER_WORDS: {
      return {
        ...state,
        hardWords: action.payload.hardWords,
        learnedWords: action.payload.learnedWords,
        isLoadedUserData: true,
      };
    }
    case userType.UPLOAD_USER_STATISTIC: {
      return { ...state, statistics: action.payload };
    }
    case userType.UPDATE_STATISTIC: {
      return {
        ...state,
        statistics: {
          learnedWords: action.payload.learnedWords,
          optional: action.payload.optional,
        },
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
      return { ...state, isLoadedUserData: false };
    }
    case userType.END_LOADING: {
      return { ...state, isLoadedUserData: true };
    }
    default:
      return state;
  }
}

export default userReducer;
