import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useUserActions from '../../hooks/userAction';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { userType } from '../../types/types';
import { resetUserStatistics } from '../../utils/API';
import { checkDate, setWindowTitle } from '../../utils/utils';

export default function Navigation() {
  const [loginButtonState, setLoginButtonState] = useState(true);
  const { uploadAllWords, uploadUserWords } = useUserActions();
  const dispatch = useDispatch();
  const { user, hardWords } = useTypedSelector((state) => state.user);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const [navClass, setNavClas] = useState('shrink');
  const [userAuth, setUserAuth] = useState(false);

  async function test() {
    console.log(hardWords);
  }

  async function checkStats() {
    const oldDate = localStorage.getItem('date');
    if (!checkDate(oldDate)) {
      resetUserStatistics(user.userId);
    }
  }

  function handleMenuBtn() {
    if (navClass === 'shrink') {
      setNavClas('expanded');
    } else {
      setNavClas('shrink');
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

  useEffect(() => {
    if (user.message === 'Authenticated') {
      setUserAuth(true);
    } else {
      setUserAuth(false);
    }
  }, [user]);

  const signOutButton = (
  <button className="nav__link nav__link-loginbtn" onClick={handleSignOut} type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
      <path fillRule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z" />
    </svg>
    Выйти
  </button>
  );
  const signInButton = (
  <button className="nav__link nav__link-loginbtn" onClick={() => navigate('/login')} type="button">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
    </svg>
    Войти
  </button>
  );

  return (
    <nav className={navClass}>
      <ul>
        <li>
          <button className="nav__link nav__link-menubtn" onClick={handleMenuBtn} type="button">
            <svg className="menubtn__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span>
              Меню
            </span>
          </button>
        </li>
        <li>
          {loginButtonState ? signInButton : signOutButton}
        </li>
        <li>
          <NavLink to="/" className={({ isActive }) => `nav__link nav__link-main ${(isActive ? 'active' : 'inactive')}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
            </svg>
            <span>
              Главная
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="textbook" className={({ isActive }) => `nav__link nav__link-textbook ${(isActive ? 'active' : 'inactive')}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            <span>
              Учебник
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="audio-call" className={({ isActive }) => `nav__link nav__link-audiocall ${(isActive ? 'active' : 'inactive')}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8a6 6 0 1 1 12 0v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5z" />
            </svg>
            <span>
              Мини-игра &ldquo;Аудиовызов&rdquo;
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="sprint" className={({ isActive }) => `nav__link nav__link-sprint ${(isActive ? 'active' : 'inactive')}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
              <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
            </svg>
            <span>
              Мини-игра &ldquo;Спринт&rdquo;
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="savannah" className={({ isActive }) => `nav__link nav__link-savannah  ${(isActive ? 'active' : 'inactive')}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5l-4.777-3.947z" />
            </svg>
            <span>
              Мини-игра &ldquo;Саванна&rdquo;
            </span>
          </NavLink>
        </li>
        <li>
          {userAuth
          && (
            <NavLink to="statistics" className={({ isActive }) => `nav__link nav__link-statistics ${(isActive ? 'active' : 'inactive')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z" />
              </svg>
              <span>
                  Статистика
              </span>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
