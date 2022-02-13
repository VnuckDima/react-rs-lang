import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav">
      <ul>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <li>
          <span>Главная</span>
        </li>
      </Link>
      <Link to="textbook" style={{ textDecoration: 'none', color: 'black' }}>
        <li>
          <span>Учебник</span>
        </li>
      </Link>
      <Link to="audio-call" style={{ textDecoration: 'none', color: 'black' }}>
        <li>
          <span>Мини-игра Аудиовызов</span>
        </li>
      </Link>
      <Link to="sprint" style={{ textDecoration: 'none', color: 'black' }}>
        <li>
          <span>Мини-игра Спринт</span>
        </li>
      </Link>
      <Link to="savannah" style={{ textDecoration: 'none', color: 'black' }}>
        <li>
          <span>Мини-игра Саванна</span>
        </li>
      </Link>
      <Link to="statistics" style={{ textDecoration: 'none', color: 'black' }}>
        <li>
          <span>Статистика</span>
        </li>
      </Link>
      </ul>
    </nav>
  );
}

export default Navigation;
