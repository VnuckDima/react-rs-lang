import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../hooks/userAction';
import { userType } from '../../types/types';
import { login } from '../../utils/API';
import { validateLogin } from '../../utils/utils';
import './login.scss';

type ILogin = {
  modalState: {modalActive: boolean, setModalActive: (newState: boolean) => void}
  setIsLoginForm: (newState: boolean) => void
}

export default function Login({ modalState,setIsLoginForm }: ILogin) {
  const { modalActive, setModalActive } = modalState;
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isCorrectLogin, setIsCorrectLogin] = useState(true);
  const dispatch = useDispatch();

  async function signIn() {
    if (!validateLogin(email, password)) {
      setIsCorrectLogin(false);
      return;
    }
    await login(email, password)
    .then((data) => {
      setModalActive(false);
      dispatch({ type: userType.UPDATE_USER_NAME, payload: data.name });
    })
    .catch((e) => setIsCorrectLogin(false));
  }

  function incorrectLogin() {
    setTimeout(() => setIsCorrectLogin(true), 3500);
    return <h4 className="login__error">incorrect email or password</h4>;
  }

  return (
    <div className="login">
      {!isCorrectLogin && incorrectLogin()}
      <label htmlFor="login__email">
        Enter email
        <input onChange={(e) => setEmail(e.target.value)} id="login__email" type="email" pattern=".+@globex\.com" placeholder="Email" required />
      </label>
      <label htmlFor="login__password">
        Enter password
        <input onChange={(e) => setPassword(e.target.value)} id="login__password" type="password" placeholder="Password" minLength={8} required />
      </label>
      <button onClick={signIn} className="login__sumbit" type="button">Sign in</button>
      <h4 onClick={() => setIsLoginForm(false)}>Зарегистрироваться</h4>
    </div>
  );
}
