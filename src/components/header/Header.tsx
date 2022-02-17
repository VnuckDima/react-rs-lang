import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { userType } from '../../types/types';
import { token } from '../../utils/API';
import './style.scss';

export default function Header() {
  const [loginButtonState, setLoginButtonState] = useState(true);
  const {
    uploadAllWords,
    uploadUserWords,
    getUserStatistic,
    updateUserStatistic,
  } = useUserActions();
  const dispatch = useDispatch();
  const { user, statistics } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();
  async function test() {
    console.log(statistics, 'statistics');
    // getUserStatistic(user.userId)
  }

  useEffect(() => {
    if (user.message === 'Authenticated') {
      (async () => {
        await uploadAllWords(user.userId);
        uploadUserWords(user.userId);
        // await updateUserStatistic(user.userId, { learnedWords: 0, optional:
        // { games: [] } }, { learnedWords: 1, optional: { games: [] } });
        // getUserStatistic(user.userId);
      })();
      setLoginButtonState(false);
    } else {
      setLoginButtonState(true);
    }
  }, [user.message]);

  function handleSignOut() {
    localStorage.clear();
    dispatch({ type: userType.RESET_USER_DATA });
    dispatch({ type: userType.END_LOADING });
    setLoginButtonState(true);
  }

  const signOutButton = <button className="header__button-sign" onClick={handleSignOut} type="button">Sign out</button>;
  const signInButton = <button className="header__button-sign" onClick={() => navigate('/login')} type="button">Sign in</button>;

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Главная</h1>
        <button onClick={test} type="button">test button</button>
        {loginButtonState ? signInButton : signOutButton}
      </div>
    </header>
  );
}
