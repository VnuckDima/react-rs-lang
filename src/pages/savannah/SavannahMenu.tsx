import React, { useState } from 'react';
import { randomNum } from '../../utils/utils';
import SavannahGame from './SavannahGame/SavannahGame';
import CategorySelect from '../../components/CategorySelect/CategorySelect';

// TODO прокинуть пропсом isGame, selectedCategory
function SavannahMenu() {
  const [isGame, setIsGame] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Если игра не началась, то рисуется выбор категорий
  if (!isGame) {
    return <CategorySelect setIsGame={setIsGame} setSelectedCategory={setSelectedCategory} />;
  }

  // иначе рисуется сама игра и AudioBtn
  return <SavannahGame category={selectedCategory} page={randomNum(0, 29)} />;
}

export default SavannahMenu;
