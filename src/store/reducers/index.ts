import React from 'react';
import { combineReducers } from 'redux';
import userReducer from './user';

export const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>
