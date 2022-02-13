import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { userType } from '../../types/types';
import { token } from '../../utils/API';
import './style.scss';

export default function Header() {
  const [modalActive, setModalActive] = useState(false);
  const [loginButtonState, setLoginButtonState] = useState(true);
  const dispatch = useDispatch();
  const { user, hardWords, learnedWords } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();
  async function test() {
    console.log(hardWords, 'hard');
    console.log(learnedWords);
  }

  useEffect(() => {
    if (user.message === 'Authenticated') {
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
