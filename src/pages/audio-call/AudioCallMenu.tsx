import React, { useState } from 'react';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import AudioCall from './audioCall/AudioCall';

function AudioCallCategory() {
  const [isGame, setIsGame] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  if (!isGame) {
    return <CategorySelect setIsGame={setIsGame} setSelectedCategory={setSelectedCategory} />;
  }
  return <AudioCall category={selectedCategory} />;
}

export default AudioCallCategory;
