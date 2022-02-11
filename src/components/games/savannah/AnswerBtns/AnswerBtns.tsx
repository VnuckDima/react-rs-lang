import React, { useEffect, useState } from 'react';
import { TAnswers } from '../../../../types/types';

// описание переданного сюда пропса
type TAnswerBtn = {
  text: string[]
  addAnswer: {
    setCorrectAnswers: (state: TAnswers[] | ((prevVar: TAnswers[]) => TAnswers[])) => void
    setIncorrectAnswers: (state: TAnswers[] | ((prevVar: TAnswers[]) => TAnswers[])) => void
  }
  correctAnswer: { word: string, audio: string, translateWord:string }
  setQuestionNumber: (value: number | ((prevVar: number) => number)) => void
}

function AnswerBtns({
  text,
  addAnswer,
  correctAnswer,
  setQuestionNumber,
}: TAnswerBtn) {
  const [rightOrWrong, setRightOrWrong] = useState(' ');

  function nextRound() {
    setRightOrWrong(' ');
    setQuestionNumber((state) => state + 1);
  }

  function handleAnswer(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement;
    if (target.innerHTML === correctAnswer.translateWord) {
      addAnswer.setCorrectAnswers((state) => [...state, correctAnswer]);
      setRightOrWrong('Верно');
    } else {
      addAnswer.setIncorrectAnswers((state) => [...state, correctAnswer]);
      setRightOrWrong('Неверно');
    }
    setTimeout(() => nextRound(), 2000);
  }

  // function incorrectAnswer() {
  //   console.log('incorrectAnswer function');
  //   addAnswer.setIncorrectAnswers((state) => [...state, correctAnswer]);
  //   setQuestionNumber((state) => state + 1);
  // }

  // setTimeout(() => incorrectAnswer(), 5000);

  return (
    <>
      <h1>{rightOrWrong}</h1>
      {text.map((button) => <button className="audio__answer-button" onClick={(e) => handleAnswer(e)} key={button} type="button">{button}</button>)}
    </>
  );
}

export default AnswerBtns;
