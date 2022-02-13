import React, { useEffect, useState } from 'react';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import Preloader from '../../components/Preloader/Preloader';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import useWordsActions from '../../hooks/useWordsAction';
import { word } from '../../types/types';
import { HEAD_URL } from '../../utils/API';
import { makeArrayQuestions, randomNum, shuffle } from '../../utils/utils';
import AudioCall from './audioCall/AudioCall';

function AudioCallCategory() {
  const { words, isLoadedWords } = useTypedSelector((state) => state.words);
  const { loadWords } = useWordsActions();
  const [questions, setQuestions] = useState<[string[]]>([[]]);
  const [isGame, setIsGame] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [answers, setAnswers] = useState<word[]>([]);

  useEffect(() => {
    if (isGame) {
      loadWords(randomNum(0, 19), selectedCategory);
    }
  }, [isGame]);

  useEffect(() => {
    if (isLoadedWords) {
      const answersArray = shuffle(words);
      setAnswers(answersArray);
      setQuestions(makeArrayQuestions(words));
    }
  }, [isLoadedWords]);

  if (!isGame) {
    return <CategorySelect setIsGame={setIsGame} setSelectedCategory={setSelectedCategory} />;
  }

  if (!isLoadedWords || answers.length === 0) {
    return <Preloader />;
  }
  return <AudioCall answers={answers} questions={questions} />;
}

export default AudioCallCategory;
