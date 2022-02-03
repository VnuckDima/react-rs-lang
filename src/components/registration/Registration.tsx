import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userType } from '../../types/types';
import { login, registration } from '../../utils/API';
import { validateRegistration } from '../../utils/utils';
import './registration.scss';

type IRegistration = {
  modalState: {modalActive: boolean, setModalActive: (newState: boolean) => void}
  setIsLoginForm: (newState: boolean) => void
}

export default function Registration({ modalState, setIsLoginForm }:IRegistration) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isCorrectRegistration, setIsCorrectRegistration] = useState(true);

  function handleRegistration() {
    if (!validateRegistration(email, password, name)) {
      setIsCorrectRegistration(false);
      return;
    }
    registration(email, password, name)
    .then(() => {
      modalState.setModalActive(false);
      login(email, password)
      .then((data) => dispatch({ type: userType.UPDATE_USER_NAME, payload: data.name }));
    })
    .catch(() => setIsCorrectRegistration(false));
  }

  function incorrectRegistration() {
    setTimeout(() => setIsCorrectRegistration(true), 3500);
    return <h4 className="login__error">incorrect email or password</h4>;
  }

  return (
  <div className="login">
    {!isCorrectRegistration && incorrectRegistration()}
    <label htmlFor="login__name">
      Enter name
      <input onChange={(e) => setName(e.target.value)} id="login__name" type="text" pattern=".+@globex\.com" placeholder="Email" required />
    </label>
    <label htmlFor="login__email">
      Enter email
      <input onChange={(e) => setEmail(e.target.value)} id="login__email" type="email" pattern=".+@globex\.com" placeholder="Email" required />
    </label>
    <label htmlFor="login__password">
      Enter password
      <input onChange={(e) => setPassword(e.target.value)} id="login__password" type="password" placeholder="Password" minLength={8} required />
    </label>
    <button onClick={handleRegistration} className="login__sumbit" type="button">Sign in</button>
    <button type="button" onClick={() => setIsLoginForm(true)}>Войти</button>
  </div>
);
}
