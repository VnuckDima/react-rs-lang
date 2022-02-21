import React, { useEffect, useRef, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { wordExtended } from '../../types/types';

type TSavannahGame = {
  currentQuestion: wordExtended
  isDisabled: boolean
  handleAnswer: (text: string, wordId: string) => void
  setNewWords: (value: number | ((prevVar: number) => number)) => void;
}
export default function AnswerBtns({
  currentQuestion,
  isDisabled,
  handleAnswer,
  setNewWords,
}: TSavannahGame) {
  const { allWords } = useTypedSelector((state) => state.user);
  const refs = new Array(currentQuestion.answers.length);
  for (let i = 0; i < refs.length; i += 1) {
    refs[i] = useRef(null);
  }

  function handleAnswerClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement;
    target.style.outline = '3px solid black';
    if (!Object.prototype.hasOwnProperty.call(allWords, currentQuestion.id)) {
      setNewWords((state: number) => state + 1);
      console.log(allWords);
    }
    handleAnswer(target.innerHTML, currentQuestion.id);
  }

  function handleAnswerKeypress(event: KeyboardEvent | React.KeyboardEvent) {
    switch (event.key) {
      case '1':
        refs[0].current.click();
        break;
      case '2':
        refs[1].current.click();
        break;
      case '3':
        refs[2].current.click();
        break;
      case '4':
        refs[3].current.click();
        break;
      case '5':
        refs[4].current.click();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('keypress', handleAnswerKeypress);
    return () => {
      document.removeEventListener('keypress', handleAnswerKeypress);
    };
  }, []);

  useEffect(() => {
    if (isDisabled) {
      refs.forEach((button) => {
        const target = button.current;
        if (target.innerHTML.includes(currentQuestion.wordTranslate)) {
          target.style.background = 'green';
        } else {
          target.style.background = 'red';
        }
      });
    }
  }, [isDisabled]);

  return (
    <>
      {currentQuestion.answers.map((answer, index) => <button ref={refs[index]} style={{ }} onClick={(e) => handleAnswerClick(e)} key={currentQuestion.id + answer} disabled={isDisabled} className="minigame__answer-btn" type="button">{`${index + 1}. ${answer}`}</button>)}
    </>
  );
}
