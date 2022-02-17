import React, { useEffect, useState } from 'react';
import { makeBVFROMRUArrayQuestions, randomNum } from '../../utils/utils';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import useWordsActions from '../../hooks/useWordsAction';
import { wordExtended } from '../../types/types';
import Preloader from '../../components/Preloader/Preloader';
import SprintGame from './SprintGame/SprintGame';

export default function SprintMenu() {
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
    // Возможно эту строчку можно сократить, но понял как разобраться с типами
    const questionsArr = makeBVFROMRUArrayQuestions(words);
    setQuestions(questionsArr);
    }
  }, [isLoadedWords]);

  // useEffect(() => {
  //   console.log('questions');
  //   console.log(questions);
  // }, [questions]);

  if (!isGame) {
    return <CategorySelect setIsGame={setIsGame} setSelectedCategory={setSelectedCategory} />;
  }

  if (!isLoadedWords || questions.length === 0) {
    return <Preloader />;
  }
  return <SprintGame questions={questions} />;
}
