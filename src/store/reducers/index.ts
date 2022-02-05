import React from 'react';
import { combineReducers } from 'redux';
import userReducer from './user';
import wordsReducer from './words';

export const rootReducer = combineReducers({
  user: userReducer,
  words: wordsReducer,
});

export type RootState = ReturnType<typeof rootReducer>
