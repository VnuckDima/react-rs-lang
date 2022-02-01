import React from 'react';
import './style.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="header__games">
        <button type="button">game 1</button>
        <button type="button">game 2</button>
      </div>
      <div className="header__registration">
        <button type="button">sign in</button>
        <button type="button">registration</button>
      </div>
    </header>
  );
}
