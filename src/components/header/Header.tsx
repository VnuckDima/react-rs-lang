import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { userType } from '../../types/types';
import { getUserHardWords, testToken, token } from '../../utils/API';
import Login from '../login/Login';
import Modal from '../modal/Modal';
import Registration from '../registration/Registration';
import './style.scss';

export default function Header() {
  const [modalActive, setModalActive] = useState(false);
  const [loginButtonState, setLoginButtonState] = useState(true);
  const dispatch = useDispatch();
  const { user, hardWords, learnedWords } = useTypedSelector((state) => state.user);
  async function test() {
    console.log(hardWords, 'hard');
    console.log(learnedWords);
  }

  useEffect(() => {
    if (user.message === 'Authenticated') {
      setLoginButtonState(false);
    }
  }, []);

  function handleSignOut() {
    localStorage.clear();
    dispatch({ type: userType.RESET_USER_DATA });
    setLoginButtonState(true);
  }

  const signOutButton = <button className="header__button-sign" onClick={handleSignOut} type="button">Sign out</button>;
  const signInButton = <button className="header__button-sign" onClick={() => setModalActive(true)} type="button">Sign in</button>;

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Главная</h1>
        <button onClick={test} type="button">test button</button>
        {loginButtonState ? signInButton : signOutButton}
        <Modal
        modalState={{ modalActive, setModalActive }}
        setLoginButtonState={setLoginButtonState}
        />
      </div>
    </header>
  );
}
