import React, { useState } from 'react';
import Login from '../login/Login';
import Registration from '../registration/Registration';
import './modal.scss';

type IPopUp = {
  modalState: {modalActive: boolean, setModalActive: (newState: boolean) => void}
  setLoginButtonState: (state: boolean) => void
}

export default function Modal({ modalState, setLoginButtonState }:IPopUp) {
  const { modalActive, setModalActive } = modalState;
  const [isLoginForm, setIsLoginForm] = useState(true);

  return (
    <div
      role="textbox"
      tabIndex={0}
      className={modalActive ? 'modal active' : 'modal'}
      onClick={() => setModalActive(false)}
      onKeyPress={(e) => e.stopPropagation()}
    >
      <div
        role="textbox"
        tabIndex={0}
        className={modalActive ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.stopPropagation()}
      >
        {isLoginForm
        ? (
        <Login
          modalState={{ modalActive, setModalActive }}
          setIsLoginForm={setIsLoginForm}
          setLoginButtonState={setLoginButtonState}
        />
        )
        : (
        <Registration
          modalState={{ modalActive, setModalActive }}
          setIsLoginForm={setIsLoginForm}
          setLoginButtonState={setLoginButtonState}
        />
        )}
      </div>
    </div>
  );
}
