import React, { useEffect, useState } from 'react';
import { makeArrayQuestions, makeBVFROMRUArrayQuestions, randomNum } from '../../utils/utils';
import SavannahGame from './SavannahGame/SavannahGame';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import useWordsActions from '../../hooks/useWordsAction';
import { word, wordExtended } from '../../types/types';
import Preloader from '../../components/Preloader/Preloader';

export default function SavannahMenu() {
  const { words, isLoadedWords } = useTypedSelector((state) => state.words);
  const { loadWords } = useWordsActions();
  const [isGame, setIsGame] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  // const [answers, setAnswers] = useState<word[]>([]);
  const [questions, setQuestions] = useState<wordExtended[]>([]);

  useEffect(() => {
    if (isGame) {
      loadWords(randomNum(0, 19), selectedCategory);
    }
  }, [isGame]);

  useEffect(() => {
    if (isLoadedWords) {
    // Собираем массив questions - главный массив,
    // в котором находятся и вопросы и текст для кнопок ответов
    // Пока обозовал временно обозвал функцию makeBVFROMRUArrayQuestions

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
  return <SavannahGame questions={questions} />;
}
