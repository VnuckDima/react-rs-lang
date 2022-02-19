import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { IStatistic, userType } from '../../types/types';
import {
  fetchWithAuth,
  getUserStatistics,
  HEADERS_WHEN_USER_LOGIN,
  HEAD_URL,
  resetUserStatistics,
  token,
} from '../../utils/API';
import { checkDate, setWindowTitle } from '../../utils/utils';
import './style.scss';

export default function Header() {
  const [loginButtonState, setLoginButtonState] = useState(true);
  const { uploadAllWords, uploadUserWords } = useUserActions();
  const dispatch = useDispatch();
  const { user, statistics } = useTypedSelector((state) => state.user);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  async function test() {
    const stats = await getUserStatistics(user.userId);
  }

  async function checkStats() {
    const oldDate = localStorage.getItem('date');
    if (!checkDate(oldDate)) {
      console.log('новый день, сброс статистики');
      resetUserStatistics(user.userId);
    } else {
      console.log('статистика не сброшена, новый день не начался');
    }
  }

  useEffect(() => {
    if (user.message === 'Authenticated') {
      (async () => {
        await uploadAllWords(user.userId);
        await uploadUserWords(user.userId);
        checkStats();
      })();
      setLoginButtonState(false);
    } else {
      setLoginButtonState(true);
    }
  }, [user.message]);

  function handleSignOut() {
    localStorage.removeItem('userData');
    localStorage.removeItem('userTokens');
    dispatch({ type: userType.RESET_USER_DATA });
    dispatch({ type: userType.END_LOADING });
    setLoginButtonState(true);
  }

  useEffect(() => {
    setTitle(setWindowTitle());
  }, [window.location.pathname]);

  const signOutButton = <button className="header__button-sign" onClick={handleSignOut} type="button">Sign out</button>;
  const signInButton = <button className="header__button-sign" onClick={() => navigate('/login')} type="button">Sign in</button>;

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">{title}</h1>
        <button onClick={test} type="button">test button</button>
        {loginButtonState ? signInButton : signOutButton}
      </div>
    </header>
  );
}
