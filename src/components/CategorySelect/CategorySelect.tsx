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
      case 'Аудио-вызов': {
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

  return (
    <div className="audio__category">
      <div className="audio__category-wrapper">
        <h2>{`${gameName}`}</h2>
        <p className="game__about">
          <span>Цель данной игры:</span>
          {` ${gameAbout(gameName)}`}
        </p>
        <h2 className="audio__title">Выберите сложность</h2>
        <div className="audio__buttons">
          <button className="audio__button" onClick={() => handleCategory(0)} type="button">1</button>
          <button className="audio__button" onClick={() => handleCategory(1)} type="button">2</button>
          <button className="audio__button" onClick={() => handleCategory(2)} type="button">3</button>
          <button className="audio__button" onClick={() => handleCategory(3)} type="button">4</button>
          <button className="audio__button" onClick={() => handleCategory(4)} type="button">5</button>
          <button className="audio__button" onClick={() => handleCategory(5)} type="button">6</button>
        </div>
      </div>
    </div>
  );
}
