import React from "react";
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CarsActionsCreators from '../store/action-creators/user'

export const userActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(CarsActionsCreators, dispatch)
}
