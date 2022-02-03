import React from 'react';
import { IUserAction, IUserData, userType } from '../../types/types';

const initialUserState = {
  message: '',
  token: '',
  refreshToken: '',
  userId: '',
  name: 'Guest',
};

const initialState = {
  hardWords: [],
  studiedWords: [],
  user: initialUserState,
};

function userReducer(state: IUserData = initialState, action: IUserAction): IUserData {
  switch (action.type) {
    case userType.UPDATE_USER_NAME: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
}

export default userReducer;
