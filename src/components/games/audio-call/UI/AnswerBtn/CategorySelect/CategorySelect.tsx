import React from 'react';

type TCategorySelect = {
  setIsGame: (state: boolean) => void,
  setSelectedCategory: (selectedCategory: number) => void
}

export default function CategorySelect({ setIsGame, setSelectedCategory }: TCategorySelect) {
  function handleCategory(number: number) {
    setSelectedCategory(number);
    setIsGame(true);
  }

  return (
    <div>
      Category select
      <button onClick={() => handleCategory(1)} type="button">Category 1</button>
      <button onClick={() => handleCategory(2)} type="button">Category 2</button>
      <button onClick={() => handleCategory(3)} type="button">Category 3</button>
      <button onClick={() => handleCategory(4)} type="button">Category 4</button>
      <button onClick={() => handleCategory(5)} type="button">Category 5</button>
      <button onClick={() => handleCategory(6)} type="button">Category 6</button>
    </div>
  );
}
