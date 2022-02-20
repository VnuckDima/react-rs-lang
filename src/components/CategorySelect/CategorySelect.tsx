import React from 'react';
import { audioAbout, savannahAbout, sprintAbout } from '../../utils/const';

type TCategorySelect = {
  setSelectedCategory: (selectedCategory: number) => void
  setIsGame: (state: boolean) => void
  gameName: string
}

export default function CategorySelect({
  setSelectedCategory,
  setIsGame,
  gameName,
}: TCategorySelect) {
  function handleCategory(number: number) {
    setSelectedCategory(number);
    setIsGame(true);
  }

  function gameAbout(gameName: string) {
    switch (gameName) {
      case 'Спринт': {
        return `${sprintAbout}`;
      }
      case 'Аудиовызов': {
        return `${audioAbout}`;
      }
      case 'Саванна': {
        return `${savannahAbout}`;
      }
      default: {
        return '';
      }
    }
  }

  function gameClass(gameName: string) {
    switch (gameName) {
      case 'Спринт': {
        return 'main__container sprint';
      }
      case 'Аудиовызов': {
        return 'main__container audiocall';
      }
      case 'Саванна': {
        return 'main__container savannah';
      }
      default: {
        return '';
      }
    }
  }

  return (
    <div className={gameClass(gameName)}>
      <div className="wrapper">
        <div className="category__select">
          <div className="category__select-info">
            <h2>{`${gameName}`}</h2>
            <p className="game__about">
              <span>Цель игры:</span>
              {` ${gameAbout(gameName)}`}
            </p>
          </div>
          <div className="category__select-selection">
            <h3>Выберите сложность:</h3>
            <div className="category__select-buttons">
              <button className="category__select-button" onClick={() => handleCategory(0)} type="button">1</button>
              <button className="category__select-button" onClick={() => handleCategory(1)} type="button">2</button>
              <button className="category__select-button" onClick={() => handleCategory(2)} type="button">3</button>
              <button className="category__select-button" onClick={() => handleCategory(3)} type="button">4</button>
              <button className="category__select-button" onClick={() => handleCategory(4)} type="button">5</button>
              <button className="category__select-button" onClick={() => handleCategory(5)} type="button">6</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
