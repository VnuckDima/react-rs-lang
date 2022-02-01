import React, { useRef, useState } from 'react';
import { login, validateEmail, validatePassword } from '../../utils/utils';
import './login.scss';

type ILogin = {
  state: {modalActive: boolean, setModalActive: (newState: boolean) => void}
}

export default function Login({ state }: ILogin) {
  const { modalActive, setModalActive } = state;
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isCorrectLogin, setIsCorrectLogin] = useState(true);

  async function signIn() {
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);
    if (!validEmail && !validPassword) {
      setIsCorrectLogin(false);
    }
    const loginData = await login(email, password).then((data) => {
      setModalActive(false);
      return data;
    }).catch((e) => setIsCorrectLogin(false));
    console.log(loginData);
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
    </div>
  );
}
