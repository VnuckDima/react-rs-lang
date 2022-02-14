import React from 'react';

type TSavannahGame = {
  text: string
  isDisabled: boolean
  handleAnswer: (text: string) => void
}

export default function AnswerBtns({ text, isDisabled, handleAnswer }: TSavannahGame) {
  function handleAnswerClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement;
    handleAnswer(target.innerHTML);
  }

  return (
    <button onClick={(e) => handleAnswerClick(e)} disabled={isDisabled} className="savannah__answer-button" type="button">{text}</button>
  );
}
