import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EndAudioGame from '../../../components/EndGame/EndGame';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import useWordsActions from '../../../hooks/useWordsAction';
import { wordsTypes } from '../../../store/reducers/words';
import { TAnswers, word } from '../../../types/types';
import { HEAD_URL } from '../../../utils/API';
import { makeArrayQuestions, playAudio, randomNum } from '../../../utils/utils';
import AudioBtn from '../AudioBtn/AudioBtn';

type TAudioCall = {
  questions: [string[]]
  answers: word[]
}
const COUNT_QUESTIONS = 20;

export default function AudioCall({ questions, answers } : TAudioCall) {
  const { words } = useTypedSelector((state) => state.words);
  const dispatch = useDispatch();
  const [correctAnswers, setCorrectAnswers] = useState<TAnswers[]>([]);
  // неправильные ответы
  const [incorrectAnswers, setIncorrectAnswers] = useState<TAnswers[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => () => {
    dispatch({ type: wordsTypes.RESET_WORDS });
  }, []);

  // после загрузки слов создание массива на всю игру и воспроизведение первого слова
  // если слова не загружены, диспатч "IS_LOADING"
  useEffect(() => {
    if (words.length > 0) {
      setTimeout(() => playAudio(words[questionNumber].audio, HEAD_URL), 300);
    }
  }, [questionNumber]);

  if (questionNumber === COUNT_QUESTIONS - 1) {
    return (
      <EndAudioGame
      answers={{ correctAnswers, incorrectAnswers }}
      />
    );
  }
  return (
    <div className="audiocall">
      <div className="audiocall__container">
        <svg
          onClick={() => playAudio(words[questionNumber].audio, HEAD_URL)}
          className="bi bi-volume-up-fill audiocall__svg"
          viewBox="0 0 16 16"
        >
          <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
          <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
        </svg>
        <div className="answers__container">
          {words.length > 0 && (
          <AudioBtn
            addAnswer={{
              setCorrectAnswers,
              setIncorrectAnswers,
            }}
            correctAnswer={{
              word: answers[questionNumber].word,
              audio: answers[questionNumber].audio,
              translateWord: answers[questionNumber].wordTranslate,
            }}
            text={questions[questionNumber]}
            setQuestionNumber={setQuestionNumber}
          />
          )}
        </div>
      </div>
    </div>
  );
}
