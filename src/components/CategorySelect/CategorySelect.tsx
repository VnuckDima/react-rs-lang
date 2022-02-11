import React from 'react';

type TCategorySelect = {
  setSelectedCategory: (selectedCategory: number) => void
  setIsGame: (state: boolean) => void
}

export default function CategorySelect({ setSelectedCategory, setIsGame }: TCategorySelect) {
  function handleCategory(number: number) {
    setSelectedCategory(number);
    setIsGame(true);
  }

  return (
    <div className="audio__category">
      <div className="audio__category-wrapper">
        <h2 className="audio__title">Выберите сложность</h2>
        <div className="audio__buttons">
          <button className="audio__button" onClick={() => handleCategory(1)} type="button">1</button>
          <button className="audio__button" onClick={() => handleCategory(2)} type="button">2</button>
          <button className="audio__button" onClick={() => handleCategory(3)} type="button">3</button>
          <button className="audio__button" onClick={() => handleCategory(4)} type="button">4</button>
          <button className="audio__button" onClick={() => handleCategory(5)} type="button">5</button>
          <button className="audio__button" onClick={() => handleCategory(6)} type="button">6</button>
        </div>
      </div>
    </div>
  );
}
