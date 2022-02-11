import React, { useEffect } from 'react';
import { TAnswers } from '../../../types/types';

type TAnswerBtn = {
  text: string[]
  addAnswer: {
    setCorrectAnswers: (state: TAnswers[] | ((prevVar: TAnswers[]) => TAnswers[])) => void
    setIncorrectAnswers: (state: TAnswers[] | ((prevVar: TAnswers[]) => TAnswers[])) => void
  }
  correctAnswer: { word: string, audio: string, translateWord:string }
  setQuestionNumber: (value: number | ((prevVar: number) => number)) => void
}

function AnswerBtn({
  text,
  addAnswer,
  correctAnswer,
  setQuestionNumber,
}: TAnswerBtn) {
  function handleAnswer(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement;
    if (target.innerHTML === correctAnswer.translateWord) {
      addAnswer.setCorrectAnswers((state) => [...state, correctAnswer]);
    } else {
      addAnswer.setIncorrectAnswers((state) => [...state, correctAnswer]);
    }
    setQuestionNumber((state) => state + 1);
  }
  return (
    <>
      {text.map((button) => <button className="audio__answer-button" onClick={(e) => handleAnswer(e)} key={button} type="button">{button}</button>)}
    </>
  );
}

export default AnswerBtn;
