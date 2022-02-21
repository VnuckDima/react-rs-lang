import React, { useEffect, useRef } from 'react';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { wordExtended } from '../../types/types';

type TRightOrWrongBtns = {
  currentQuestion: wordExtended
  isDisabled: boolean
  handleAnswer: (text: string, wordId: string) => void
  setNewWords: (value: number | ((prevVar: number) => number)) => void;
}

let keydown = false;

export default function RightOrWrongBtns({
  currentQuestion,
  isDisabled,
  handleAnswer,
  setNewWords,
}: TRightOrWrongBtns) {
  const { allWords } = useTypedSelector((state) => state.user);
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
    if (currentQuestion.id in allWords) {
      setNewWords((state: number) => state + 1);
    }
    handleAnswer(target.innerHTML, currentQuestion.id);
  }

  function handleAnswerKeypress(key: string) {
    if (keydown) return;
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
    keydown = true;
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => { handleAnswerKeypress(e.key); });
    document.addEventListener('keyup', (e) => { keydown = false; });
    return () => {
      document.removeEventListener('keydown', (e) => { handleAnswerKeypress(e.key); });
      document.removeEventListener('keyup', (e) => { keydown = false; });
    };
  }, []);

  return (
    <>
      {buttons.map((answer, index) => <button ref={refs[index]} style={{ backgroundColor: '' }} onClick={(e) => handleAnswerClick(e)} key={currentQuestion.id + answer} disabled={isDisabled} className="minigame__answer-btn" type="button">{answer}</button>)}
    </>
  );
}
