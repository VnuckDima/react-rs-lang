import React, { useEffect, useState } from 'react';
import { TAnswers } from '../../../types/types';

type TAnswerBtn = {
  text: string[]
  addAnswer: {
    setCorrectAnswers: (state: TAnswers[] | ((prevVar: TAnswers[]) => TAnswers[])) => void
    setIncorrectAnswers: (state: TAnswers[] | ((prevVar: TAnswers[]) => TAnswers[])) => void
  }
  setQuestionStart: (state: boolean | ((prevVar: boolean) => boolean)) => void
  correctAnswer: { word: string, audio: string, translateWord:string }
  setQuestionNumber: (value: number | ((prevVar: number) => number)) => void
}

export default function AnswerBtns({
  text,
  addAnswer,
  setQuestionStart,
  correctAnswer,
  setQuestionNumber,
}: TAnswerBtn) {
  const [rightOrWrong, setRightOrWrong] = useState(' ');
  const [isDisabled, setIsDisabled] = useState(false);

  function nextRound() {
    setRightOrWrong(' ');
    setIsDisabled(false);
    setQuestionStart(true);
    setQuestionNumber((state) => state + 1);
  }

  function handleCorrectAnswer() {
    addAnswer.setCorrectAnswers((state) => [...state, correctAnswer]);
    setRightOrWrong('Верно');
  }

  function handleInorrectAnswer() {
    addAnswer.setIncorrectAnswers((state) => [...state, correctAnswer]);
    setRightOrWrong('Неверно');
  }

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement;
    if (target.innerHTML === correctAnswer.translateWord) {
      handleCorrectAnswer();
    } else {
      handleInorrectAnswer();
    }
    setIsDisabled(true);
    setQuestionStart(false);
    setTimeout(() => nextRound(), 2000);
  }

  // setTimeout(() => incorrectAnswer(), 5000);
  useEffect(() => {
    setQuestionStart(true);
  }, []);

  return (
    <>
      <h1>{rightOrWrong}</h1>
      {text.map((button, index) => <button disabled={isDisabled} className="savannah__answer-button" onClick={(e) => handleAnswer(e)} key={button} type="button">{`${index + 1}. ${button}`}</button>)}
    </>
  );
}
