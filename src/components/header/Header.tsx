import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import Login from '../login/Login';
import Modal from '../modal/Modal';
import Registration from '../registration/Registration';
import './style.scss';

export default function Header() {
  const [modalActive, setModalActive] = useState(false);

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">Главная</h1>
          <button className="header__button-sign" onClick={() => setModalActive(true)} type="button">
            sign in
          </button>
        <Modal modalState={{ modalActive, setModalActive }} />
      </div>
    </header>
  );
}
