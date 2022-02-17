import React, { useEffect, useRef } from 'react';
import { wordExtended } from '../../../types/types';

type TSavannahGame = {
  currentQuestion: wordExtended
  isDisabled: boolean
  handleAnswer: (text: string) => void
}

export default function AnswerBtns({ currentQuestion, isDisabled, handleAnswer }: TSavannahGame) {
  const buttons = ['Неверно', 'Верно'];
  const refs = new Array(buttons.length);
  for (let i = 0; i < refs.length; i += 1) {
    refs[i] = useRef(null);
  }

  function handleAnswerClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement;
    target.style.outline = '3px solid black';

    // refs.forEach((button) => {
    //   const target = button.current;
    //   if (target.innerHTML.includes(currentQuestion.wordTranslate)) {
    //     target.style.background = 'green';
    //   } else {
    //     target.style.background = 'red';
    //   }
    // });

    handleAnswer(target.innerHTML);
  }

  function handleAnswerKeypress(key: string) {
    switch (key) {
      case 'ArrowLeft':
        refs[0].current.click();
        break;
      case 'ArrowRight':
        refs[1].current.click();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => { handleAnswerKeypress(e.key); });
    return () => {
      document.removeEventListener('keydown', (e) => { handleAnswerKeypress(e.key); });
    };
  }, []);

  return (
    <>
      {buttons.map((answer, index) => <button ref={refs[index]} style={{ backgroundColor: 'yellow' }} onClick={(e) => handleAnswerClick(e)} key={currentQuestion.id + answer} disabled={isDisabled} className="sprint__answer-button" type="button">{answer}</button>)}
    </>
  );
}
