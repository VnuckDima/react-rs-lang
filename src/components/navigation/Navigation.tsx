import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => `nav__link ${(isActive ? 'active' : 'inactive')}`}>
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink to="textbook" className={({ isActive }) => `nav__link ${(isActive ? 'active' : 'inactive')}`}>
            Учебник
          </NavLink>
        </li>
        <li>
          <NavLink to="audio-call" className={({ isActive }) => `nav__link ${(isActive ? 'active' : 'inactive')}`}>
            Мини-игра Аудиовызов
          </NavLink>
        </li>
        <li>
          <NavLink to="sprint" className={({ isActive }) => `nav__link ${(isActive ? 'active' : 'inactive')}`}>
            Мини-игра Спринт
          </NavLink>
        </li>
        <li>
          <NavLink to="savannah" className={({ isActive }) => `nav__link ${(isActive ? 'active' : 'inactive')}`}>
            Мини-игра Саванна
          </NavLink>
        </li>
        <li>
          <NavLink to="statistics" className={({ isActive }) => `nav__link ${(isActive ? 'active' : 'inactive')}`}>
            Статистика
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
