import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActionsCreators from '../store/action-creators/user';

const useUserActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(UserActionsCreators, dispatch);
};

export default useUserActions;
