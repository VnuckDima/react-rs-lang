import React from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WordsActionsCreators from '../store/action-creators/words';

const useWordsActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(WordsActionsCreators, dispatch);
};

export default useWordsActions;
