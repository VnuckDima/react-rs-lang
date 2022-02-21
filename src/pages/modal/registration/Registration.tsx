import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userType } from '../../../types/types';
import { login, registration } from '../../../utils/API';
import { validateRegistration } from '../../../utils/utils';
import './registration.scss';

type IRegistration = {
  // modalState: {modalActive: boolean, setModalActive: (newState: boolean) => void}
  setIsLoginForm: (newState: boolean) => void
  // setLoginButtonState: (state: boolean) => void
}

function Registration({ setIsLoginForm }:IRegistration) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isCorrectRegistration, setIsCorrectRegistration] = useState(true);
  const timeoutId:{current: NodeJS.Timeout | null} = useRef(null);
  const navigate = useNavigate();

  function handleRegistration() {
    if (!validateRegistration(email, password, name)) {
      setIsCorrectRegistration(false);
      return;
    }
    registration(email, password, name)
    .then(() => {
      navigate('/');
      // modalState.setModalActive(false);
      return login(email, password)
      .then((data) => dispatch({ type: userType.UPDATE_USER, payload: data }));
    })
    .catch(() => setIsCorrectRegistration(false));
    // setLoginButtonState(false);
  }

  function incorrectRegistration() {
    setTimeout(() => setIsCorrectRegistration(true), 3500);
    return <h4 className="login__error">Неподходящий логин или пароль</h4>;
  }

  useEffect(() => () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
});

  return (
  <div className="login">
    {!isCorrectRegistration && incorrectRegistration()}
    <h2>Регистрация</h2>
    <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Имя" required />
    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
    <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Пароль" required />
    <button className="login__sumbit" onClick={handleRegistration} type="button">Зарегистрироваться</button>
    <p className="login__text">
      Уже зарегистрированы?
      <button onClick={() => setIsLoginForm(true)} type="button">Войти</button>
    </p>
  </div>
);
}

export default Registration;
