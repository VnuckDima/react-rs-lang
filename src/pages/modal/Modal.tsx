import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login/Login';
import './modal.scss';
import Registration from './registration/Registration';

export default function Modal() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const navigate = useNavigate();

  return (
    <div
      role="textbox"
      tabIndex={0}
      className="modal active"
      onMouseDown={() => navigate('/')}
      onKeyPress={(e) => e.stopPropagation()}
    >
      <div
        role="textbox"
        tabIndex={0}
        className="modal__content active"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.stopPropagation()}
      >
        {isLoginForm
        ? (
        <Login
          setIsLoginForm={setIsLoginForm}
        />
        )
        : (
        <Registration
          setIsLoginForm={setIsLoginForm}
        />
        )}
      </div>
    </div>
  );
}
