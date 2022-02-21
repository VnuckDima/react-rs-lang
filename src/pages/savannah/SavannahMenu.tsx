import React, { useEffect, useState } from 'react';
import { makeBVFROMRUArrayQuestions, randomNum } from '../../utils/utils';
import SavannahGame from './SavannahGame/SavannahGame';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import useWordsActions from '../../hooks/useWordsAction';
import { wordExtended } from '../../types/types';
import Preloader from '../../components/Preloader/Preloader';

export default function SavannahMenu() {
  const { words, isLoadedWords } = useTypedSelector((state) => state.words);
  const { loadWords } = useWordsActions();
  const [isGame, setIsGame] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [questions, setQuestions] = useState<wordExtended[]>([]);

  useEffect(() => {
    if (isGame) {
      loadWords(0, selectedCategory);
    }
  }, [isGame]);

  useEffect(() => {
    if (isLoadedWords) {
    const questionsArr = makeBVFROMRUArrayQuestions(words);
    setQuestions(questionsArr);
    }
  }, [isLoadedWords]);

  if (!isGame) {
    return <CategorySelect gameName="Саванна" setIsGame={setIsGame} setSelectedCategory={setSelectedCategory} />;
  }

  if (!isLoadedWords || questions.length === 0) {
    return <Preloader />;
  }
  return <SavannahGame questions={questions} />;
}
