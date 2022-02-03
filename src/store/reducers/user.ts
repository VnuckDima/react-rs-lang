import React from 'react';
import { IUserAction, IUserData, userType } from '../../types/types';

const initialState = {
  hardWords: [],
  studiedWords: [],
  name: 'Guest',
};

function userReducer(state: IUserData = initialState, action: IUserAction): IUserData {
  switch (action.type) {
    case userType.UPDATE_USER_NAME: {
      return { ...state, name: action.payload };
    }
    default:
      return state;
  }
}

export default userReducer;
