import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../login/Login';
import Modal from '../modal/Modal';
import './style.scss';

export default function Header() {
  const [modalActive, setModalActive] = useState(false);

  async function getWords() {
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "test1",
        email: "test1@mail.ru",
        password: "12345678",
      }),
    });
    const data = await res.json();
    console.log(data);
  }

  async function func() {
    setModalActive(true);
  }

  return (
    <header className="header">
      <div className="header__games">
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <Link to="audio-call">
          <button type="button">Audio Call</button>
        </Link>
        <Link to="sprint">
          <button type="button">Sprint</button>
        </Link>
      </div>
      <div className="header__registration">
        <button onClick={func} type="button">
          sign in
        </button>
        <button onClick={getWords} type="button">
          registration
        </button>
      </div>
      <Modal state={{ modalActive, setModalActive }}>
        <Login state={{ modalActive, setModalActive }} />
      </Modal>
    </header>
  );
}
