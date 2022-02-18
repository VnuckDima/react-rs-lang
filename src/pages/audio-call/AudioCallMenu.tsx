import React, { useEffect, useState } from 'react';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import Preloader from '../../components/Preloader/Preloader';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import useWordsActions from '../../hooks/useWordsAction';
import { word, wordExtended } from '../../types/types';
import { makeBVFROMRUArrayQuestions, randomNum, shuffle } from '../../utils/utils';
import AudioCall from './AudioCallGame/AudioCallGame';

// TODO Переименовать AudioCallCategory в AudioCallMenu?
function AudioCallCategory() {
  const { words, isLoadedWords } = useTypedSelector((state) => state.words);
  const { loadWords } = useWordsActions();
  const [isGame, setIsGame] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [questions, setQuestions] = useState<wordExtended[]>([]);

  useEffect(() => {
    if (isGame) {
      loadWords(randomNum(0, 19), selectedCategory);
    }
  }, [isGame]);

  useEffect(() => {
    if (isLoadedWords) {
      const answersArray = shuffle(words);
      setQuestions(makeBVFROMRUArrayQuestions(words));
    }
  }, [isLoadedWords]);

  if (!isGame) {
    return <CategorySelect setIsGame={setIsGame} setSelectedCategory={setSelectedCategory} />;
  }

  if (!isLoadedWords || questions.length === 0) {
    return <Preloader />;
  }
  return <AudioCall questions={questions} />;
}

export default AudioCallCategory;
