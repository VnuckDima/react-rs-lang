import React, { useEffect, useRef } from 'react';
import { wordExtended } from '../../../types/types';

type TSavannahGame = {
  currentQuestion: wordExtended
  isDisabled: boolean
  handleAnswer: (text: string, wordId: string) => void
}

export default function AnswerBtns({ currentQuestion, isDisabled, handleAnswer }: TSavannahGame) {
  const refs = new Array(currentQuestion.answers.length);
  for (let i = 0; i < refs.length; i += 1) {
    refs[i] = useRef(null);
  }
  // const refs = useRef(new Array(currentQuestion.answers.length));

  function handleAnswerClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement;
    target.style.outline = '3px solid black';

    refs.forEach((button) => {
      const target = button.current;
      if (target.innerHTML.includes(currentQuestion.wordTranslate)) {
        target.style.background = 'green';
      } else {
        target.style.background = 'red';
      }
    });

    handleAnswer(target.innerHTML, currentQuestion.id);
  }

  function handleAnswerKeypress(key: string) {
    switch (key) {
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
    document.addEventListener('keypress', (e) => { handleAnswerKeypress(e.key); });
    console.log(refs);
    return () => {
      document.removeEventListener('keypress', (e) => { handleAnswerKeypress(e.key); });
      console.log(refs);
    };
  }, []);

  return (
    <>
      {currentQuestion.answers.map((answer, index) => <button ref={refs[index]} style={{ backgroundColor: 'yellow' }} onClick={(e) => handleAnswerClick(e)} key={currentQuestion.id + answer} disabled={isDisabled} className="savannah__answer-button" type="button">{`${index + 1}. ${answer}`}</button>)}
    </>
  );

  // return (
  //   <button onClick={(e) => handleAnswerClick(e)} disabled={isDisabled}
  // className="savannah__answer-button" type="button">{text}</button>
  // );
}
